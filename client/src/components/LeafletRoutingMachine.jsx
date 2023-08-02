import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    var marker1 = L.marker([-7.55194, 110.73778]).addTo(map);
    const geocoder = L.Control.Geocoder.nominatim();

    const handleMapClick = function (e) {
      console.log("ini apa", e);

      // Remove previous routing if it exists
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(-7.55194, 110.73778),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
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
        geocoder: geocoder,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              marker1.setLatLng([c.lat, c.lng]);
            }, 100 * i);
          });
        })
        .addTo(map);
    };

    map.on("click", handleMapClick);

    return () => {
      // Clean up event listener when the component is unmounted
      map.off("click", handleMapClick);

      // Also, remove the routing control when unmounting
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map]);

  return null;
};

export default LeafletRoutingMachine;
