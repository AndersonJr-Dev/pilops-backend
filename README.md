# Projeto: Pilops - Backend (Teste Técnico)

API REST construída com Node.js, Express e Typescript para servir o hitórico de voos do teste técnico da Pilops.

## Como Rodar 

1.  Clone o repositório:
    `git clone https://github.com/AndersonJr-Dev/pilops-backend
2.  Entre na pasta:
    `cd pilops-backend`
3.  Instale as dependências:
    `npm install`
4.  Rode o servidor em modo de desenvolvimento:
    `npm run dev`
5.  O servidor estará disponível em `http://localhost:3301`.

## Tecnologias

* Node.js
* Express.js
* Typescript
* CORS
* ts-node-dev

## Endpoints da API

A API atua como uma "camada de transformação", lendo dados aninhados do `db.json` e servindo-os de forma plana e otimizada para o frontend.

### `GET / Flights`
* **Descrição:** Retorna uma lista **resumida** de todos os voos.
* **Resposta:** `FlightSummary[]`

### `GET /flights/:id`
* **Descrição:** Retorna os detalhes **completos** de um voo específico.
* **Resposta:** `FlightDetails` (ou `404 Not Found`)

### `GET /balance` (Diferencial)
* **Descrição:** Retorna o somatório do saldo de todos os voos.
* **Resposta:** `{ "totalBalance": number}`

## Decisôes Técnicas

* **Transformação de Dados:** A lógica de "limpar" os dados (ex: `flightData.route.from`-> `rota: "SBRJ -> SBFZ"`) foi intencionalmente colocada no bakend. Isso desacopla o frontend; ele não precisa saber a estrutura complexa do banco de dados, recebendo apenas os dados prontos para exibir.

* **TypeScript:** Utilizado para garantir a segurança dos tipos e servir como documentação, definindo "contratos" claros (`RawFlight`, `FlightSummary`) entre a fonte de dados, a API e o consumidor.