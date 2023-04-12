// 请求成功格式
export interface IApiResponse{
    code:number
    message:string
    data:any
    map?:{
        pageSize: number
        total: number
        current: number
    }
}