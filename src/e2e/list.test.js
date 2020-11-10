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

describe('Testes da lista de dados', () => {
    let timeoutDefault = 50000;

    test('Carrega a lista com 10 linhas', async () => {


        await page.goto('http://localhost:3000/list/people/1');
        await page.waitForSelector('.MuiDataGrid-row');

        const linhas = await page
            .evaluate(() => Array.from(document.querySelectorAll('.MuiDataGrid-row'), element => element.textContent));
        expect(linhas.length).toBe(10);

    }, timeoutDefault);

    test('Deixa desabilidada a pesquisa se não for a primeira página', async () => {


        await page.goto('http://localhost:3000/list/people/2');
        await page.waitForSelector('.MuiInputBase-input');

        const linhas = await page
            .evaluate(() => Array.from(document.querySelectorAll('.MuiInputBase-input'), element => element.disabled));
        expect(linhas.length).toBeTruthy();

    }, timeoutDefault);

    test('Faz pesquisa corretamente', async () => {


        await page.goto('http://localhost:3000/list/people/1');
        await page.waitFor(`input[id=busca]`);

        /*await page.evaluate(() => Array.from(document.querySelectorAll('.MuiInputBase-input'), el => el.value = 'Luke'));*/
        await page.waitFor(5000);
        await page.type('.MuiInputBase-input','Leia')
        await page.waitFor(1000);
        const linha = await page
            .evaluate(() => Array.from(document.querySelectorAll('.MuiDataGrid-row'), element => element.textContent));

        expect(linha.length).toBe(1);


    }, timeoutDefault);

});

