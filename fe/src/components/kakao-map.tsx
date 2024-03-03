"use client";

import { useQueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { DUMMY_MARKER, START_COORDINATION } from "./common/data";

let isAlreadyLoaded = false;

export default function KakaoMap() {
  const [coordination, setCoordination] = useState(START_COORDINATION);
  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  const queryClient = useQueryClient();
  queryClient.setQueryData(["setCoordination"], () => setCoordination);

  const [loaded, setLoaded] = useState(isAlreadyLoaded);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=clusterer`}
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }} // 동적으로 로드
      />
      {loaded && (
        <Map center={coordination} className="w-screen h-screen">
          <MarkerClusterer
            averageCenter={true}
            minLevel={0}
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
              },
              {
                width: "40px",
                height: "40px",
                background: "#FF917E",
                borderRadius: "20px",
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "41px",
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
              },
            ]}
          >
            {DUMMY_MARKER.map((pos) => (
              <MapMarker
                key={`${pos.lat}-${pos.lng}`}
                position={{ lat: pos.lat, lng: pos.lng }}
              />
            ))}
          </MarkerClusterer>
        </Map>
      )}
    </>
  );
}