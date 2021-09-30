import {useContext} from "react";

import {AuthContext, PaymentGateContext} from "../AppContext";
import {PaymentGateType} from "../types/paymentGateType";
import paymentGateController from "../controllers/PaymentGateController";

function usePaymentGateApi() {

    const {state: {paymentGateOwner}} = useContext(AuthContext);
    const {
        paymentGateActions: {
            handleGetPaymentGateByUserId,
            handleAddPaymentGate,
            handleDisablePaymentGate,
            handleActivatePaymentGate,
            handleDeletePaymentGate
        }
    } = useContext(PaymentGateContext);

    async function getPaymentGatesByUserId(id: number) {
        try {
            const response = await paymentGateController.getPaymentGatesByUserId(id);
            handleGetPaymentGateByUserId({paymentGates: response});
            return response;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async function addPaymentGate(name: string) {
        try {
            if (typeof paymentGateOwner === "object") {
                const paymentGate: PaymentGateType = {
                    githubId: paymentGateOwner.githubId,
                    name: name,
                    status: "ACTIVE",
                    url: 'http://localhost:8080'
                };
                const result = await paymentGateController.addPaymentGate(paymentGate);
                handleAddPaymentGate({paymentGate: result});
            }
        } catch (error: any) {
            throw new Error(error);
        } finally {
            if (typeof paymentGateOwner === "object") {
                await getPaymentGatesByUserId(paymentGateOwner.id);
            }
        }
    }

    async function disablePaymentGate(id: number) {
        try {
            await paymentGateController.disablePaymentGate(id);
            handleDisablePaymentGate({id: id});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function activatePaymentGate(id: number) {
        try {
            await paymentGateController.activatePaymentGate(id);
            handleActivatePaymentGate({id: id});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function deletePaymentGate(id: number) {
        try {
            const result = await getTransactionByPaymentGateId(id);
            if (result.length === 0) {
                handleDeletePaymentGate({id: id});
                return await paymentGateController.deletePaymentGate(id);
            }
        } catch (error: any) {
            throw new Error(error);
        } finally {
            if (typeof paymentGateOwner === "object") {
                await getPaymentGatesByUserId(paymentGateOwner.id);
            }
        }
    }

    async function getTransactionByPaymentGateId(id: number) {
        try {
            return await paymentGateController.getTransactionsByPaymentGateId(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return {
        getPaymentGatesByUserId,
        addPaymentGate,
        disablePaymentGate,
        activatePaymentGate,
        deletePaymentGate,
        getTransactionByPaymentGateId
    }
}

export default usePaymentGateApi;
