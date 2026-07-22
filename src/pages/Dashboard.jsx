import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../services/transactionService";
import { getCategories } from "../services/categoryService";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";
import ExpensesByCategoryChart from "../components/ExpensesByCategoryChart";
import { createCategory } from "../services/categoryService";
import CategoryForm from "../components/CategoryForm";
import BalanceSummary from "../components/BalanceSummary";
import TransactionsByMonth from "../components/TransactionsByMonth";
import TransactionTypeFilter from "../components/TransactionTypeFilter";
import title from "../assets/title.png";
import { X } from 'lucide-react';

export default function Dashboard() {
    const { logoutUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState("transaction");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [editingTransaction, setEditingTransaction] = useState(null);

    async function loadData() {
        try {
            const [transactionsData, categoriesData] = await Promise.all([
                getTransactions(),
                getCategories(),
            ]);
            setTransactions(transactionsData);
            setCategories(categoriesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleSaveTransaction(transactionData) {
        if (editingTransaction) {
            await updateTransaction(editingTransaction.id, transactionData);
        } else {
            await createTransaction(transactionData);
        }
        setIsModalOpen(false);
        setEditingTransaction(null);
        await loadData();
    }

    async function handleCreateCategory(categoryData) {
        await createCategory(categoryData);
        await loadData();
        setModalView("transaction");
    }

    async function handleDeleteTransaction(id) {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;
        await deleteTransaction(id);
        await loadData();
    }

    function handleEditClick(transaction) {
        setEditingTransaction(transaction);
        setModalView("transaction");
        setIsModalOpen(true);
    }

    const filteredTransactions = transactions.filter((t) => {
        if (typeFilter === "ALL") return true;
        return t.category.type === typeFilter;
    });

    if (loading) return <p className="p-8 text-gray-500">Loading...</p>;

    return (
        <div className="min-h-screen p-4">
            <div className="flex justify-between items-center mb-6">
                <img src={title} alt="Friendly Expense Tracker title" className="h-20"/>
                <button
                    onClick={logoutUser}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Log out
                </button>
            </div>

            {/*MAIN CONTAINER*/}
            <div className="max-w-[40rem] mx-auto blue-window p-1.5">

                <div className={"w-100% flex flex-row justify-between content-center p-1 mb-1"}>
                    <h2 className="text-white">My transactions</h2>
                    <div className="bg-red-400 p-0.5 rounded-[5px] border-solid border-1 border-white">
                        <X size={20} color={"#fff"}/>
                    </div>
                </div>

                <div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/*TRANSACTIONS CONTAINER*/}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/*BALANCE*/}
                        <BalanceSummary transactions={transactions}/>

                        {/*CHART*/}
                        <div className="bg-white rounded-lg p-6">
                            <ExpensesByCategoryChart transactions={transactions}/>
                        </div>

                        {/*NEW TRANSACTION BUTTON*/}
                        <div className="flex justify-between items-center place-self-center">
                            <button
                                onClick={() => {
                                    setEditingTransaction(null);
                                    setIsModalOpen(true);
                                }}
                                className="button bg-[#124CFB] text-white px-4 py-2 rounded-[5px]"
                            >
                                + New transaction
                            </button>
                        </div>
                    </div>

                    {/*TRANSACTION LIST*/}
                    <div className="transactions-list rounded-[5px] mt-1.5 p-2 pt-4">
                        <TransactionTypeFilter value={typeFilter} onChange={setTypeFilter}/>
                        <TransactionsByMonth
                            transactions={filteredTransactions}
                            onDelete={handleDeleteTransaction}
                            onEdit={handleEditClick}
                        />
                    </div>

                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTransaction(null);
                    setModalView("transaction");
                }}
                title={
                    modalView === "transaction"
                        ? (editingTransaction ? "Edit transaction" : "New transaction")
                        : "New Category"
                }
            >
                {modalView === "transaction" ? (
                    <TransactionForm
                        categories={categories}
                        onSubmit={handleSaveTransaction}
                        onCancel={() => {
                            setIsModalOpen(false);
                            setEditingTransaction(null);
                        }}
                        onCreateCategory={() => setModalView("category")}
                        initialData={editingTransaction}
                    />
                ) : (
                    <CategoryForm
                        onSubmit={handleCreateCategory}
                        onCancel={() => setModalView("transaction")}
                    />
                )}
            </Modal>
        </div>
    );
}