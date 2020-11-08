import {useEffect, useState} from "react";

interface ListReturnType<T> {
    isLoading: boolean,
    error: boolean,
    data: T | undefined,
}

export const useAsync= <T>(asyncFn:Promise<T>): ListReturnType<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<T>();

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        asyncFn.then(informacoes => {
                setIsLoading(false);
                setData(informacoes)
            })
            .catch(error => {
                setError(true);
                setIsLoading(false);
            })
    }, [asyncFn])

    return {isLoading, data, error}
}
