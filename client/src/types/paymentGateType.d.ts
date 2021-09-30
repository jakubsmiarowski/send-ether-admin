export interface PaymentGateType {
    id?: number;
    status: string;
    name: string;
    url: string;
    widgetToken?: string;
    userId?: number,
    githubId?: string
}
