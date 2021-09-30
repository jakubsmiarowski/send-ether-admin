import {useContext} from "react";

import transactionController from "../controllers/TransactionController";
import {TransactionContext} from "../AppContext";

function useTransactionApi() {

    const {transactionActions: {handleTransactions}} = useContext(TransactionContext);

    async function getTransactionByPaymentGateId(id: number | undefined) {
        try {
            const result = await transactionController.getTransactionByPaymentGateId(id);
            handleTransactions({transactions: result});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return {
        getTransactionByPaymentGateId
    }
}

export default useTransactionApi;
