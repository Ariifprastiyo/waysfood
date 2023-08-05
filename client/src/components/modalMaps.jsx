import { Button, Modal } from "react-bootstrap";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from "leaflet";

import LeafletGeoecoder from "../components/LeafletGeoecoder";
import LeafletRoutingMachine from "../components/LeafletRoutingMachine";
import { useState, useRef, useEffect } from "react";

function ModalMaps({ show, showMaps, clickedPosition, setClickedPosition }) {
  const handleClose = () => showMaps(false);

  const mapRef = useRef(null);

  const handleLocateClick = () => {
    // Use the map reference to trigger the locate method
    if (mapRef.current) {
      mapRef.current.locate();
    }
  };

  const handleLocate = (position) => {
    // Do something with the position if needed
    if (setClickedPosition) {
      setClickedPosition(position);

    }
  };
  
  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Body>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            onLocate={handleLocate}
            clickedPosition={clickedPosition}
          />
        </MapContainer>
        <Button onClick={handleLocateClick}>Locate Me</Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMaps;

function LocationMarker({ onLocate, clickedPosition }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    // Send the position back to the parent component
    if (position && onLocate) {
      onLocate(position);
    }
  }, [position, onLocate]);

  const handleMarkerDragEnd = (e) => {
    setPosition(e.target.getLatLng());
  };

  console.log("ini position ", position)

  const markerIcon = new L.Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [28, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });



  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{ dragend: handleMarkerDragEnd }}
      icon={markerIcon}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}
