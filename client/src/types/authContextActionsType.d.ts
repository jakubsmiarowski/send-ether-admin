import {
    AuthContextHandleGithubUserArgument,
    AuthContextHandleLoading,
    AuthContextHandleLoginArgument,
    AuthContextHandlePaymentGateOwnerArgument
} from "@types/authContextActionsArguments";

export interface AuthContextActionsType {
    handleLogin: (e: AuthContextHandleLoginArgument) => void;
    handleLogout: (e: SyntheticBaseEvent) => void;
    handleGithubUser: (e: AuthContextHandleGithubUserArgument) => void;
    handlePaymentGateOwner: (e: AuthContextHandlePaymentGateOwnerArgument) => void;
    handleLoading: (e: AuthContextHandleLoading) => void;
}
