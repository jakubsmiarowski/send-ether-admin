import {
    PaymentGateContextHandleActions,
    PaymentGateContextHandleAdd,
    PaymentGateContextHandleGet
} from "@types/paymentGatesContextInterfaces";

export interface PaymentGateContextActionsType {
    handleGetPaymentGateByUserId: (e: PaymentGateContextHandleGet) => void;
    handleAddPaymentGate: (e: PaymentGateContextHandleAdd) => void;
    handleDisablePaymentGate: (e: PaymentGateContextHandleActions) => void;
    handleActivatePaymentGate: (e: PaymentGateContextHandleActions) => void;
    handleDeletePaymentGate: (e: PaymentGateContextHandleActions) => void;
}
