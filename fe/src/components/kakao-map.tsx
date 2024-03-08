"use client";

import { useQueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { DUMMY_MARKER, START_COORDINATION } from "./common/data";
import { CircularProgress } from "@nextui-org/react";

let isAlreadyLoaded = false;

export default function KakaoMap() {
  const [coordination, setCoordination] = useState(START_COORDINATION);
  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  const [level, setLevel] = useState(8);
  const [currentBounds, setCurrentBounds] = useState<any>();
  const [markersArray, setMarkersArray] = useState(DUMMY_MARKER);
  const mapRef = useRef<kakao.maps.Map>(null);

  const queryClient = useQueryClient();
  queryClient.setQueryData(["setCoordination"], () => setCoordination);
  queryClient.setQueryData(["markersArray"], () =>
    DUMMY_MARKER.filter((marker) =>
      currentBounds?.contain(new kakao.maps.LatLng(marker.lat, marker.lng))
    )
  );

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=clusterer`}
        // strategy="beforeInteractive"
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }}
      />

      {loaded ? (
        <Map
          onTileLoaded={() => {
            if (mapRef.current != null && mapRef.current != undefined) {
              setCurrentBounds(mapRef.current.getBounds());
            }
          }}
          ref={mapRef}
          isPanto={true}
          level={level}
          center={coordination}
          className="w-screen h-screen"
          onBoundsChanged={(target) => {
            const newBounds = target.getBounds();
            setCurrentBounds(newBounds);
          }}
          onCenterChanged={(target) => {
            const newCenter = {
              lat: target.getCenter().getLat(),
              lng: target.getCenter().getLng(),
            };
            setCoordination(newCenter);
          }}
        >
          <MarkerClusterer
            averageCenter={true}
            minLevel={5}
            styles={[
              {
                width: "30px",
                height: "30px",
                background: "#FF917E",
                borderRadius: "15px",
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "31px",
                boxShadow: "3px 3px 3px #00000030",
              },
              {
                width: "50px",
                height: "50px",
                background: "#FF917E",
                borderRadius: "25px",
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "51px",
                boxShadow: "3px 3px 3px #00000030",
              },
              {
                width: "70px",
                height: "70px",
                background: "#FF917E",
                borderRadius: "35px",
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "71px",
                boxShadow: "3px 3px 3px #00000030",
              },
            ]}
          >
            {DUMMY_MARKER.filter((marker) =>
              currentBounds?.contain(
                new kakao.maps.LatLng(marker.lat, marker.lng)
              )
            ).map((pos) => (
              <MapMarker
                image={{
                  src: "/images/markerIcon.png",
                  size: { width: 25, height: 25 },
                }}
                key={`${pos.lat}-${pos.lng}`}
                position={{ lat: pos.lat, lng: pos.lng }}
                onClick={(marker) => {
                  setCoordination({ lat: pos.lat, lng: pos.lng });
                }}
              />
            ))}
          </MarkerClusterer>
        </Map>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </>
  );
}
