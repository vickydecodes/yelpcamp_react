import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import './ClusterMap.css'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Footer from "../../../components/Footer/Footer";

const ClusterMap = ({ campgrounds, maptilerApiKey }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    maptilersdk.config.apiKey = maptilerApiKey;

    const map = new maptilersdk.Map({
      container: mapContainerRef.current,
      center:[0, 0],
      zoom: 2.5,
      projection: "globe",
      style: maptilersdk.MapStyle.SATELLITE,
    });
// maptilersdk.MapStyle.DATAVIZ.DARK
    map.on("load", () => {
      map.addSource("campgrounds", {
        type: "geojson",
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "campgrounds",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#00BCD4",
            10,
            "#2196F3",
            30,
            "#3F51B5",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            15,
            10,
            20,
            30,
            25,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "campgrounds",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "campgrounds",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      map.on("click", "clusters", async (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        const clusterId = features[0].properties.cluster_id;
        const zoom = await map.getSource("campgrounds").getClusterExpansionZoom(clusterId);
        map.easeTo({ center: features[0].geometry.coordinates, zoom });
      });

      map.on("click", "unclustered-point", (e) => {
        const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new maptilersdk.Popup().setLngLat(coordinates).setHTML(popUpMarkup).addTo(map);
      });

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      

      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, [campgrounds, maptilerApiKey]);

  return (
  <div className="map_container">
      <div ref={mapContainerRef} className="map_background" style={{ width: "100%", height: "100%", background: 'url("/imgs/space_background.jpg") no-repeat center center/cover' }} />
  </div>
  )
};

export default ClusterMap;
