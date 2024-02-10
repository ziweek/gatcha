"use client";

import Tutorial from "@/components/tutorial";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Input,
} from "@nextui-org/react";
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

const tabData = [
  {
    title: "어떤 반려동물을 찾고 계신가요?",
    content: [],
  },
  {
    title: "어떤 관리가 필요하신가요?",
    content: [],
  },
];

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
    checkResize();
  }, [isTabletOrMobile]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-start z-0 py-8 space-y-6">
      <div className="flex flex-col justify-center items-start px-4 space-y-1 w-full">
        <p className="select-none text-xl font-bold text-start w-full">
          {tabIndex == 0 ? tabData[0].title : ""}
        </p>
      </div>
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
                  // router.push("/game");
                }}
              >
                <div className="flex flex-col justify-center items-center w-full h-full">
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
          <div className="flex flex-col justify-center items-start w-full gap-4">
            <div className="flex flex-col justify-center items-start w-full">
              <p className="select-none text-xl font-bold text-start w-full">
                사용자님,
              </p>
              <p className="select-none text-xl text-start w-full">
                집에서 편리하게
              </p>
              <p className="select-none text-xl text-start w-full">
                펫케어 서비스를
              </p>
              <p className="select-none text-xl text-start w-full">
                이용해보세요.
              </p>
            </div>
            <Input
              placeholder="이용할 집주소 검색하기"
              variant={"flat"}
            ></Input>
          </div>
          <div className="w-full flex flex-col justify-center items-center h-[150px]">
            <div className="flex flex-col justify-center items-center w-full">
              <p className="select-none text-xl font-bold w-full text-center">
                편안한 반려 생활
              </p>
              <p className="select-none text-xl font-bold w-full text-center">
                홈서비스가 도와드립니다.
              </p>
              <p className="select-none text-sm w-full text-center pt-2">
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
      <Tutorial tutorialContent={homeTutorialContent}></Tutorial>
      <Footer tabIndex={tabIndex} setTabIndex={setTabIndex}></Footer>
    </section>
  );
}
