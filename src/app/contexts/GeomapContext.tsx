import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type GeomapProviderProps = {
  children: ReactNode;
};

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
}

interface GeomapContextProps {
  places: Places[];
  setPlaces: (places: Places[]) => void;
  center: [number, number];
  setCenter: (center: [number, number]) => void;
  selectedPlace: Places;
  setSelectedPlace: (place: Places) => void;
  search: string;
  setSearch: (search: string) => void;
  fetchPlaces: ({ search }: FetchPlacesProps) => void;
}

interface FetchPlacesProps {
  search?: string;
  onlyMarques?: boolean;
}

export const GeomapContext = createContext({} as GeomapContextProps);

export function GeomapProvider({ children }: GeomapProviderProps) {
  const [places, setPlaces] = useState<Places[]>([]);
  const [center, setCenter] = useState<[number, number]>([
    -7.87959, -35.447176,
  ]);
  const [search, setSearch] = useState<string>("");

  const [selectedPlace, setSelectedPlace] = useState<Places>({} as Places);

  async function fetchPlaces({
    search,
    onlyMarques = false,
  }: FetchPlacesProps) {
    const res = await fetch("/api/places");
    const data = await res.json();

    const filteredPlaces = data.filter((place: Places) => {
      const matchesSearch = search ? place.razao_social.includes(search) : true;
      const matchesMarques = onlyMarques ? place.marker_name == "marques" : true;

      return matchesSearch && matchesMarques;
    });

    setPlaces(filteredPlaces);
  }

  useEffect(() => {
    fetchPlaces({});
  }, []);

  return (
    <GeomapContext.Provider
      value={{
        places,
        setPlaces,
        center,
        setCenter,
        selectedPlace,
        setSelectedPlace,
        search,
        setSearch,
        fetchPlaces,
      }}
    >
      {children}
    </GeomapContext.Provider>
  );
}

export const useGeomapContext = () => {
  return useContext(GeomapContext);
};
