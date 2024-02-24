"use client";

import Tutorial from "@/components/modal-tutorial";
import { Card, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { LottieHi } from "@/components/common/lotties";
import { projectInfo } from "@/components/common/data";
import Footer from "@/components/common/footer";

const homeTutorialContent = [
  {
    header: (
      <div className="text-2xl font-bold">{/* 짜잔! 바라는바당입니다. */}</div>
    ),
    body: (
      <div>
        <p className="w-full text-xl font-bold text-center">
          {projectInfo.description}
        </p>
        <div className="flex flex-col items-center w-full">
          <LottieHi loop={true} width={"200px"}></LottieHi>
        </div>
        <p className="w-full text-center text-pretty">
          안녕하세요. {projectInfo.name}입니다.
        </p>
        <p className="w-full text-center text-pretty">
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
  //       <p className="px-2 break-keep text-pretty">
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
    router.push("/map");
  }, []);

  return (
    <section className="z-0 flex flex-col items-center justify-start w-full h-screen py-8 space-y-6">
      <div className="flex flex-col items-start justify-center w-full px-4 space-y-1">
        <p className="w-full text-xl font-bold select-none text-start">
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
      <Tutorial tutorialContent={homeTutorialContent}></Tutorial>
      <Footer tabIndex={tabIndex} setTabIndex={setTabIndex}></Footer>
    </section>
  );
}
