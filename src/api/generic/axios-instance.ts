import Axios, {AxiosInstance} from "axios";


const baseURL = 'https://swapi.dev/api';
export const getAxiosInstance = (): AxiosInstance => {
    let axiosInstance = Axios.create({baseURL: baseURL});
    axiosInstance.interceptors.response.use(response => response,
        (error)=>{
            const {status,baseURL} = error.response;
            // A API SWAPI retorna dados no protocolo HTTP para detalhes,
            // isso gera erros quando em ambiente https.
            // Sendo assim essa linha impede que esses erros sejam tratados
            if (status>399) throw new Error ("Erro de rede");
        })
    return axiosInstance;
}

