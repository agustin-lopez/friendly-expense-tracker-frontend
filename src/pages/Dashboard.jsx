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
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Friendly Expense Tracker</h1>
                <button
                    onClick={logoutUser}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Log out
                </button>
            </div>

            {/*MAIN CONTAINER*/}
            <div className="max-w-[40rem] mx-auto">

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/*BALANCE*/}
                <BalanceSummary transactions={transactions}/>

                {/*TRANSACTIONS CONTAINER*/}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/*CHART*/}
                    <div className="bg-white rounded-lg p-6">
                        <ExpensesByCategoryChart transactions={transactions}/>
                    </div>

                    {/*NEW TRANSACTION BUTTON*/}
                    <div className="flex justify-between items-center mb-4 place-self-center">
                        <button
                            onClick={() => {
                                setEditingTransaction(null);
                                setIsModalOpen(true);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + New Transaction
                        </button>
                    </div>

                    {/*TRANSACTION LIST*/}
                    <TransactionTypeFilter value={typeFilter} onChange={setTypeFilter}/>
                    <TransactionsByMonth
                        transactions={filteredTransactions}
                        onDelete={handleDeleteTransaction}
                        onEdit={handleEditClick}
                    />
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