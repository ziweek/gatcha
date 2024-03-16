"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { useState } from "react";
import { Card, Pagination } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/kakao-map";
import { useQuery } from "@tanstack/react-query";
import { typeForDataset } from "@/hooks/useFakeData";

export default function Home() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryDisplayDataset = useQuery({
    queryKey: ["displayedDataset"],
    queryFn: () => {},
  });

  return (
    <>
      <section className="z-0 flex flex-col items-center justify-start w-full bg-secondary min-h-screen">
        <Header
          isSearchBarVisible={!isModalVisible}
          isFixed={!isModalVisible}
          isLogoVisible={!isModalVisible}
          isGpsVisible={!isModalVisible}
          isBackButtonVisible={isModalVisible}
          title={isModalVisible && "반려견 탄색하기"}
          isFilterBoxVisible={true}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        ></Header>
        {!isModalVisible ? (
          <KakaoMap></KakaoMap>
        ) : (
          <div className="flex flex-col justify-start px-4 gap-2 items-center pb-12 pt-4 w-full min-h-full">
            {(queryDisplayDataset.data as typeForDataset | any)?.map(
              (e: any, i: any) => {
                return (
                  <Card
                    key={i}
                    className="w-full flex h-full flex-col justify-between p-2"
                    shadow={"none"}
                    fullWidth
                    isPressable
                    disableAnimation
                    onPress={() => {
                      router.push("/detail");
                    }}
                  >
                    <div className="w-full flex flex-row justify-between items-center gap-1 h-full">
                      <Image
                        src={"/images/landing-dog.jpg"}
                        width="50"
                        height="50"
                        alt="dog"
                        className="object-cover rounded-xl w-[100px] h-[100px] aspect-square"
                      ></Image>
                      <div className="px-2 gap-2 flex flex-row items-start justify-start h-full w-full">
                        <div className="flex flex-col gap-1/2 justify-between items-start w-full h-full">
                          <p className="font-bold">{e.dogType}</p>
                          <div className="flex flex-row gap-1">
                            <p className="text-tiny">{e.dogSex}</p>
                            <p className="text-tiny">{e.dogAge}개월령</p>
                          </div>
                          <p className="text-[0.75rem] line-clamp-2 text-start pt-2 leading-tight">
                            우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도
                            잘벌고 좋아요 우리 강아지 짱짱 착하고 꽤나 귀엽고
                            심지어 돈도 잘벌고 좋아요
                          </p>
                        </div>
                        <div className="flex flex-col gap-1/2 justify-between items-end min-w-fit h-full">
                          <p className="font-bold text-primary">25만원</p>
                          <p className="text-green-600 text-tiny font-semibold pt-5">
                            안심입양
                          </p>
                          <p className="text-tiny text-green-600">
                            입양사고 보장
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }
            )}
            <Pagination
              total={5}
              initialPage={1}
              variant={"faded"}
              showControls
              className="py-8"
            ></Pagination>
          </div>
        )}
        {!isModalVisible && (
          <Footer
            isOneButton
            title="지도 탐색"
            buttonText="이 지역 반려견 보기"
            isTipButtonVisible
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          ></Footer>
        )}
      </section>
    </>
  );
}
