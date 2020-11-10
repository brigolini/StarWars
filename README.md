# Star Wars APP

Projeto de exemplo para acesso à API SWAPI

## Instruções para instalar e rodar app

Dentro do diretório em que estiver o arquivo package.json, digitar 
### `yarn install`
### `npm start`
Após executar o último comando, abrir um navegador no endereço localhost:3000
### Atenção: A app está programada para não abrir o navegador automaticamente

## Scripts disponíveis

### `yarn start`

Executa a app em modo develoment.\

### `yarn test`

Executa os testes

## Para executar os testes e2e é necessário levantar o servidor de desenvolvimento. Devido ao tempo não automatizamos essa tarefa.

### `yarn build`

Gera um build da app para produção

### `yarn eject`

Ejeta dos scripts react.

## Alguns pontos importantes:

#### 1 - A app ainda carece de um melhor tratamento de erros de boundary.
#### 2 - Para testes dos componentes visuais preferimos a abordagem e2e. Especialmente para os componentes que fazem acesso à API uma vez que conseguimos, assim, fazer testes que simulam melhor o caráter assíncrono dela.
#### 3 - Utilizamos o enzyme para montar os componentes nos testes unitários por ser o padrão do mercado. No entanto, acredito que a lib "Testing Library" tem mais pontos positivos, especialmente o de nos obrigar a testar funcionalidade e não implementação.
#### 4 - Dada a simplicidade da app, não utilizamos nenhuma forma de repositório global de estado (Redux ou Context API)
#### 5 - Não habilitamos a cobertura de testes para o puppeteer pois, até o momento, em nossa opinião, não há boa integração dessa cobertura com CI nem com IDEs
#### 6 - A utilização do Material UI, por sí só, fez com que boa parte do código seja responsivo. No entanto, usamos mediaquery para reduzir a lista a apenas um campo em dispositivos móveis.
#### 7 - O ideal para os testes E2E é uma MOCK API. Considero importante isso para garantirmos que o loopback da rede seja contado. Como não havia aqui, utilizamos a própria API.
