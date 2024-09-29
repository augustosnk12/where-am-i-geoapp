export interface Places {
    razao_social: string;
    nome_fantasia?: string;
    cnpj?: string;
    cep?: string;
    logradouro?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    telefone?: string;
    latitude: number;
    longitude: number;
    isMarques?: boolean;
    marker_name: string;
    inicio_contrato?: string;
    fim_contrato?: string;
    valor_servico?: number;
    descricao_servico?: string;
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