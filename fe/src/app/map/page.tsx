"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import BaseMap from "@/components/google-map";
import { useState } from "react";
import { Card, Pagination } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/kakao-map";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  return (
    <section className="z-0 flex flex-col items-center justify-center w-full bg-secondary">
      <Header
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
        // <BaseMap></BaseMap>
        <KakaoMap></KakaoMap>
      ) : (
        <div className="flex flex-col justify-start px-4 gap-2 items-center pb-12 pt-8 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => {
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
                      <p className="text-md font-bold">요크셔테리어</p>
                      <div className="flex flex-row gap-1">
                        <p className="text-tiny">남자아이</p>
                        <p className="text-tiny">3개월령</p>
                      </div>
                      <p className="text-tiny line-clamp-2 text-start pt-2">
                        우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도 잘벌고
                        좋아요 우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도
                        잘벌고 좋아요
                      </p>
                    </div>
                    <div className="flex flex-col gap-1/2 justify-between items-end min-w-fit h-full">
                      <p className="text-lg font-bold">25만원</p>
                      <p className="text-primary text-tiny font-semibold pt-5">
                        안심입양
                      </p>
                      <p className="text-tiny text-primary">입양사고 보장</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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
  );
}
