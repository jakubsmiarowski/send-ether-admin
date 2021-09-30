import {GithubUser} from "./githubUser";

export interface AuthContextHandleLoginArgument {
    accessToken: string,
    isLoggedIn: boolean
}

export interface AuthContextHandleGithubUserArgument {
    githubUser: GithubUser;
}

export interface AuthContextHandlePaymentGateOwnerArgument {
    paymentGateOwner: PaymentGateOwnerType;
}

export interface AuthContextHandleLoading {
    isLoading: boolean;
}
