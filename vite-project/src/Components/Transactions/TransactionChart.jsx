import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { listTransactionsAPI } from "../../services/transactions/transactionServices";

ChartJS.register(ArcElement, Tooltip, Legend);
const TransactionChart = () => {
  const { data: transactions, refetch: refetchTransactions, isError, isLoading, error } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ['list-transactions']
  })
  const totals = transactions?.reduce((accumulator, currentTransaction) => {
    if (currentTransaction?.type === 'income') {
      accumulator.income = accumulator.income + currentTransaction?.amount;
    } else {
      accumulator.expense = accumulator.income + currentTransaction?.amount;
    }
    return accumulator;
  }, { income: 0, expense: 0 });
  const donutData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income, totals?.expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };
  const donutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={donutData} options={donutOptions} />
      </div>
    </div>
  );
};

export default TransactionChart;
