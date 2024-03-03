"use client";

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  GoogleMapProps,
} from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function getRandomDateWithinPastYear(): string {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const randomDate = new Date(
    oneYearAgo.getTime() +
      Math.random() * (today.getTime() - oneYearAgo.getTime())
  );

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${randomDate.getFullYear()}-${(
    randomDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${randomDate.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
}

const markers = [
  {
    name: "남원리 구오일장마당 공영주차장",
    type: "주차장",
    address: null,
    position: { lat: 37.499, lng: 127.025 },
    startDate: getRandomDateWithinPastYear(),
    imgSrc: "/images/after-detection.jpeg",
  },
  {
    name: "군민체육관 공영주차장",
    type: "주차장",
    address: "제주특별자치도 서귀포시 남원읍 태위로 551-27",
    position: { lat: 37.494, lng: 127.0305 },
    startDate: getRandomDateWithinPastYear(),
    imgSrc: "/images/after-detection.jpeg",
  },
  {
    name: "군민체육관 공영주차장",
    type: "주차장",
    address: "제주특별자치도 서귀포시 남원읍 태위로 551-27",
    position: { lat: 37.462, lng: 127.0315 },
    startDate: getRandomDateWithinPastYear(),
    imgSrc: "/images/after-detection.jpeg",
  },
  {
    name: "군민체육관 공영주차장",
    type: "주차장",
    address: "제주특별자치도 서귀포시 남원읍 태위로 551-27",
    position: { lat: 37.474, lng: 127.01 },
    startDate: getRandomDateWithinPastYear(),
    imgSrc: "/images/after-detection.jpeg",
  },
  {
    name: "군민체육관 공영주차장",
    type: "주차장",
    address: "제주특별자치도 서귀포시 남원읍 태위로 551-27",
    position: { lat: 37.52, lng: 127.03 },
    startDate: getRandomDateWithinPastYear(),
    imgSrc: "/images/after-detection.jpeg",
  },
];

const MapStyleRetro = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];

const MapStyleAubergine = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];

export default function BaseMap() {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [center, setCenter] = useState<any>({
    lat: 37.4979278,
    lng: 127.0275833,
  });
  const queryClient = useQueryClient();
  queryClient.setQueryData(["setCenter"], () => setCenter);
  const [zoom, setZoom] = useState<number>(13);
  const { systemTheme } = useTheme();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY!,
  });
  const mapRef = useRef<any>();
  const [map, setMap] = useState(null);
  var zoomTemp = zoom;
  const [isDefined, setIsDefined] = useState(false);

  function calculateDateInterval(inputDate: string) {
    const today: Date = new Date();
    const targetDate: Date = new Date(inputDate);

    // Calculate the difference in milliseconds
    const timeDifference: number = today.getTime() - targetDate.getTime();

    // Convert milliseconds to days
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    return {
      today: formatDate(today),
      targetDate: formatDate(targetDate),
      days: daysDifference,
    };
  }

  function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const day: string = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map);
    setIsDefined(true);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <div className="w-screen h-screen">
      {isLoaded ? (
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onDragEnd={() => {
            // isDefined && console.log(mapRef.current.state.map.center);
            isDefined && setCenter(mapRef.current.state.map.center);
          }}
          options={{
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: MapStyleRetro,
            // styles: systemTheme == "dark" ? MapStyleAubergine : MapStyleRetro,
          }}
          onZoomChanged={() => {
            // isDefined && mapRef.current.props.zoom == 10;
            isDefined && console.log(mapRef.current.state.map.zoom);
            setZoom(isDefined && mapRef.current.state.map.zoom);
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {markers.map((e, i) => {
            return (
              <MarkerF
                onLoad={onLoad}
                key={i}
                title={e.name}
                position={e.position}
                clickable
                onMouseDown={() => {
                  setSelectedMarker(e);
                  setCenter({
                    lat: e.position.lat + 0.005,
                    lng: e.position.lng,
                  });
                  setZoom(15);
                }}
                icon={{
                  url: "/images/dog-circle.png",
                  scaledSize: new window.google.maps.Size(80, 80),
                }}
              >
                {/* {selectedMarker == e && (
                  <InfoWindowF
                    position={selectedMarker}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -5),
                    }}
                    onCloseClick={() => {
                      // setSelectedMarker(null);
                    }}
                  >
                    <>
                      <div className="w-[350px] h-[250px] flex flex-col justify-start items-start space-y-2 overflow-y-scroll px-1 py-1 select-none dark:bg-black">
                      <div className="flex flex-col justify-center items-start space-y-1 w-fit">
                        <Chip
                          variant={"solid"}
                          color={
                            (calculateDateInterval(e.startDate).days / 365) *
                              100 >
                            75
                              ? "danger"
                              : (calculateDateInterval(e.startDate).days /
                                  365) *
                                  100 >
                                30
                              ? "warning"
                              : "success"
                          }
                          size={"md"}
                          className="text-white"
                        >
                          {(calculateDateInterval(e.startDate).days / 365) *
                            100 >
                          75
                            ? "방치 차량 추정"
                            : (calculateDateInterval(e.startDate).days / 365) *
                                100 >
                              30
                            ? "방치 차량 의심"
                            : "방치 차량 없음"}
                        </Chip>
                        <p className="font-bold text-base"> {e.name} </p>
                        <p className="text-sm">
                          {" "}
                          {e.address ? e.address : "주소 없음"}{" "}
                        </p>
                      </div>
                      <Divider></Divider>
                      <Progress
                        color={
                          (calculateDateInterval(e.startDate).days / 365) *
                            100 >
                          75
                            ? "danger"
                            : (calculateDateInterval(e.startDate).days / 365) *
                                100 >
                              30
                            ? "warning"
                            : "success"
                        }
                        value={
                          (calculateDateInterval(e.startDate).days / 365) * 100
                        }
                        size={"md"}
                        label={
                          <p className="font-bold text-center w-full text-xs">
                            {e.startDate}부터{" "}
                            {calculateDateInterval(e.startDate).days}일 간 이동
                            없음
                          </p>
                        }
                      ></Progress>
                      <Card className="w-full h-[90%] mx-auto overflow-scroll">
                        <Image
                          src={e.imgSrc}
                          width={360}
                          height={360}
                          alt="after-detection"
                          className="object-cover w-full h-full"
                        ></Image>
                      </Card>
                    </div>
                    </>
                  </InfoWindowF>
                )} */}
              </MarkerF>
            );
          })}
        </GoogleMap>
      ) : (
        <div className="flex h-full w-full justify-center items-center">
          <Spinner size={"lg"}></Spinner>
        </div>
      )}
    </div>
  );
}
