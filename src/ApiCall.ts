import axios, {AxiosResponse} from "axios";

// const form = new FormData();

// export interface APIProps<T = any> {
//     result : string,
//     msg : string,
//     iat: number,
//     jti: string,
//     iss: string,
//     nbf: number,
//     exp: number,
//     data : T[] | T
// }

// export interface ResType<T = any> {
//     data : T | T[] ,
//     result : boolean,
//     msg : string;
// }

// export const debugToken = 'MT_bnLtTcP'
// export const decodeToken = '1111882EAD94E9C493CEF089E1B023A2122BA778'


const API_CALL = async ( url : string, params : any, list : boolean,) =>{
    try{

        let headers = {
            'Content-Type': 'multipart/form-data'
        };

        const api : any = await axios.post(url, params, {
            headers
        });

        // console.log(api)

        
        return api
        
    }
    catch (e) {
        console.log("ERROR",e)
        return {
            data : list ? [] : {},
            result :false ,
            msg : e
        }
    }
};


export default API_CALL