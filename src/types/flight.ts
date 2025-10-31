// --- 1. Tipos "Brutos" (Raw) ---
// Representam exatamente a estrutura do db.json

interface Rawaircraft {
    name: string;
    registration: string;
    airline: string;
}

interface RawRoute {
    from: string;
    to: string;
}

interface RawFlightData {
    date: string;
    balance: number;
    route: RawRoute;
    xp: number;
    missionBonus: number;
}

// Molde principal para cada item no array 'flights' do db.json
export interface RawFlight {
    id: string;
    aircraft: Rawaircraft;
    flightData: RawFlightData;
}

// --- 2. Tipos "ViewModel" (Tratador) ---
// Representam os dados limpos e planos que a API vai expor

// Formato para a lista (GET /flights)
export interface FlightSummary {
    id: string;
    aeronave: string; // Simplificado de aircraft.name
    rota: string;     // Criado a partir de flightData.route 
    saldo: number;    // Simplificado de flightData.balance
    data: string;     // Simplificado de flightData.date
}

// Formato para os detalhes (GET /flights/:id)
export interface FlightDetails {
    id: string;

    // Dados da aeronave
    aeronave: string;
    registro: string;
    companhia: string;

    // Dados do voo
    data: string;
    saldo: number;
    xp: number;
    bonusMissao: number;

    // Dados da rota
    origem: string;
    destino: string;
}