import { useState, useEffect } from "react";
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
import SettingsModal from "../components/SettingsModal";
import Pagination from "../components/Pagination.jsx";
import BlueWindow from "../components/BlueWindow.jsx";
import Title from "../assets/title.png";
import {WindowsXPAddressBook, WindowsXPShell32Icon274} from "react-old-icons";

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

            {/*MAIN CONTAINER*/}
            <BlueWindow title="FET - My transactions" className="max-w-[40rem]">

                {/*WHITE BOX*/}
                <div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* TOP TITLE */}
                    <div className="custom-bg-2 border-b-[3px] border-gray-300 p-4 flex flex-row place-content-between">
                        <img src={Title}
                             alt="Friendly Expense Tracker title"
                             draggable="false"
                             className="w-[70%]"
                        />
                        <div className="white-button-wrap place-self-center">
                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="white-button flex flex-row items-center gap-1"
                            >
                                <WindowsXPShell32Icon274 size={20}/>
                                Settings
                            </button>
                        </div>
                    </div>

                    {/*SUMMARY CONTAINER*/}
                    <div className="bg-white rounded-b-[3px] shadow-md">
                        {/*BALANCE*/}
                        <BalanceSummary summary={summary}/>

                        {/*CHART*/}
                        <div className="bg-white rounded-lg p-5">
                            <ExpensesByCategoryChart categoryTotals={categoryTotals}/>
                        </div>
                    </div>

                    {/*TRANSACTION LIST*/}
                    <div className="bg-[#f0f0f0] pb-1.5">
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
                            className="blue-button place-self-center my-3 flex flex-row items-center gap-1"
                        >
                            <WindowsXPAddressBook size={26} />
                            New transaction
                        </button>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => loadPage(page)}
                        />
                    </div>

                </div>
            </BlueWindow>

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