import {useEffect, useState} from "react";
import {genericController, PageData, SWAPIEndpoint} from "../../api/generic/generic-api";
import {ObjectWithId} from "@material-ui/data-grid";

interface ListReturnType<T> {
    isLoading: boolean,
    error: boolean,
    data: T[] | undefined,
    pageData: PageData | undefined
}

export const useList = <T extends ObjectWithId>(pageParam: string | undefined, controllerName: SWAPIEndpoint): ListReturnType<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<T[]>();
    const [pageData, setPageData] = useState<PageData>()


    useEffect(() => {
        setIsLoading(true);
        setError(false);
        if (!pageParam) return;
        const page = parseInt(pageParam);
        const controller = genericController<T>(controllerName);
        controller.getAll(page)
            .then(informacoes => {
                setIsLoading(false);
                setData(informacoes.dados.map((data, index) => {
                    return {...data, id: index}
                }));
                setPageData(informacoes.page)
            })
            .catch(error => {
                setError(true);
                setIsLoading(false);
            })
    }, [pageParam])

    return {isLoading, data, error, pageData}
}
