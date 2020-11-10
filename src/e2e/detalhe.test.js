import {getDetailData} from "../api/controller-defs";

const faker = require('faker');
const puppeteer = require('puppeteer');

let browser = null;
let page = null;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();

    page.emulate({
        viewport: {
            width: 500,
            height: 2400
        },
        userAgent: ''
    });
});

afterEach(() => {
    browser.close();
});

describe('Testes do detalhe', () => {
    let timeoutDefault = 50000;

    test('Carrega detalhe', async () => {


        await page.goto('http://localhost:3000/detail/people/1');
        await page.waitForSelector('.MuiAccordionDetails-root');

        const linhas = await page
            .evaluate(() => Array.from(document.querySelectorAll('.MuiAccordionDetails-root'), element => element.textContent));
        expect(linhas[0]).toBe('Luke Skywalker');

    }, timeoutDefault);

    test('Mostra todos os itens do array de campos de detalhe', async () => {


        await page.goto('http://localhost:3000/detail/people/1');
        await page.waitForSelector('.MuiAccordionDetails-root');

        const linhasJSon = getDetailData('people');
        const linhas = await page
            .evaluate(() => Array.from(document.querySelectorAll('.MuiAccordionDetails-root'), element => element.textContent));
        expect(linhas.length).toBe(linhasJSon.length);

    }, timeoutDefault);

});

