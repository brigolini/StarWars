import Axios, {AxiosInstance} from "axios";


const baseURL = 'https://swapi.dev/api';
export const getAxiosInstance = (): AxiosInstance => {
    return Axios.create({baseURL: baseURL})
}

