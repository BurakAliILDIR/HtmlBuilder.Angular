export class BaseResponse {
    status: ResponseStatusEnum;
    message: string;
    data: object;
}

export enum ResponseStatusEnum {
    success = 1,
    error = 2,
    warning = 3
}