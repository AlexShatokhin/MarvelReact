import { useState, useCallback } from "react";

const useHttpHook = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const httpRequest = useCallback(async (url, method = "GET", headers = {"Content-type": "application/json"}, body = null ) => {
        setLoading(true);
        try{
            const response = await fetch(url, {method, headers, body});

            if(!response.ok){
                throw new Error("Couldn`t fetch!");
            }
            setError(false);
            setLoading(false);
            return await response.json();
        } catch(e){
            setLoading(false)
            setError(e.message);
            throw e;
        }
    }, [])

    const cleanError = useCallback(() => setError(false), []);

    return {loading, error, httpRequest, cleanError}

}
export default useHttpHook;