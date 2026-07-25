import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getSummary, getExpensesByCategory, createTransaction, getGroupedTransactions, updateTransaction, deleteTransaction } from "../services/transactionService";
import { getCategories } from "../services/categoryService";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";
import ExpensesByCategoryChart from "../components/ExpensesByCategoryChart";
import { createCategory } from "../services/categoryService";
import CategoryForm from "../components/CategoryForm";
import BalanceSummary from "../components/BalanceSummary";
import TransactionsByMonth from "../components/TransactionsByMonth";
import TransactionTypeFilter from "../components/TransactionTypeFilter";
import Tooltip from "../components/Tooltip";
import SettingsModal from "../components/SettingsModal";
import Pagination from "../components/Pagination.jsx";
import title from "../assets/title.png";
import { X } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import { Settings } from "lucide-react";

export default function Dashboard() {
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 });
    const [categoryTotals, setCategoryTotals] = useState([]);
    const [monthGroups, setMonthGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalView, setModalView] = useState("transaction");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [editingTransaction, setEditingTransaction] = useState(null);
    const { logoutUser } = useAuth();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    async function loadDashboardData() {
        try {
            const [summaryData, categoryTotalsData, categoriesData] = await Promise.all([
                getSummary(),
                getExpensesByCategory(),
                getCategories(),
            ]);
            setSummary(summaryData);
            setCategoryTotals(categoryTotalsData);
            setCategories(categoriesData);
            await loadPage(0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function loadPage(page, type = typeFilter) {
        const result = await getGroupedTransactions(page, type);
        setMonthGroups(result.content);
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
    }

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function refreshAll() {
        const [summaryData, categoryTotalsData] = await Promise.all([
            getSummary(),
            getExpensesByCategory(),
        ]);
        setSummary(summaryData);
        setCategoryTotals(categoryTotalsData);
        await loadPage(currentPage);
    }

    async function handleSaveTransaction(transactionData) {
        if (editingTransaction) {
            await updateTransaction(editingTransaction.id, transactionData);
        } else {
            await createTransaction(transactionData);
        }
        setIsModalOpen(false);
        setEditingTransaction(null);
        await refreshAll()
    }

    async function handleCreateCategory(categoryData) {
        await createCategory(categoryData);
        await refreshAll();
        setModalView("transaction");
    }

    async function handleDeleteTransaction(id) {
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;
        await deleteTransaction(id);
        await refreshAll()
    }

    function handleEditClick(transaction) {
        setEditingTransaction(transaction);
        setModalView("transaction");
        setIsModalOpen(true);
    }

    function handleFilterChange(newType) {
        setTypeFilter(newType);
        loadPage(0, newType);
    }

    if (loading) return <p className="p-8 text-gray-500">Loading...</p>;

    return (
        <div className="min-h-screen p-4">
            <div className="flex justify-between items-center mb-6">
                <img src={title} alt="Friendly Expense Tracker title" className="h-20"/>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <Settings size={20}/>
                </button>
                <button
                    onClick={logoutUser}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Log out
                </button>
            </div>




            {/*MAIN CONTAINER*/}
            <div className="max-w-[40rem] mx-auto blue-window">

                <div className={"w-100% flex flex-row justify-between content-center p-1 mb-1"}>
                    <h2 className="text-white flex flex-row"> My transactions </h2>
                    <Tooltip text={"This one is for decoration only! x.x"}>
                        <div className="bg-red-400 p-0.5 rounded-[3px] border-solid border-1 border-white">
                            <X size={20} color={"white"}/>
                        </div>
                    </Tooltip>
                </div>

                {/*WHITE BOX*/}
                <div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/*TRANSACTIONS CONTAINER*/}
                    <div className="bg-white rounded-b-[3px] shadow-md">
                        {/*BALANCE*/}
                        <BalanceSummary summary={summary}/>

                        {/*CHART*/}
                        <div className="bg-white rounded-lg p-6">
                            <ExpensesByCategoryChart categoryTotals={categoryTotals}/>
                        </div>
                    </div>

                    {/*TRANSACTION LIST*/}
                    <div className="custom-bg-1 rounded-[3px] mt-1.5 pb-1.5">
                        <TransactionTypeFilter value={typeFilter} onChange={handleFilterChange}/>
                        {/*NEW TRANSACTION BUTTON*/}
                        <TransactionsByMonth
                            monthGroups={monthGroups}
                            onDelete={handleDeleteTransaction}
                            onEdit={handleEditClick}
                        />
                        <button
                            onClick={() => {
                                setEditingTransaction(null);
                                setIsModalOpen(true);
                            }}
                            className="blue-button place-self-center my-3"
                        >
                            <CircleDollarSign color={"white"} className={"mr-1"} size={"22px"}/>
                            New transaction
                        </button>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => loadPage(page)}
                        />
                    </div>

                </div>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
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