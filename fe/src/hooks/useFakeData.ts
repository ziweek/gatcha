import { fakerKO as faker } from "@faker-js/faker";
import { FILTER_PRESET } from "@/components/common/data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type typeForDataset = {
  dogType: string;
  contractPrice: number;
  dogSex: string;
  dogAge: number;
  lat: number;
  lng: number;
};

export function getFakeData() {
  const aaa = FILTER_PRESET;
  return {
    contractType: faker.helpers.arrayElement(
      aaa.content.contractType.items as string[]
    ),
    dogType: faker.helpers.arrayElement(aaa.content.dogType.items as string[]),
    contractPrice: faker.number.int({ min: 40, max: 300 }),
    dogSex: faker.helpers.arrayElement(["남성", "여성"] as string[]),
    dogAge: faker.number.int({ min: 0, max: 15 }),
    lat: faker.location.latitude({ min: 35, max: 37.7 }),
    lng: faker.location.longitude({ min: 126.7, max: 129 }),
    dogImg: "",
  };
}

export function useDataset() {
  const [originDataset, setOriginDataset] = useState<typeForDataset[]>([]);
  const [filteredDataset, setFilteredDataset] = useState<typeForDataset[]>([]);
  const [displayedDataset, setDisplayedDataset] = useState<typeForDataset[]>(
    []
  );

  const queryOriginDataset = useQuery({
    queryKey: ["queryOriginDataset"],
    queryFn: () => originDataset,
  });
  const queryFilteredDataset = useQuery({
    queryKey: ["queryFilteredDataset"],
    queryFn: () => filteredDataset,
  });
  const queryDisplayedDataset = useQuery({
    queryKey: ["queryDisplayedDataset"],
    queryFn: () => displayedDataset,
  });

  return {
    originDataset,
    setOriginDataset,
    queryOriginDataset,
    //
    filteredDataset,
    setFilteredDataset,
    queryFilteredDataset,
    //
    displayedDataset,
    setDisplayedDataset,
    queryDisplayedDataset,
  };
}
