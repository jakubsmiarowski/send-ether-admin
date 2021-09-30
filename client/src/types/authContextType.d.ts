import {AuthStateContextType} from "@types/authStateContextType";
import {AuthContextActionsType} from "@types/authContextActionsType";

export interface AuthContextType {
    state: AuthStateContextType,
    actions: AuthContextActionsType
}
