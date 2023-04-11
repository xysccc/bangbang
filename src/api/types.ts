// 请求成功格式
export interface IApiResponse{
    code:number;
    message:string;
    data:any;
    meta?:{
        pageSize: number
        total: number
        current: number
    }
}