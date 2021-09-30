import {PaymentGateType} from "./paymentGateType";

export interface PaymentGateContextType {
    paymentGateState: PaymentGateType[],
    paymentGateActions?: PaymentGateContextActionsType
}
