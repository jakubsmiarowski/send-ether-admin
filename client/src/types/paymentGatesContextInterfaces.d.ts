import {PaymentGateType} from "./paymentGateType";

export interface PaymentGateContextHandleGet {
    paymentGates: PaymentGateType[];
}
export interface PaymentGateContextHandleAdd {
    paymentGate: PaymentGateType;
}
export interface PaymentGateContextHandleActions {
    id: number;
}
