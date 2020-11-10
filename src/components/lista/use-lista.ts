import {useEffect, useMemo, useState} from "react";
import {genericController, PagebleResponse, PageData, SWAPIEndpoint} from "../../api/generic/generic-api";
import {useAsync} from "../../comum/hooks/use-async";
import {GenericSchema} from "../../api/schemas/generic-schema";

interface ListReturnType<T> {
    isLoading: boolean,
    error: boolean,
    data: T[],
    pageData: PageData | undefined
}

/**
 * Faz o acesso à API de Star Wars e devolve informações da lista. Retorna a lista de dados, informações da página, isLoading, error
 * @param page Página a ser buscada na api
 * @param expressaoBusca Valor a ser realizada a busca na API
 * @param controllerName Nome do Controller a ser chamado
 */
export const useLista = <T extends GenericSchema>(page: number, expressaoBusca:string, controllerName: SWAPIEndpoint): ListReturnType<T> => {
    const [data, setData] = useState<T[]>([]);
    const [pageData, setPageData] = useState<PageData>()


    const controller = useMemo(()=>genericController<T>(controllerName).getByPartialName(expressaoBusca,page),[controllerName,expressaoBusca,page]);
    const {result,isLoading,error} =
        useAsync<PagebleResponse<T>>(controller,[page,expressaoBusca,controllerName]);

    useEffect(() => {
        if (!result) return
        const newData = result
            .dados
            .map(dado=> {
                return {...dado,id:getIdFromURL(dado.url)}
            });
        setData(newData);
        setPageData(result.page);
    }, [result])

    const getIdFromURL=(url:string):number=>{
        const matchs = url.match('/\\d+/')
        if (matchs) {
            let exp:string = matchs[0];
            // o metodo replaceall não é bem aceito em algumas versões do Jest, dessa forma preferimos utilizar o replace
            let id = exp.replace('/','').replace('/','');
            return parseInt(id);
        }
        return 0;
    }

    return {isLoading, data, error, pageData}
}
