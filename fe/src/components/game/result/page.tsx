"use client";

import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useState } from "react";
import {
  AnimatedInput,
  AnimatedTextArea,
} from "@/components/animated-input-area";
import { sampleResultData } from "@/components/common/data";
import Tutorial from "@/components/tutorial";

const resultTutorialContent = [
  {
    header: (
      <div className="font-bold text-xl">
        카드를 좌우로 밀어서 활동 진행하기
      </div>
    ),
    body: (
      <>
        {/* <LottieCardStack loop={true} height={"250px"}></LottieCardStack> */}
        <p className="font-bold">기능소개</p>
        <p className="px-2 text-xl text-pretty break-keep">
          간편한 좌우 스와이프로 카드를 조작하여 활동을 즐겨보세요. 더욱
          편리하고 즐거운 경험이 여러분을 기다리고 있어요!
        </p>
      </>
    ),
  },
  {
    header: (
      <div className="font-bold text-xl">스테이지 별로 새로운 챗봇 만나기</div>
    ),
    body: (
      <>
        {/* <LottieChatbot loop={true} height={"250px"}></LottieChatbot> */}
        <p className="font-bold">기능소개</p>
        <p className="px-2 text-xl text-pretty break-keep">
          스테이지마다 새로운 챗봇을 만나보세요. 각자의 주장과 지식을 공유하는
          다양한 챗봇들이 여러분을 기다리고 있습니다!
        </p>
      </>
    ),
  },
  {
    header: (
      <div className="font-bold text-xl">선택에 따른 지지도 변화 확인하기</div>
    ),
    body: (
      <>
        {/* <LottieCardStack loop={true} height={"250px"}></LottieCardStack> */}
        <p className="font-bold">기능소개</p>
        <p className="px-2 text-xl text-pretty break-keep">
          지지도 변화를 빠르게 확인하세요. 실제 통계자료를 기반으로 선택에 따른
          지지도의 동향을 손쉽게 파악할 수 있습니다.
        </p>
      </>
    ),
  },
];

export default function GameResult() {
  const router = useRouter();
  // const [result, setResult] = useState(sampleResultData);
  const [lawName, setLawName] = useState(sampleResultData["law name"]);
  const [resultLegislativeIntent, setResultLegislativeIntent] = useState(
    sampleResultData["legislative intent"]
  );
  const [resultPolicyContents, setResultPolicyContents] = useState(
    sampleResultData["Policy contents"]
  );
  const [cardinalDirection, setCardinalDirection] = useState(
    sampleResultData["cardinal direction"]
  );

  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-between z-0 px-6">
      <div
        className="flex flex-col space-y-8 py-8 w-full max-w-xl justify-between min-h-screen"
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridTemplateColumns: "1fr",
        }}
      >
        <p className="select-none text-2xl font-bold text-start w-full">
          생성형 AI로 작성한 입법안 초안
        </p>
        <Accordion selectionMode={"single"} variant={"bordered"}>
          {[
            {
              title: <p className="font-bold text-lg">법안 이름</p>,
              content: [{ title: lawName, textArea: null, policies: null }],
            },
            {
              title: <p className="font-bold text-lg">입법 취지</p>,
              content: [
                {
                  title: null,
                  textArea: resultLegislativeIntent,
                  policies: null,
                },
              ],
            },
            {
              title: <p className="font-bold text-lg">기본 방향</p>,
              content: cardinalDirection.map((e, i) => {
                return { title: e.title, textArea: e.text, policies: null };
              }),
            },
            {
              title: <p className="font-bold text-lg">정책 내용</p>,
              content: resultPolicyContents.map((e, i) => {
                return { title: e.title, textArea: null, policies: e.policies };
              }),
            },
          ].map((e, i) => {
            return (
              <AccordionItem
                key={i + 1}
                aria-label="Accordion 1"
                title={e.title}
              >
                <div className="pb-4">
                  {i > 1 && (
                    <div className="flex flex-row justify-end w-full items-center pb-4">
                      <Button size={"sm"} variant={"flat"}>
                        섹션 추가하기
                      </Button>
                    </div>
                  )}
                  <div className="space-y-16">
                    {e.content.map((c, j) => {
                      return (
                        <div key={j} className="space-y-2">
                          {c.title && (
                            <AnimatedInput
                              isAnimated={true}
                              key={i}
                              value={c.title}
                              label={`${i > 0 ? `소제목 ${j + 1}` : "제목"}`}
                            ></AnimatedInput>
                          )}
                          {c.textArea && (
                            <AnimatedTextArea
                              isAnimated={true}
                              key={j}
                              value={c.textArea}
                              label="본문"
                              onChange={(e: any) => {
                                // setResult((prev) => ({
                                //   ...prev,
                                //   "legislative intent": e.target.value,
                                // }));
                              }}
                            ></AnimatedTextArea>
                          )}
                          {c.policies && (
                            <>
                              {c.policies.map((p, k) => {
                                return (
                                  <AnimatedTextArea
                                    key={k}
                                    isAnimated={true}
                                    value={p}
                                    label={`정책 ${k + 1}`}
                                    onChange={(e: any) => {
                                      // setResult((prev) => ({
                                      //   ...prev,
                                      //   "legislative intent": e.target.value,
                                      // }));
                                    }}
                                  ></AnimatedTextArea>
                                );
                              })}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Button
          size={"lg"}
          fullWidth
          color={"primary"}
          className="font-bold min-h-fit"
          onPress={() => {
            router.push("/game/summary");
          }}
        >
          입법안 제출하기
        </Button>
      </div>
      <Tutorial tutorialContent={resultTutorialContent}></Tutorial>
    </section>
  );
}
