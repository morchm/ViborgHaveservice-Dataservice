import { useState } from "react";
import axios from "axios";

export default function useRequestData<DataType>(){
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<null | DataType>(null);
    const [error, setError] = useState<null | string>(null);

    // ---- makeRequest funktion
    async function makeRequest(  
        url:string,
        method: string,
        bodydata?: any,
        headers?: object,
        params?: string)
    {
        setIsLoading(true);

        // ---- API KALD
        try{
            let response
            
            switch(method) {
                case "GET":
                    response = await axios.get(url, {headers: headers, params: params});
                    break;
                case "POST":
                    response = await axios.post(url, bodydata, {headers: headers, params: params});
                    break;
                case "PUT":
                    response = await axios.put(url, bodydata, {headers: headers, params: params});
                    break;
                case "PATCH":
                    response = await axios.patch(url, bodydata, {headers: headers, params: params});
                    break;
                case "DELETE":
                    response = await axios.delete(url, {headers: headers, params: params});
                    break;
                default:
                    throw new Error("Invalid method - GET POST PUT PATCH or DELETE was expected")
            }

            if (response && response.data != undefined) {
                setData(response.data);
                setError(null);
            } else {
                throw new Error("Tomt response/ingen data");
            }

        } catch(error:any) {
            console.log(error)
            setError("Der er opstået en fejl: " + error.message);
            setData(null);

        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, makeRequest };

}