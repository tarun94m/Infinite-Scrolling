/**
 *  custom hook:
 *     - can reuse the logic
 *     - it should be a pure JS function and should not return any JSX element.
 *     - it should always start with "use" keyword
 */

import { useEffect, useState } from 'react';

export const useFetchData = (pageNum) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const loadDataHandler = async() => {
        try{
            setIsLoading(true);
            const res = await fetch('https://jsonplaceholder.typicode.com/comments?'+
              new URLSearchParams({_page: pageNum, _limit: 10})
            );
            const jsonResp = await res.json();
            console.log(jsonResp);
            setData([...data, ...jsonResp]);
            
        }catch(error) {
           setError(error);
        //    setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        loadDataHandler();
    }, [pageNum]);

    return {
        data,
        error,
        isLoading
    }
}