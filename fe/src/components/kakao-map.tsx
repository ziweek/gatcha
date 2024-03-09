"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { DUMMY_MARKER, START_COORDINATION } from "./common/data";
import { CircularProgress } from "@nextui-org/react";
import getFakeData from "@/hooks/useFakeData";

function generateDatasetForDog() {
  const { contractType, dogType, contractPrice, dogSex, dogAge, lat, lng } =
    getFakeData();

  return {
    contractType: contractType,
    dogType: dogType,
    contractPrice: contractPrice,
    dogSex: dogSex,
    dogAge: dogAge,
    lat: lat,
    lng: lng,
  };
}

let isAlreadyLoaded = false;

export default function KakaoMap(props: any) {
  const [coordination, setCoordination] = useState(START_COORDINATION);
  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  const [level, setLevel] = useState(8);
  const [currentBounds, setCurrentBounds] = useState<any>();
  const mapRef = useRef<kakao.maps.Map>(null);
  const [dataset, setDataset] = useState<any>();

  const [originDataset, setoriginDataset] = useState<any[]>();
  const [displayedDataset, setDisplayedDataset] = useState<any>();
  const { data, error, isLoading } = useQuery({
    queryKey: ["activatedFilters"],
    queryFn: () => {},
    staleTime: Infinity,
  });

  useEffect(() => {
    var fakePayload = [];
    for (let index = 0; index < 300; index++) {
      const fakeDate = generateDatasetForDog();
      fakePayload.push(fakeDate);
    }
    setDataset(fakePayload);
    setDisplayedDataset(fakePayload);
    setoriginDataset(fakePayload);
  }, []);

  useEffect(() => {
    if (data?.["입양 유형"] != undefined) {
      console.log(data?.["입양 유형"]);
      const newDataset = originDataset?.filter((marker: any) =>
        (data?.["입양 유형"] as any[]).includes(marker.contractType)
      );
      console.log(newDataset);
      setDataset(newDataset);
    }
  }, [data]);

  useEffect(() => {
    const newDisplayedMarkers = dataset?.filter((marker: any) =>
      currentBounds?.contain(new kakao.maps.LatLng(marker.lat, marker.lng))
    );
    setDisplayedDataset(newDisplayedMarkers);
    console.log(newDisplayedMarkers?.length);
  }, [dataset, currentBounds, level]);

  const queryClient = useQueryClient();
  queryClient.setQueryData(["setCoordination"], () => setCoordination);
  queryClient.setQueryData(["markersArray"], () => displayedDataset);

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
          onZoomChanged={(target) => {
            const newLevel = target.getLevel();
            setLevel(newLevel);
          }}
        >
          <MarkerClusterer
            averageCenter={false}
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
            {displayedDataset?.map((pos: any) => (
              <MapMarker
                image={{
                  src: "/images/markerIcon.png",
                  size: { width: 25, height: 25 },
                }}
                key={`${pos.lat}-${pos.lng}`}
                position={{ lat: pos.lat, lng: pos.lng }}
                onClick={(marker) => {
                  setCoordination({ lat: pos.lat, lng: pos.lng });
                  console.log(pos);
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
