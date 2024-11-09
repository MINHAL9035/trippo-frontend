import { Bounds, Coordinates } from "@/interface/user/explore.interface";
import GoogleMapReact from "google-map-react";

interface MapProps {
  setBounds: (bounds: Bounds) => void;
  setCoords: (coords: Coordinates) => void;
  coords: Coordinates;
}

const Map: React.FC<MapProps> = ({ setBounds, setCoords, coords }) => {
  const MapApiKey = import.meta.env.VITE_GOOGLE_MAP_APIKEY;

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: MapApiKey }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
