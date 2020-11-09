// @ts-ignore

import {genericController, PagebleResponse, ResourceReturn} from "../generic/generic-api";
import {People} from "../schemas/people";
import moxios from "moxios";
import {getAxiosInstance} from "../generic/axios-instance";
import {retornoAPI, retornoAPIArray} from "../../setupTests";

beforeEach(()=>{
    moxios.install();
})

afterEach(()=>{
    moxios.uninstall();
})

describe('Testes de acesso à api',()=>{

    it('Busca por um id existente',async ()=>{
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: retornoAPI
            })
        })
        const people:any = await genericController<People>('people').getById(1);
        expect(people.name).toBe("Luke Skywalker");
    })

    it('Busca por um parte do nome',async ()=>{
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: retornoAPIArray
            })
        })
        const lista:any = await genericController<People>('people').getByPartialName("Luke",1);
        expect(lista.dados.length).toBe(10);
    })
})
