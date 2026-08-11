import { useState, useEffect } from "react";
import {
    getSummary,
    getExpensesByCategory,
    createTransaction,
    getGroupedTransactions,
    updateTransaction,
    deleteTransaction,
    getTransactions
} from "../services/transactionService";
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
import DefaultButton from "../components/DefaultButton.jsx";
import {useAuth} from "../context/AuthContext.jsx";

function formatDateForInput(apiDate) {
    if (!apiDate) return "";
    const [day, month, year] = apiDate.split("/");
    return `${year}-${month}-${day}`;
}

function getTodayForInput() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const emptyDraft = () => ({
    categoryId: "",
    amount: "",
    description: "",
    date: getTodayForInput(),
});

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
    const { user  } = useAuth();

    const [pageSize, setPageSize] = useState(() => {
        const saved = localStorage.getItem("monthsPerPage");
        return saved ? Number(saved) : 2;
    });

    const [transactionDraft, setTransactionDraft] = useState({
        categoryId: "",
        amount: "",
        description: "",
        date: getTodayForInput(),
    });

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 19) return "Good afternoon";
        return "Good evening";
    }

    async function loadDashboardData() {
        try {
            const [summaryData, categoryTotalsData, categoriesData] = await Promise.all([
                getSummary(),
                getExpensesByCategory(typeFilter),
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
            getExpensesByCategory(typeFilter),
            getCategories(),
            getTransactions()
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
        const newCategory = await createCategory(categoryData);
        await refreshAll();
        setTransactionDraft((prev) => ({ ...prev, categoryId: newCategory.id }));
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
        setTransactionDraft({
            id: transaction.id,
            categoryId: transaction.category?.id || "",
            amount: transaction.amount,
            description: transaction.description || "",
            date: formatDateForInput(transaction.transactionDate),
        });
        setModalView("transaction");
        setIsModalOpen(true);
    }

    async function handleFilterChange(newType) {
        setTypeFilter(newType);
        const categoryTotalsData = await getExpensesByCategory(newType);
        setCategoryTotals(categoryTotalsData);
        await loadPage(0, newType, pageSize);
    }

    function handlePageSizeChange(newSize) {
        setPageSize(newSize);
        localStorage.setItem("monthsPerPage", newSize);
        loadPage(0, typeFilter, newSize);
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <BlueWindow title="Friendly Expense Tracker" className="w-[20rem]">
                <h2 className="m-5">Loading...</h2>
            </BlueWindow>
        </div>
    );

    return (
        <div className="min-h-screen md:py-20">

            <BlueWindow title={user ? (`FET - ${getGreeting()}, ${user.name}!`) : ("My transactions")}
                        className="max-w-[40rem]">

                {/*MAIN CONTAINER*/}
                <div className="w-full">
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <header className="custom-bg-2 border-b-[3px] border-gray-300 p-4 flex flex-row place-content-between">
                        <img src={Title}
                             alt="Friendly Expense Tracker title"
                             draggable="false"
                             className="object-scale-down w-[70%] max-xs:w-[60%]"
                        />
                        <DefaultButton onClickAction={() => setIsSettingsOpen(true)} fontSize="14">
                            <WindowsXPShell32Icon274 size={20} draggable="false"/>
                            Settings
                        </DefaultButton>
                    </header>

                    <main>
                        {/*SUMMARY + PIE CHART*/}
                        <section aria-label="Financial sumary">
                            {/*BALANCE*/}
                            <BalanceSummary summary={summary}/>

                            {/*PIE CHART*/}
                            <div className="p-5">
                                <h2 className="text-l mb-4 text-gray-500">
                                    Now showing your <span className="font-bold text-gray-500">{typeFilter === "INCOME" ? "income" : "expenses"}</span>:
                                </h2>
                                <ExpensesByCategoryChart categoryTotals={categoryTotals}/>
                            </div>
                        </section>

                        {/*TRANSACTIONS*/}
                        <section aria-label="Transactions history" className="bg-[#f0f0f0] pb-5 flex flex-col gap-4">
                            {/*FILTERS*/}
                            <TransactionTypeFilter value={typeFilter} onChange={handleFilterChange}/>
                            {/*CUSTOM PAGINATION + CATEGORY MANAGEMENT*/}
                            <div className="w-full flex flex-row place-content-between px-4">
                                <MonthsPerPageSelector value={pageSize} onChange={handlePageSizeChange}/>
                                <DefaultButton onClickAction={() => setIsManageCategoriesOpen(true)}>
                                    <WindowsXPmmcndmgr7 size={20} draggable="false"/>
                                    Manage categories
                                </DefaultButton>
                            </div>

                            {/*TRANSACTIONS LIST*/}
                            <TransactionsByMonth
                                monthGroups={monthGroups}
                                onDelete={handleDeleteClick}
                                onEdit={handleEditClick}
                            />

                            {/*NEW TRANSACTION BUTTON*/}
                            <div className="flex flex-row items-center place-content-center gap-3">
                                <button
                                    onClick={() => {
                                        setEditingTransaction(null);
                                        setTransactionDraft(emptyDraft());
                                        setIsModalOpen(true);
                                    }}
                                    className="blue-button flex flex-row gap-2"
                                >
                                    <OutlookExpressXP size={22} draggable="false"/>
                                    New transaction
                                </button>
                            </div>

                            {/*PAGE SELECTOR*/}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => loadPage(page)}
                            />
                        </section>
                    </main>
                </div>
            </BlueWindow>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}/>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTransaction(null);
                    setTransactionDraft(emptyDraft());
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
                            setTransactionDraft(emptyDraft());
                        }}
                        onCreateCategory={() => setModalView("category")}
                        draft={transactionDraft}
                        onDraftChange={setTransactionDraft}
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