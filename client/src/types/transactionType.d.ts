export interface TransactionType {
    id: number;
    to: string;
    from: string;
    status: string;
    value: string;
    product: string;
    paymentGateId: number;
    gasUsed: number;
    createdAt?: string;
    finishedAt?: string;
}
