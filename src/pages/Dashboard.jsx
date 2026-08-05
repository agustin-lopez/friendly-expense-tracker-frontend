import { useState, useEffect } from "react";
import { getSummary, getExpensesByCategory, createTransaction, getGroupedTransactions, updateTransaction, deleteTransaction } from "../services/transactionService";
import {deleteCategory, getCategories, updateCategory} from "../services/categoryService";
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
import ManageCategoriesModal from "../components/ManageCategoriesModal";
import Title from "../assets/title.png";
import ConfirmDialog from "../components/ConfirmDialog";
import {WindowsXPShell32Icon274, WindowsXPmmcndmgr7, OutlookExpressXP} from "react-old-icons";
import MonthsPerPageSelector from "../components/MonthsPerPageSelector.jsx";

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
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);
    const [pageSize, setPageSize] = useState(() => {
        const saved = localStorage.getItem("monthsPerPage");
        return saved ? Number(saved) : 2;
    });

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

    async function loadPage(page, type = typeFilter, size = pageSize) {
        const result = await getGroupedTransactions(page, type, size);
        setMonthGroups(result.content);
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
    }

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function refreshAll() {
        const [summaryData, categoryTotalsData, categoriesData] = await Promise.all([
            getSummary(),
            getExpensesByCategory(),
            getCategories(),
        ]);
        setSummary(summaryData);
        setCategoryTotals(categoryTotalsData);
        setCategories(categoriesData);
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

    async function handleCreateCategoryFromManager(data) {
        await createCategory(data);
        await refreshAll();
    }

    async function handleUpdateCategory(id, data) {
        await updateCategory(id, data);
        await refreshAll();
    }

    async function handleDeleteCategory(id) {
        await deleteCategory(id);
        await refreshAll();
    }

    function handleDeleteClick(id) {
        setTransactionToDelete(id);
    }

    async function confirmDeleteTransaction() {
        await deleteTransaction(transactionToDelete);
        setTransactionToDelete(null);
        await refreshAll();
    }

    function cancelDeleteTransaction() {
        setTransactionToDelete(null);
    }

    function handleEditClick(transaction) {
        setEditingTransaction(transaction);
        setModalView("transaction");
        setIsModalOpen(true);
    }

    function handleFilterChange(newType) {
        setTypeFilter(newType);
        loadPage(0, newType, pageSize);
    }

    function handlePageSizeChange(newSize) {
        setPageSize(newSize);
        localStorage.setItem("monthsPerPage", newSize);
        loadPage(0, typeFilter, newSize);
    }

    if (loading) return <p className="p-8 text-gray-500">Loading...</p>;

    return (
        <div className="min-h-screen p-4 mt-20">

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
                                className="white-button"
                            >
                                <WindowsXPShell32Icon274 size={20} draggable="false"/>
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
                    <div className="bg-[#f0f0f0] pb-5 flex flex-col gap-4">
                        <TransactionTypeFilter value={typeFilter} onChange={handleFilterChange}/>
                        <MonthsPerPageSelector value={pageSize} onChange={handlePageSizeChange}/>

                        {/*NEW TRANSACTION BUTTON*/}
                        <TransactionsByMonth
                            monthGroups={monthGroups}
                            onDelete={handleDeleteClick}
                            onEdit={handleEditClick}
                        />
                        <div className="flex flex-row items-center place-content-center gap-3">
                            <div className="white-button-wrap">
                                <button
                                    onClick={() => setIsManageCategoriesOpen(true)}
                                    className="white-button text-[13px]!"
                                >
                                    <WindowsXPmmcndmgr7 size={22} draggable="false"/>
                                    Manage categories
                                </button>
                            </div>
                            <div className="white-button-wrap">
                                <button
                                    onClick={() => {
                                        setEditingTransaction(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="white-button text-[13px]!"
                                >
                                    <OutlookExpressXP size={22} draggable="false"/>
                                    New transaction
                                </button>
                            </div>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => loadPage(page)}
                        />
                    </div>

                </div>
            </BlueWindow>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}/>
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
                        : "New category"
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
            <ManageCategoriesModal
                isOpen={isManageCategoriesOpen}
                onClose={() => setIsManageCategoriesOpen(false)}
                categories={categories}
                onCreate={handleCreateCategoryFromManager}
                onUpdate={handleUpdateCategory}
                onDelete={handleDeleteCategory}
            />
            <ConfirmDialog
                isOpen={transactionToDelete !== null}
                title="Delete transaction?"
                message="Are you sure you want to delete this transaction?"
                onConfirm={confirmDeleteTransaction}
                onCancel={cancelDeleteTransaction}
                confirmIcon="WindowsXPExplorer"
            />
        </div>
    );
}