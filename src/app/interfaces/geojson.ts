export type GeoJSON = {
    type: "FeatureCollection";
    features: Feature[];
  };
  
  export type Feature = {
    type: "Feature";
    properties: Properties;
    geometry: Geometry;
  };
  
  export type Properties = {
    id: string;
    name: string;
    description: string;
  };
  
  type Geometry = {
    type: "Polygon";
    coordinates: number[][][];
  };
  