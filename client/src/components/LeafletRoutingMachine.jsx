import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ uLat, uLng, pLat, pLng }) => {
  const map = useMap();
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });
  const markerIcon = new L.Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [28, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([uLat, uLng]);
    } else {
      markerRef.current = L.marker([uLat, uLng], { icon: DefaultIcon }).addTo(
        map
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uLat, uLng, map]);

  useEffect(() => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    L.marker([pLat, pLng], { icon: markerIcon }).addTo(map);
    L.marker([uLat, uLng], { icon: markerIcon }).addTo(map);

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(pLat, pLng), L.latLng(uLat, uLng)],
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: function () {
        return null; // Return null to remove the default markers.
      },
    }).addTo(map);

    routingControlRef.current.on("routesfound", function (e) {
      e.routes[0].coordinates.forEach((c, i) => {
        setTimeout(() => {
          markerRef.current.setLatLng([c.lat, c.lng]);
        }, 1000 * i);
      });
    });

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uLat, uLng, pLat, pLng, map]);

  return null;
};

export default LeafletRoutingMachine;
