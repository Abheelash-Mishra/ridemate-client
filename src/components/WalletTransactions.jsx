import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WalletTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentTab, setCurrentTab] = useState("Credit");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_URL + "/payment/wallet/transactions", {
            params: {
                riderID: localStorage.getItem("RiderID")
            }
        }).then(response => {
            setTransactions(response.data);
        }).catch(error => {
            toast.error(error?.response?.data?.error || "Failed to fetch transactions.");
        });
    }, []);

    const filteredTransactions = transactions.filter(txn =>
        currentTab === "Credit" ? txn.amount >= 0 : txn.amount < 0
    );

    const totalPages = Math.ceil(filteredTransactions.length / pageSize);

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="flex w-full">
                {["Credit", "Debit"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 py-2  font-semibold w-full border-black border-b-2
                                ${currentTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}
                                ${tab === "Credit" ? "border-r-4" : ""}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="h-[30rem] flex flex-col items-center text-xl font-bold">
                <h2 className="text-2xl my-4">Wallet Transactions</h2>
                <div className="w-full max-w-2xl">

                    {filteredTransactions.length === 0 ? (
                        <p>No {currentTab.toLowerCase()} transactions yet!</p>
                    ) : (
                        <ul className="space-y-2">
                            {paginatedTransactions.map(transaction => (
                                <li
                                    key={transaction.transactionID}
                                    className="p-4 bg-gray-100 rounded shadow flex justify-between"
                                >
                                    <div className="flex flex-col font-medium w-full">
                                        <p className={transaction.amount < 0 ? "text-red-600" : "text-green-700"}>
                                            {transaction.amount < 0 ? "Debit" : "Credit"}: {transaction.amount}
                                        </p>
                                        <p className={"font-normal text-lg"}>
                                            {transaction.amount >= 0
                                                ? `Recharged via '${transaction.rechargeMethodType}'`
                                                : "Deducted for a ride"}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-500 w-20">ID: {transaction.transactionID}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center items-center space-x-4">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded border-2 border-black disabled:bg-gray-400"
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-blue-500 text-white rounded border-2 border-black disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default WalletTransactions;
