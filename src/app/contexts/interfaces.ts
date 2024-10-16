export interface Places {
    company_name: string;
    trade_name?: string;
    cnpj?: string;
    cep?: string;
    street?: string;
    number?: number;
    additional_address_information?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    phone?: string;
    latitude: number;
    longitude: number;
    isMarques?: boolean;
    marker_name: string;
    date_start_contract?: string;
    date_end_contract?: string;
    service_cost?: number;
    service_description?: string;
  }

  export interface SelectedCityProps {
    city: string;
    cod_ibge: string;
    state: string;
    ubs: number;
    population: number;
    secretary: string;
    secretary_phone: string;
  }