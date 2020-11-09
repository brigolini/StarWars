import '../../../setupTests'
import {mount, ReactWrapper} from 'enzyme';
import {Lista} from "../../lista/lista";
import {People} from '../../../api/schemas/people';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Detalhe from "../../detalhe/detalhe";
import Busca from "../busca";


let wrapped: ReactWrapper;

let valorBusca: string = '';

beforeEach(() => {
    valorBusca = ''
})

afterEach(() => {
    wrapped.unmount()
})

const handleChange = (valor: string) => {
    valorBusca = valor;
}

describe('Testes do componente Busca', () => {
    it('Renderiza corretamente', () => {

        wrapped = mount(
            <Busca disabled={false} onChange={handleChange}/>
        )
        const input = wrapped.find('input');
        expect(input).toBeTruthy();
    })

    it('Não retorna o valor imediatamente, aguarda o debounce', () => {

        wrapped = mount(
            <Busca disabled={false} onChange={handleChange}/>
        )
        wrapped.update();
        const input = wrapped.find('input');
        input.simulate('change', {target: {value: 'novo valor'}})
        expect(valorBusca).toBe('');
    })
    it('Roda o debounce corretamente', (done) => {

        wrapped = mount(
            <Busca disabled={false} onChange={handleChange}/>
        )

        wrapped.update();
        const input = wrapped.find('input');
        input.simulate('change', {target: {value: 'novo valor'}})
        window.setTimeout(() => {
            expect(valorBusca).toBe('novo valor');
            done();
        }, 800)
    })

    it('Modifica e Limpa o input corretamente', () => {

        wrapped = mount(
            <Busca disabled={false} onChange={handleChange}/>
        )

        wrapped.update();
        let input = wrapped.find('input');
        const botao = wrapped.find('button');
        let valorInput = 'novo valor';
        input = input.simulate('change', {target: {value: valorInput}});
        input = wrapped.find('input');
        expect(input.props().value).toBe(valorInput);
        botao.simulate('click');
        input = wrapped.find('input');
        expect(input.props().value).toBe('');
    })
})
