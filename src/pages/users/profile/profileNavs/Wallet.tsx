import React from "react";
import { CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Transaction {
  amount: number;
  type: "CREDIT" | "DEBIT";
  description: string;
  createdAt: string;
  _id: string;
}

export interface WalletData {
  _id: string;
  userId: string;
  balance: number;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export interface WalletProps {
  walletData: WalletData | null;
}

const EmptyWallet = () => (
  <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
    <CreditCard className="w-16 h-16 text-gray-300 mb-4" />
    <h3 className="font-semibold text-xl mb-2">Wallet</h3>
    <p className="text-gray-500 text-center max-w-md">
      Your wallet information and transactions will appear here.
    </p>
  </div>
);

const Wallet: React.FC<WalletProps> = ({ walletData }) => {
  if (!walletData) {
    return <EmptyWallet />;
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              ₹{walletData.balance.toLocaleString()}
            </span>
            <span className="text-gray-500 ml-2">INR</span>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {walletData.transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No transactions found
                </div>
              ) : (
                walletData.transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "CREDIT"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "CREDIT" ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${
                        transaction.type === "CREDIT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "CREDIT" ? "+" : "-"}₹
                      {transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
