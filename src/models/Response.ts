import {AxiosResponse} from "axios";

export interface AppResponse<T> {
    success: boolean;
    data: T;
    message: string;
    error?: string;
}

export type AxiosAppResponse<T> = AxiosResponse<AppResponse<T>>
