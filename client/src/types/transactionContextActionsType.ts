import {TransactionType} from "./transactionType";

export interface TransactionContextActionsType {
    handleTransactions: (e: { transactions: TransactionType[] }) => void
}
