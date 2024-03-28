"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { START_COORDINATION } from "./common/data";
import { CircularProgress } from "@nextui-org/react";
import { getFakeData, typeForDataset } from "@/hooks/useFakeData";

function generateDatasetForDog() {
  const {
    contractType,
    dogType,
    contractPrice,
    dogSex,
    dogAge,
    lat,
    lng,
    dogImg,
  } = getFakeData();

  return {
    contractType: contractType,
    dogType: dogType,
    contractPrice: contractPrice,
    dogSex: dogSex,
    dogAge: dogAge,
    lat: lat,
    lng: lng,
    dogImg: dogImg,
  };
}

let isAlreadyLoaded = false;

export default function KakaoMap(props: any) {
  const [coordination, setCoordination] = useState(START_COORDINATION);
  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  const [level, setLevel] = useState(10);
  const [currentBounds, setCurrentBounds] = useState<any>();
  const mapRef = useRef<kakao.maps.Map>(null);

  const [dataset, setDataset] = useState<typeForDataset[]>();
  const [originDataset, setoriginDataset] = useState<typeForDataset[]>();
  const [displayedDataset, setDisplayedDataset] = useState<typeForDataset[]>();
  const { data, error, isLoading } = useQuery({
    queryKey: ["activatedFilters"],
    queryFn: () => {},
  });
  const queryDisplayDataset = useQuery({
    queryKey: ["displayedDataset"],
    queryFn: () => displayedDataset,
    staleTime: Infinity,
  });

  useEffect(() => {
    async function getGeneratedData() {
      var fakePayload: any = [];
      for (let index = 0; index < 800; index++) {
        const fakeDate = await generateDatasetForDog();
        await fakePayload.push(fakeDate);
      }
      await setDisplayedDataset(fakePayload);
      await setoriginDataset(fakePayload);
      await setDataset(fakePayload);
    }
    getGeneratedData();
  }, []);

  useEffect(() => {
    async function aaa() {
      if (data?.["입양 유형"] == undefined || data?.["입양 유형"] == null) {
        var newDataset = await originDataset?.filter((marker: any) => true);
        await setDataset(newDataset);
      } else {
        var newDataset = await originDataset?.filter((marker: any) =>
          (data?.["입양 유형"] as any[])?.includes(marker.contractType)
        );
        await setDataset(newDataset);
        const newDisplayedMarkers = await newDataset?.filter((marker: any) =>
          currentBounds?.contain(new kakao.maps.LatLng(marker.lat, marker.lng))
        );
        await setDisplayedDataset(newDisplayedMarkers);
        await queryDisplayDataset.refetch();
      }
    }
    async function bbb() {
      if (data != undefined) {
        var payload = await originDataset;
        for (const [key, value] of Object.entries(data)) {
          if (data?.[key] == undefined || data?.[key] == null) {
            var payload = await payload?.filter((marker: any) => true);
            await setDataset(payload);
          } else {
            // await console.log(key);
            // await console.log(value);
            if (key == "contractPrice") {
              var payload = await payload?.filter(
                (marker: any) =>
                  (value as any[])[0] <= marker.contractPrice &&
                  marker.contractPrice <= (value as any[])[1]
              );
            } else {
              if (key == "dogAge") {
                var payload = await payload?.filter(
                  (marker: any) =>
                    (value as any[])[0] <= marker.dogAge &&
                    marker.dogAge <= (value as any[])[1]
                );
              } else {
                var payload = await payload?.filter((marker: any) =>
                  (value as any[]).includes(marker[key])
                );
              }
            }

            await setDataset(payload);
            const newDisplayedMarkers = await payload?.filter((marker: any) =>
              currentBounds?.contain(
                new kakao.maps.LatLng(marker.lat, marker.lng)
              )
            );
            await console.log(payload);
            await setDisplayedDataset(newDisplayedMarkers);
            await queryDisplayDataset.refetch();
          }
        }
      }
    }
    bbb();
  }, [data]);

  useEffect(() => {
    async function aaa() {
      const newDisplayedMarkers = await dataset?.filter((marker: any) =>
        currentBounds?.contain(new kakao.maps.LatLng(marker.lat, marker.lng))
      );
      await setDisplayedDataset(newDisplayedMarkers);
      await queryDisplayDataset.refetch();
    }
    aaa();
  }, [data, dataset, currentBounds, level]);

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
                  // console.log(pos);
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
