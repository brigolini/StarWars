import {genericController, SWAPIEndpoint} from "../../api/generic/generic-api";
import {AsyncReturnType, useAsync} from "../../comum/hooks/use-async";

export const useDetalhe = <T>(id:number, controllerName: SWAPIEndpoint):AsyncReturnType<T> => {
    const controller = genericController<T>(controllerName);
    const {error,isLoading,result} = useAsync<T>(controller.getById(id),[id])
    return {error,isLoading,result};
}
