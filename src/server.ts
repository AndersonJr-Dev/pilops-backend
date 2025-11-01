import express from 'express';
import cors from 'cors';
import db from './data/db.json'; // Importa os dados do arquivo JSON
import { RawFlight, FlightSummary, FlightDetails } from './types/flight'; // Importa os moldes de tipos

// Inicializa o aplicativo Express
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001; // Porta onde a API irá rodar

// Carregamento de todos os voos na memória
const allFlights: RawFlight[] = db.flights;

// Função para resumir os dados do voo
const transformToSummary = (flight: RawFlight): FlightSummary => {
    return { // Retorna um objeto com os dados resumidos do voo
        id: flight.id,
        aeronave: flight.aircraft.name,
        companhia: flight.aircraft.airline,
        registro: flight.aircraft.registration,
        origem: flight.flightData.route.from,
        destino: flight.flightData.route.to,
        saldo: flight.flightData.balance,
        data: flight.flightData.date,
    };
};

/**
 * Transforma um objeto de voo bruto em um objeto de detalhes do voo.
 */

const transformToDetails = (flight: RawFlight): FlightDetails => {
    return {
        id: flight.id,
        aeronave: flight.aircraft.name,
        registro: flight.aircraft.registration,
        companhia: flight.aircraft.airline,
        data: flight.flightData.date,
        saldo: flight.flightData.balance,
        xp: flight.flightData.xp,
        bonusMissao: flight.flightData.missionBonus,
        origem: flight.flightData.route.from,
        destino: flight.flightData.route.to,
    };
};

// Endponts obrigatórios da API

/**
 * Endpoint GET /flights
 * Responde à requisição GET na rota /flights
 */
app.get('/flights', (req, res) => {
    console.log('GET /flights foi chamado');

    // .map() para transformar cada voo bruto em um resumo de voo
    const flightList: FlightSummary[] = allFlights.map(transformToSummary);

    // Status 200 OK e envia a lista transformada como resposta
    return res.status(200).json(flightList);
});

/**
 * Endpoint GET /flights/:id
 * Responde à requisição GET na rota /flights/:id
 */
app.get('/flights/:id', (req, res) => {
    const { id } = req.params; // Extrai o parâmetro id da requisição
    console.log(`GET /flights/${id} foi chamado`);

    // Procura o voo com o ID correspondente
    const flight = allFlights.find(f => f.id === id);

    // Se o voo não for encontrado, retorna 404 Not Found
    if (!flight) {
        return res.status(404).json({ message: 'Voo não encontrado.' });
    }

    // Transforma o voo encontrado em detalhes do voo
    const flightDetails: FlightDetails = transformToDetails(flight);
    // Retorna 200 OK com os detalhes do voo
    return res.status(200).json(flightDetails);
});

// --- ENDPOINT OPCIONAL (Diferencial) ---

/**
 * GET /balance
 * Retorna o saldo total acumulado de todos os voos.
 */
app.get('/balance', (req, res) => {
    console.log('GET /balance');

    //  Função .reduce() para "reduzir" o array de voos a um único valor: o saldo total.
    const totalBalance = allFlights.reduce((acumulador, flight) => {
        // "acumulador" é o valor da soma até agora.
        // Adiciona o saldo do voo atual ao acumulador.
        return acumulador + flight.flightData.balance;
    }, 0); // 0 é o valor inicial do "acumulador".

    // Retorna o saldo total como resposta JSON
    return res.status(200).json({ totalBalance });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
});