"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { useEffect, useState } from "react";
import { Card, Pagination } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import KakaoMap from "@/components/kakao-map";
import { useQuery } from "@tanstack/react-query";
import { typeForDataset } from "@/hooks/useFakeData";

function DogImage() {
  const [dogImgSrc, setDogImgSrc] = useState<string>("");

  const imageLoader = async () => {
    const data = await fetch("https://dog.ceo/api/breeds/image/random")
      .then(async (response: any) => {
        const res = await response.json();
        await console.log("response:", res.message);
        setDogImgSrc(res.message);
        return res.message;
      })
      .catch((error) => {
        console.log("error:", error);
        return "https://example.com";
      });
    return dogImgSrc;
  };

  useEffect(() => {
    imageLoader();
  }, []);

  return (
    <Image
      src={dogImgSrc}
      priority
      width="50"
      height="50"
      alt="dog"
      className="object-cover rounded-xl w-[100px] h-[100px] aspect-square"
    ></Image>
  );
}

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
                      router.push(`/detail/${i}`);
                    }}
                  >
                    <div className="w-full flex flex-row justify-between items-center gap-1 h-full">
                      <DogImage></DogImage>
                      <div className="px-2 gap-2 flex flex-row items-start justify-start h-full w-full">
                        <div className="flex flex-col gap-1/2 justify-between items-start w-full h-full">
                          <p className="font-bold">{e.dogType}</p>
                          <div className="flex flex-row gap-1">
                            <p className="text-tiny">{e.dogSex}</p>
                            <p className="text-tiny">{e.dogAge}개월령</p>
                          </div>
                          <p className="text-[0.75rem] line-clamp-2 text-start pt-2 leading-tight">
                            사랑스러운 강아지 멍멍은 활발하고 친근한 성격으로
                            주인과의 놀이를 즐깁니다. 또한 똑똑하여 기본적인
                            훈련에 빠르게 적응하며, 가족들과의 행복한 시간을
                            만들어줍니다. 건강하고 활발한 라이프스타일을
                            선호하는 가정에 멍멍이는 완벽한 동반자가 될
                            것입니다.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1/2 justify-between items-end min-w-fit h-full">
                          <p className="font-bold text-primary">
                            {e.contractPrice} 만원
                          </p>
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
            {/* <Pagination
              total={5}
              initialPage={1}
              variant={"faded"}
              showControls
              className="py-8"
            ></Pagination> */}
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
