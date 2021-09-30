import axios from "axios";

import {PaymentGateType} from "../types/paymentGateType";
import {TransactionType} from "../types/transactionType";

class PaymentGateController {

    async getPaymentGatesByUserId(id: number): Promise<PaymentGateType[]> {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment-gates/${id}`);
            return result.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getTransactionsByPaymentGateId(id: number): Promise<TransactionType[]> {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment-gates/${id}/transactions/`);
            return result.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async addPaymentGate(paymentGateObject: PaymentGateType): Promise<PaymentGateType> {
        try {
            const result =  await axios.post(`${process.env.REACT_APP_BASE_URL}/payment-gates`, paymentGateObject);
            return result.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async disablePaymentGate(id: number): Promise<PaymentGateType> {
        try {
            return await axios.put(`${process.env.REACT_APP_BASE_URL}/payment-gates/${id}`, {
                status: 'DISABLED'
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async activatePaymentGate(id: number): Promise<PaymentGateType> {
        try {
            return await axios.put(`${process.env.REACT_APP_BASE_URL}/payment-gates/${id}`, {
                status: 'ACTIVE'
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async deletePaymentGate(id: number): Promise<PaymentGateType> {
        try {
            return await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment-gates/${id}`);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

const paymentGateController = new PaymentGateController();
export default paymentGateController;
