import {PayloadType} from "./payloadType";

export interface ReducerActions {
    type: string;
    payload?: PayloadType
}
