export interface GetDataContextType {
    getGithubUser: (token: string) => Promise<void>,
    getPaymentGateOwner: (username: string) => Promise<void>
}
