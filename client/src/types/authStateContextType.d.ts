import {GithubUser} from "./githubUser";

export interface AuthStateContextType {
    isLoggedIn: boolean;
    accessToken: string;
    proxy_url: RequestInfo;
    isLoading: boolean;
    githubUser: GithubUser;
    paymentGateOwner: PaymentGateOwnerType;
}
