/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder"; // Import the geocoder plugin
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from "leaflet";
import { Modal, ModalBody } from "react-bootstrap";

const ModalRouting = ({ show, showRouting, uLat, uLng, pLat, pLng }) => {
  const handleClose = () => showRouting(false);
  const mapRef = useRef(null);

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <ModalBody>
        <MapContainer
          center={[-6.42806409558657, 106.75406445110613]}
          zoom={10}
          ref={mapRef} // Assign the map reference
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LeafletRoutingMachine
            uLat={uLat}
            uLng={uLng}
            pLat={pLat}
            pLng={pLng}
          />
        </MapContainer>
      </ModalBody>
    </Modal>
  );
};

export default ModalRouting;
