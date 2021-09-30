import {TransactionType} from "@types/transactionType";
import {TransactionContextActionsType} from "@types/transactionContextActionsType";

export interface TransactionContextType {
    transactionState: TransactionType[],
    transactionActions: TransactionContextActionsType
}
