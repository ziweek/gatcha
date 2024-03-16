"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
import { Button, Link, Textarea } from "@nextui-org/react";
import Footer from "@/components/common/footer";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { typeForDataset } from "@/hooks/useFakeData";

export default function Detail() {
  const router = useRouter();
  const queryDisplayDataset = useQuery({
    queryKey: ["displayedDataset"],
    queryFn: () => {},
    refetchOnMount: true,
  });

  return (
    <>
      {queryDisplayDataset != undefined && (
        <section className="z-0 flex flex-col items-center justify-start w-full h-full pb-8 space-y-6">
          <div className="flex flex-col w-full h-fit">
            <div className="absolute top-4 left-4 w-fit h-fit z-50">
              <Button
                variant={"solid"}
                isIconOnly
                radius={"full"}
                className="font-bold"
                color={"primary"}
                onPress={() => {
                  router.back();
                }}
              >
                {"<"}
              </Button>
            </div>
            <Carousel autoPlay dynamicHeight showThumbs={false}>
              {[
                { imgSrc: "/images/landing-dog2.jpg" },
                { imgSrc: "/images/landing-dog.jpg" },
                { imgSrc: "/images/1.jpg" },
              ].map((e, i) => {
                return (
                  <div key={i} className="h-full">
                    <Image
                      src={e.imgSrc}
                      width={100}
                      height={100}
                      className="h-[300px] object-cover object-center"
                      alt="a"
                    />
                  </div>
                );
              })}
            </Carousel>
            <div className="flex flex-col w-full h-fit gap-8 py-8">
              {/*  */}
              <div className="gap-2 flex flex-col items-start justify-between h-full px-4">
                <div className="flex flex-row justify-between w-full items-center">
                  <div className="flex flex-row gap-1 justify-start items-center">
                    <p className="font-semibold text-red-400">안심입양</p>
                    <p className="font-semibold text-tiny">입양사고 보장</p>
                  </div>
                  <p className="font-semibold text-tiny">17일 전</p>
                </div>
                <p className="text-xl font-bold">
                  {/* {(queryDisplayDataset.data as any)[0]?.contractPrice || ""} */}
                  aaa 만원
                </p>
                <div className="flex flex-row gap-1">
                  <p className="text-sm">
                    {/* {(queryDisplayDataset.data as any)[0]?.dogType || ""} */}
                    aaa
                  </p>
                  <p className="text-sm">
                    {/* {(queryDisplayDataset.data as any)[0]?.dogSex || ""} */}
                    aaa
                  </p>
                  <p className="text-sm">
                    {/* {(queryDisplayDataset.data as any)[0]?.dogAge || ""} */}
                    aaa
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="bg-primary/25 h-full py-4 px-8 w-full">
                <div className="flex flex-col items-center w-full h-full gap-4">
                  <div className="flex flex-row justify-start w-full">
                    <div className="flex flex-col justify-start w-full gap-2">
                      <p className="font-semibold text-primary">
                        입양사고 책임 보장
                      </p>
                      <p className="text-tiny">
                        똑똑과 업체의 계약서 공동 날인으로<br></br>입양사고에
                        대해 100% 책임을 집니다.
                      </p>
                    </div>
                    <Link
                      size={"sm"}
                      className="min-w-fit h-full underline text-blue-500"
                    >
                      더 알아보기
                    </Link>
                  </div>
                  <div className="flex flex-row justify-around items-center h-full w-full">
                    {["건강보장", "품종보장", "가격보장"].map((e, i) => (
                      <div
                        key={i}
                        className="flex rounded-full h-[100px] aspect-square bg-primary flex-col justify-center items-center text-white font-bold"
                      >
                        {e}
                      </div>
                    ))}
                  </div>
                  <div className="font-bold">
                    3대 입양 사고에 대해 100% 보장
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="h-full w-full px-4">
                <Textarea
                  className="px-4 h-full"
                  height={"100%"}
                  variant={"underlined"}
                  disableAutosize
                  readOnly
                  value={`안녕하세요!\n\n🐾 🌈 반려견의 행복과 따뜻한 가족을 찾아주실 분을 기다리고 있는 소중한 생명이 있습니다. 바로 저희가 자랑스럽게 소개하는 ${
                    11
                    // (queryDisplayDataset.data as any)[0]?.dogType
                  }이에요. \n\n코코는 활기차고 호기심 가득한 성격으로 주변을 밝게 비춰줄 작은 햇볕 같은 존재에요. 사람들과의 소통을 즐기며, 애정 어린 눈빛으로 주인을 향해 다가가곤 합니다. 놀이와 산책을 좋아하며, 적극적으로 활동적인 생활을 즐깁니다. 물론, 소파에 풀죽어 누워 마음의 평화를 찾는 것도 즐겨하는 달콤한 고양이처럼 귀엽기도 해요.`}
                  classNames={{
                    input: "text-md leading-loose min-h-[500px] h-full",
                    inputWrapper: "border-transparent",
                  }}
                ></Textarea>
              </div>
            </div>
          </div>
          <Footer isOneButton buttonText={"문의하기"}></Footer>
        </section>
      )}
    </>
  );
}
