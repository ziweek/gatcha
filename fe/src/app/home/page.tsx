"use client";

import { Card, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { LottieHi } from "@/components/common/lotties";
import { projectInfo } from "@/components/common/data";
import Footer from "@/components/common/footer";

export default function Home() {
  const [mobile, setMobile] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1224px)" });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();

  const checkResize = () => {
    if (isTabletOrMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    router.push("/map");
  }, []);

  return (
    <section className="z-0 flex flex-col items-center justify-start w-full h-screen py-8 space-y-6">
      {tabIndex == 0 ? (
        <div
          className="flex h-fit w-full px-6 select-none flex-col items-center justify-start max-w-[1200px]"
          style={
            mobile && false
              ? { gap: "20px" }
              : {
                  display: "grid",
                  gridTemplateAreas: `"a a" "b c" "d e"`,
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr 1fr",
                  gap: "10px",
                }
          }
        >
          {[
            {
              text: "반려동물 맡기기",
              gridArea: "a",
            },
            {
              text: "",
              gridArea: "b",
            },
            {
              text: "",
              gridArea: "c",
            },
            {
              text: "",
              gridArea: "d",
            },
            {
              text: "",
              gridArea: "e",
            },
          ].map((e, i) => {
            return (
              <Card
                style={{ gridArea: e.gridArea }}
                key={i}
                isPressable
                isHoverable
                shadow={"sm"}
                radius={"sm"}
                className="min-h-[150px] h-full w-full p-4 bg-cover bg-center border-1"
                onPress={() => {
                  router.push("/search");
                }}
              >
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <p className="w-full text-sm">{e.text}</p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div
          className="flex h-fit w-full px-6 select-none flex-col items-center justify-start max-w-[1200px] gap-4 pb-[150px]"
          // style={
          //   mobile && false
          //     ? { gap: "20px" }
          //     : {
          //         display: "grid",
          //         gridTemplateAreas: `"a a" "b c" "d e"`,
          //         gridTemplateColumns: "1fr 1fr",
          //         gridTemplateRows: "1fr 1fr 1fr",
          //         gap: "10px",
          //       }
          // }
        >
          <div className="flex flex-col items-start justify-center w-full gap-8">
            <div className="flex flex-col items-start justify-center w-full">
              <p className="w-full text-xl font-bold select-none text-start">
                사용자님,
              </p>
              <p className="w-full text-xl select-none text-start">
                집에서 편리하게
              </p>
              <p className="w-full text-xl select-none text-start">
                펫케어 서비스를
              </p>
              <p className="w-full text-xl select-none text-start">
                이용해보세요.
              </p>
            </div>
            <Input
              placeholder="이용할 집주소 검색하기"
              variant={"flat"}
              classNames={{ input: "text-lg" }}
              onFocus={() => {
                router.push("/search");
              }}
            ></Input>
          </div>
          <div className="w-full flex flex-col justify-center items-center h-[150px]">
            <div className="flex flex-col items-center justify-center w-full">
              <p className="w-full text-xl font-bold text-center select-none">
                편안한 반려 생활
              </p>
              <p className="w-full text-xl font-bold text-center select-none">
                홈서비스가 도와드립니다.
              </p>
              <p className="w-full pt-2 text-sm text-center select-none">
                혜택을 소개할게요.
              </p>
            </div>
          </div>
          <div className="h-[500px] bg-red-200 w-full flex flex-col justify-center items-center">
            소개 이미지
          </div>
          <div className="h-[500px] bg-red-200 w-full flex flex-col justify-center items-center">
            소개 이미지
          </div>
          <div className="h-[500px] bg-red-200 w-full flex flex-col justify-center items-center">
            소개 이미지
          </div>
        </div>
      )}
      <Footer tabIndex={tabIndex} setTabIndex={setTabIndex}></Footer>
    </section>
  );
}
