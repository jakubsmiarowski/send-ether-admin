import axios from "axios";

import {TransactionType} from "../types/transactionType";

class TransactionController {

    async getTransactionByPaymentGateId(paymentGateId: number | undefined): Promise<TransactionType[]> {
        try {
            const result =  await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions/${paymentGateId}`);
            return result.data;
        } catch (error: any) {
            throw new Error(error);
        }
    };

}

const transactionController = new TransactionController();
export default transactionController;
