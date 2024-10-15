import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { Places, SelectedCityProps } from "./interfaces";
import citiesInfo from "../../app/jsonData/cities-info.json";
import ibgeCities from "../../app/jsonData/ibge-cities.json";
import geojson from "../jsonData/geojson-pernambuco.json";
import { Feature } from "../interfaces/geojson";
import { getCenterCoordinates } from "../components/leaflet-map/functions";


type GeomapProviderProps = {
  children: ReactNode;
};

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
  selectedCity: SelectedCityProps;
  setSelectedCity: (city: SelectedCityProps) => void;
  openCityCardInfo: boolean;
  setOpenCityCardInfo: (openCityCardInfo: boolean) => void;
  openPlaceInfoModal: boolean;
  setOpenPlaceInfoModal: (openPlaceInfoModal: boolean) => void;
  displayMarkers: boolean;
  setDisplayMarkers: (displayMarkers: boolean) => void;
  handleClickCity: (codIbge: string) => void;
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
  const [selectedCity, setSelectedCity] = useState<SelectedCityProps>(
    {} as SelectedCityProps
  );
  const [openCityCardInfo, setOpenCityCardInfo] = useState(false);
  const [openPlaceInfoModal, setOpenPlaceInfoModal] = useState(false);
  const [displayMarkers, setDisplayMarkers] = useState(true);

  async function fetchPlaces({
    search,
    onlyMarques = false,
  }: FetchPlacesProps) {
    const res = await fetch("/api/places");
    const data = await res.json();

    const filteredPlaces = data.filter((place: Places) => {
      const matchesSearch = search ? place.razao_social.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesMarques = onlyMarques
        ? place.marker_name == "marques"
        : true;

      return matchesSearch && matchesMarques;
    });

    setPlaces(filteredPlaces);
  }

  function handleClickCity(codIbge: string) {
    const selectedMapCity = citiesInfo.find(
      (city: SelectedCityProps) => city.cod_ibge === codIbge
    );

    const selectedGeoJsonCity = geojson.features.find(
      (city: any) => city.properties.id === codIbge
    ) as Feature;

    const centerCoordinates = getCenterCoordinates(selectedGeoJsonCity);

    setSelectedPlace({
      latitude: centerCoordinates[1],
      longitude: centerCoordinates[0],
      razao_social: selectedGeoJsonCity.properties.name,
      marker_name: "",
    });

    
    if (selectedMapCity) {
      setSelectedCity(selectedMapCity);
      setOpenCityCardInfo(true);
    } else {
      //TODO: fetch real data
      const ibgeCity = ibgeCities.find((city) => city.value === codIbge);
      setSelectedCity({
        city: ibgeCity?.label as string,
        cod_ibge: ibgeCity?.value as string,
        state: "PE",
        population: 1,
        secretary: "James Bond",
        secretary_phone: "(81) 99999-9999",
        ubs: 12,
      });
      setOpenCityCardInfo(true);
    }

    // setSelectedPlace({} as any);
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
        selectedCity,
        setSelectedCity,
        openCityCardInfo,
        setOpenCityCardInfo,
        openPlaceInfoModal,
        setOpenPlaceInfoModal,
        displayMarkers,
        setDisplayMarkers,
        handleClickCity,
      }}
    >
      {children}
    </GeomapContext.Provider>
  );
}

export const useGeomapContext = () => {
  return useContext(GeomapContext);
};
