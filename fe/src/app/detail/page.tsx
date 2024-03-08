"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Footer from "@/components/common/footer";
import { useRouter } from "next/navigation";

export default function Detail() {
  const router = useRouter();

  return (
    <section className="z-0 flex flex-col items-center justify-start w-full h-full pb-8 space-y-6">
      <div className="flex flex-col w-full h-fit">
        <div className="absolute top-4 left-4 w-fit h-fit z-50">
          <Button
            variant={"solid"}
            isIconOnly
            radius={"full"}
            className="font-bold"
            onPress={() => {
              router.back();
            }}
          >
            {"<"}
          </Button>
        </div>
        <Carousel autoPlay>
          {[
            { imgSrc: "/images/landing-dog2.jpg" },
            { imgSrc: "/images/landing-dog.jpg" },
            { imgSrc: "/images/1.jpg" },
          ].map((e, i) => {
            return (
              <div key={i}>
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
        <div className="flex flex-col w-full h-fit gap-8">
          <div className="gap-2 flex flex-col items-start justify-between h-full px-4">
            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex flex-row gap-1 justify-start items-center">
                <p className="font-semibold text-red-400">안심입양</p>
                <p className="font-semibold text-tiny">입양사고 보장</p>
              </div>
              <p className="font-semibold text-tiny">17일 전</p>
            </div>
            <p className="text-xl font-bold">25만원</p>
            <div className="flex flex-row gap-1">
              <p className="text-sm">요크셔테리어</p>
              <p className="text-sm">남자아이</p>
              <p className="text-sm">3개월령</p>
            </div>
            <p className="text-sm line-clamp-3 w-full text-start">
              우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도 잘벌고 좋아요.
              우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도 잘벌고 좋아요.
              우리 강아지 짱짱 착하고 꽤나 귀엽고 심지어 돈도 잘벌고 좋아요
            </p>
          </div>
          <div className="bg-primary/25 h-full p-4 w-full">
            <div className="flex flex-col items-center w-full h-full gap-4">
              <div className="flex flex-row justify-start w-full">
                <div className="flex flex-col justify-start w-full">
                  <p> 3대 입양 사고에 대해 100% 보장</p>
                  <p> 3대 입양 사고에 대해 100% 보장</p>
                  <p> 3대 입양 사고에 대해 100% 보장</p>
                </div>
                <div>더 알아보기</div>
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
              <div>3대 입양 사고에 대해 100% 보장</div>
            </div>
          </div>
          <div className="h-[500px] w-full"></div>
        </div>
      </div>
      <Footer isOneButton buttonText={"문의하기"}></Footer>
    </section>
  );
}
