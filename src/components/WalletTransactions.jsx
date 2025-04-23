import React, {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WalletTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_URL + "/payment/wallet/transactions", {
            params: {
                riderID: localStorage.getItem("RiderID")
            }
        }).then(response => {
            setTransactions(response.data);
            console.log(response.data)
        }).catch(error => {
            toast.error(error.response.data.error);
        });
    }, []);

    const totalPages = Math.ceil(transactions.length / pageSize);

    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePrev = () => {
        setCurrentPage((prev) => {
            return Math.max(prev - 1, 1);
        });
    };

    const handleNext = () => {
        setCurrentPage((prev) => {
            return Math.min(prev + 1, totalPages);
        });
    };

    return (
        <div className="h-[30rem] flex flex-col justify-center items-center text-xl font-bold">
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl mb-4">Wallet Transactions</h2>
                {transactions.length === 0 ? (
                    <p>No transactions made yet!</p>
                ) : (
                    <ul className="space-y-2">
                        {paginatedTransactions.map((transaction) => (
                            <li
                                key={transaction.transactionID}
                                className="p-4 bg-gray-100 rounded shadow flex justify-between"
                            >
                                <div className="flex flex-col font-medium w-full">
                                    <p className={transaction.amount < 0 ? "text-red-600" : "text-green-700"}>
                                        Debit/Credit: {transaction.amount}
                                    </p>
                                    {transaction.amount >= 0 ? (
                                        <p className={"font-normal text-lg"}>Recharged via '{transaction.rechargeMethodType}'</p>
                                    ) : (
                                        <p className={"font-normal text-lg"}>Deducted for a ride</p>
                                    )}
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
                            className="px-4 py-2 bg-blue-500 text-white rounded border-2 border-black disabled:bg-gray-400 disabled:border-gray-600"
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
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
    );
};

export default WalletTransactions;