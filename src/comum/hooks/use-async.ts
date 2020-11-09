import {DependencyList, useEffect, useState} from "react";

export interface AsyncReturnType<T> {
    isLoading: boolean,
    error: boolean,
    result: T | undefined,
}

/**
 * Executa uma operação assíncrona, retornando se houve algum erro na execução, e dizendo que ela ainda está sendo executada
 * Há um problema com React a respeito do deps pois ele não consegue garantir que todas as dependências necessárias estão presentes
 * @param asyncFn função que tem a operação assíncrona
 * @param deps Se alguma das dependências mudar, a operação assíncrona é executada novamente
 */
export const useAsync = <T>(asyncFn: Promise<T>, deps: DependencyList): AsyncReturnType<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState<T>();
    useEffect(() => {
        const fn = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const informacoes = await asyncFn;
                setIsLoading(false);
                setResult(informacoes)
            } catch (error) {
                setError(true);
                setIsLoading(false);
            }
        }
        fn();
    }, deps)

    return {isLoading, result, error}
}
