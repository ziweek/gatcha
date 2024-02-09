"use client";

import Tutorial from "@/components/tutorial";
import { Card, CardHeader, CardBody, Divider, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { LottieHi, LottieDebate } from "@/components/common/lotties";
import { projectInfo } from "@/components/common/data";
import Footer from "@/components/common/footer";

const homeTutorialContent = [
  {
    header: (
      <div className="text-2xl font-bold">{/* 짜잔! 바라는바당입니다. */}</div>
    ),
    body: (
      <div>
        <p className="text-center w-full text-xl font-bold">
          {projectInfo.description}
        </p>
        <div className="w-full flex flex-col items-center">
          <LottieHi loop={true} width={"200px"}></LottieHi>
        </div>
        <p className="text-center w-full text-pretty">
          안녕하세요. {projectInfo.name}입니다.
        </p>
        <p className="text-center w-full text-pretty">
          지금부터 튜토리얼을 진행하겠습니다.
        </p>
      </div>
    ),
  },
  // {
  //   header: <div className="font-bold ">국회 의정 체험 활동 주제 선택하기</div>,
  //   body: (
  //     <>
  //       <LottieDebate loop={true} height={"250px"}></LottieDebate>
  //       <p className="font-bold">기능소개</p>
  //       <p className="break-keep text-pretty  px-2">
  //         다양한 주제에서 국회 의정활동 체험을 즐겨보세요. 흥미로운 주제로 더욱
  //         유익하고 재미있는 체험을 즐길 수 있습니다!
  //       </p>
  //     </>
  //   ),
  // },
];

export default function Home() {
  const [mobile, setMobile] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1224px)" });
  const router = useRouter();

  const checkResize = () => {
    if (isTabletOrMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    checkResize();
  }, [isTabletOrMobile]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-start z-0 py-8 space-y-12">
      <div className="flex flex-col justify-center items-start px-6 space-y-1 w-full">
        <p className="select-none text-xl font-bold text-start w-full">
          어떤 반려동물을 찾고 계신가요?
        </p>
        <p className="text-pretty break-keep text-sm"></p>
      </div>
      <div
        className="flex h-fit w-[90vw] select-none flex-col items-center justify-start max-w-[1200px]"
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
              className="min-h-[150px] h-full w-full p-4 bg-cover bg-center hover:-translate-y-1 border-1"
              onPress={() => {
                // router.push("/game");
              }}
            >
              <div className="flex flex-col justify-center items-center w-full h-full">
                <p className="w-full text-sm">{e.text}</p>
              </div>
            </Card>
          );
        })}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Tutorial tutorialContent={homeTutorialContent}></Tutorial>
      <Footer></Footer>
    </section>
  );
}
