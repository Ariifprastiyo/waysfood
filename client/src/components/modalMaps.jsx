import { Modal } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

import LeafletGeoecoder from "../components/LeafletGeoecoder";
import LeafletRoutingMachine from "../components/LeafletRoutingMachine";
import { useState } from "react";

function ModalMaps({show, showMaps}) {
    const handleClose = () => showMaps(false);

    const position =  [ -7.55194,  110.73778]

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Body>
        {/* <div className="App"> */}
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <LeafletGeoecoder /> */}
            <LeafletRoutingMachine />
          </MapContainer>
        {/* </div> */}
      </Modal.Body>
    </Modal>
  );
}

export default ModalMaps;
