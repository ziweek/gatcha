"use client";

import CardStack from "@/components/card-stack";
import {
  Divider,
  Progress,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  Tooltip,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  IconLove,
  IconDislike,
  IconLike,
  IconStatistic,
} from "@/components/common/icons";
import { sampleStageData } from "@/components/common/data";
import { useMediaQuery } from "react-responsive";
import TextBubble from "@/components/text-bubble";
import { LottieCardStack, LottieChatbot } from "@/components/common/lotties";
import Tutorial from "@/components/tutorial";

export default function Game() {
  const [indexStage, setIndexStage] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [numRejected, setNumRejected] = useState(0);
  const [numAccepted, setNumAccepted] = useState(0);
  const [isPointRight, setisPointRight] = useState(false);
  const [isPointLeft, setisPointLeft] = useState(false);
  const [supporter, setSupporter] = useState(0);
  const [opponent, setOpponent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:700px)" });
  const [dialogContext, setDialogContext] = useState([
    {
      isAnimated: true,
      isSent: false,
      isLoading: false,
      imgSrc: sampleStageData[indexStage].content[currentCardIndex]?.imgSrc,
      name: sampleStageData[indexStage].content[currentCardIndex]?.name,
      text: "안녕하세요! 저는 누구누구 입니다.",
    },
  ]);
  const [slidedDirection, setSlidedDirection] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [inputText, setInputText] = useState("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const gameTutorialContent = [
    {
      header: (
        <div className="font-bold">카드를 좌우로 밀어서 활동 진행하기</div>
      ),
      body: (
        <>
          <LottieCardStack loop={true} height={"250px"}></LottieCardStack>
          <p className="font-bold">기능소개</p>
          <p className="text-pretty break-keep">
            간편한 좌우 스와이프로 카드를 조작하여 활동을 즐겨보세요. 더욱
            편리하고 즐거운 경험이 여러분을 기다리고 있어요!
          </p>
        </>
      ),
    },
    {
      header: <div className="font-bold">스테이지 별로 새로운 챗봇 만나기</div>,
      body: (
        <>
          <LottieChatbot loop={true} height={"250px"}></LottieChatbot>
          <p className="font-bold">기능소개</p>
          <p className="text-pretty break-keep">
            스테이지마다 새로운 챗봇을 만나보세요. 각자의 주장과 지식을 공유하는
            다양한 챗봇들이 여러분을 기다리고 있습니다!
          </p>
        </>
      ),
    },
    {
      header: <div className="font-bold">선택에 따른 지지도 변화 확인하기</div>,
      body: (
        <>
          <LottieCardStack loop={true} height={"250px"}></LottieCardStack>
          <p className="font-bold">기능소개</p>
          <p className="text-pretty break-keep">
            지지도 변화를 빠르게 확인하세요. 실제 통계자료를 기반으로 선택에
            따른 지지도의 동향을 손쉽게 파악할 수 있습니다.
          </p>
        </>
      ),
    },
  ];

  // 채팅창 밑으로
  useEffect(() => {
    if (messageEndRef.current != null && messageEndRef.current != undefined) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [dialogContext, isModalVisible]);

  return (
    <section
      className={`flex h-screen w-full flex-col items-center justify-center z-0 ${sampleStageData[indexStage].backgroudColor}`}
    >
      <div className="absolute top-12 px-12 flex flex-col items-center space-y-4 max-w-xl">
        <div className="flex flex-col items-center space-y-2">
          <Spinner color="primary" size={"sm"} />
          <p className="text-white text-sm font-bold">GPT 생성 중</p>
        </div>
        <Divider className="bg-white"></Divider>
        <p className="text-xl font-bold text-center text-white text-balance break-keep">
          {sampleStageData[indexStage].description}
        </p>
        <Progress
          size="sm"
          aria-label="Loading..."
          classNames={{ track: "bg-white/50" }}
          value={
            (currentCardIndex / sampleStageData[indexStage].content.length) *
            100
          }
          color={
            indexStage == 0
              ? "primary"
              : indexStage == 1
              ? "warning"
              : "secondary"
          }
        />
        <div className="flex flex-row justify-between h-fit w-full">
          {[
            {
              icon: <IconDislike width={"30px"} fill="#fff"></IconDislike>,
              color: "danger",
              colorCode: "f31260",
              isOpen: false,
              number: numRejected,
              tooltipContext: {
                title: "지지세력 증가",
                description: `방금 전의 공감으로 인해 ${
                  sampleStageData[indexStage].content[currentCardIndex - 1]
                    ?.name
                }이 법안을 지지하게 되었습니다.`,
              },
            },
            {
              icon: (
                <IconStatistic width={"30px"} fill={"#fff"}></IconStatistic>
              ),
              color: "danger",
              colorCode: "f31260",
              isOpen:
                slidedDirection == "left" && !isPointLeft && !isPointRight,
              number: `${opponent}K`,
              tooltipContext: {
                title: "반대세력 증가",
                description: `방금 전의 비공감으로 인해 ${
                  sampleStageData[indexStage].content[currentCardIndex - 1]
                    ?.name
                } ${randomNumber}k명이 법안을 반대하게 되었습니다.`,
              },
            },
            {
              icon: <IconLove width={"30px"} fill={"#fff"}></IconLove>,
              color: "success",
              colorCode: "17c964",
              isOpen:
                slidedDirection == "right" && !isPointLeft && !isPointRight,
              number: `${supporter}K`,
              tooltipContext: {
                title: "지지세력 증가",
                description: `방금 전의 공감으로 인해 ${
                  sampleStageData[indexStage].content[currentCardIndex - 1]
                    ?.name
                } ${randomNumber}k명이 법안을 지지하게 되었습니다.`,
              },
            },
            {
              icon: <IconLike width={"30px"} fill={"#fff"}></IconLike>,
              color: null,
              colorCode: "f31260",
              isOpen: false,
              number: numAccepted,
              tooltipContext: {
                title: "지지세력 증가",
                description: `방금 전의 공감으로 인해 ${
                  sampleStageData[indexStage].content[currentCardIndex - 1]
                    ?.name
                }이 법안을 지지하게 되었습니다.`,
              },
            },
          ].map((e, i) => {
            return (
              <Tooltip
                key={i}
                isOpen={e.isOpen}
                color={e.color == "success" ? "success" : "danger"}
                placement={"bottom"}
                showArrow={true}
                content={
                  <div className="px-1 py-2 text-white w-[275px] space-y-1">
                    <div className="text-lg font-bold">
                      {e.tooltipContext.title}
                    </div>
                    <div className="text-pretty font-bold break-normal">
                      {e.tooltipContext.description}
                    </div>
                  </div>
                }
              >
                <div
                  className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl ${
                    e.isOpen
                      ? `${
                          slidedDirection == "right"
                            ? "bg-[#17c964]"
                            : "bg-[#f31260]"
                        }  shadow-md`
                      : "bg-transparent"
                  }`}
                >
                  {e.icon}
                  <p className={"font-bold text-white text-sm"}>{e.number}</p>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <CardStack
        indexStage={indexStage}
        setIndexStage={setIndexStage}
        data={sampleStageData[indexStage].content}
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        setNumRejected={setNumRejected}
        numRejected={numRejected}
        setNumAccepted={setNumAccepted}
        numAccepted={numAccepted}
        //
        isPointRight={isPointRight}
        setisPointRight={setisPointRight}
        isPointLeft={isPointLeft}
        setisPointLeft={setisPointLeft}
        //
        supporter={supporter}
        setSupporter={setSupporter}
        opponent={opponent}
        setOpponent={setOpponent}
        //
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        //
        dialogContext={dialogContext}
        setDialogContext={setDialogContext}
        //
        slidedDirection={slidedDirection}
        setSlidedDirection={setSlidedDirection}
        //
        randomNumber={randomNumber}
        setRandomNumber={setRandomNumber}
      ></CardStack>
      {isPointRight && (
        <motion.div
          className="absolute space-y-2 h-[75px] w-[175px] bg-green-400 rounded-l-full right-0 bottom-[50vh] flex flex-col justify-center items-center z-50 pl-4"
          // animate={{ scale: [0, 1] }}
        >
          <IconLike width={"30px"} fill={"#fff"}></IconLike>
          <p className="h-fit w-fit z-10 font-bold text-white">
            네, 공감하고 있습니다.
          </p>
        </motion.div>
      )}
      {isPointLeft && (
        <motion.div
          className="absolute space-y-2 h-[75px] w-[175px] bg-red-400 rounded-r-full left-0 bottom-[50vh] flex flex-col justify-center items-center z-50 pr-4"
          // animate={{ scale: [0, 1] }}
        >
          <IconDislike width={"30px"} fill={"#fff"}></IconDislike>
          <p className="h-fit w-fit z-10 font-bold text-white">
            흠, 공감할 수 없군요.
          </p>
        </motion.div>
      )}
      <Modal
        isOpen={isModalVisible}
        isDismissable
        closeButton={
          <Button
            color={"danger"}
            size={"lg"}
            variant={"light"}
            onPress={() => {
              setIsModalVisible(false);
            }}
          >
            대화 종료
          </Button>
        }
        scrollBehavior={"normal"}
        className={`${isTabletOrMobile ? "h-[100vh]" : "h-[500px]"}`}
        size={isTabletOrMobile ? "full" : "lg"}
      >
        <ModalContent>
          <div
            className="flex flex-col justify-start h-full w-full pb-8"
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              gridTemplateColumns: "1fr",
            }}
          >
            <ModalHeader className="flex flex-col gap-2">
              챗봇과 대화하기
            </ModalHeader>
            <div className="overflow-y-scroll px-6 h-full">
              {dialogContext.map((e, i) => {
                return (
                  <TextBubble
                    key={i}
                    indexStage={indexStage}
                    isLoading={false}
                    isAnimated={e.isAnimated}
                    isSent={e.isSent}
                    imgSrc={e.imgSrc}
                    name={e.name}
                    text={e.text}
                    isLast={i == dialogContext.length - 1}
                  ></TextBubble>
                );
              })}
              <div ref={messageEndRef} className="h-[100px]"></div>
            </div>
            <ModalFooter>
              <Input
                className="w-full"
                variant={"faded"}
                classNames={{ input: "text-lg" }}
                isClearable
                onClear={() => {
                  setInputText("");
                }}
                value={inputText}
                onValueChange={(e) => {
                  setInputText(e);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setDialogContext([
                      ...dialogContext,
                      {
                        isAnimated: false,
                        isSent: true,
                        isLoading: false,
                        imgSrc:
                          sampleStageData[indexStage].content[currentCardIndex]
                            .imgSrc,
                        name: "사용자",
                        text: inputText,
                      },
                    ]);
                    setInputText("");
                  }
                }}
                endContent={
                  <Button
                    color={"success"}
                    variant={"flat"}
                    onPress={() => {
                      setDialogContext([
                        ...dialogContext,
                        {
                          isAnimated: false,
                          isSent: true,
                          isLoading: false,
                          imgSrc:
                            sampleStageData[indexStage].content[
                              currentCardIndex
                            ].imgSrc,
                          name: "사용자",
                          text: inputText,
                        },
                      ]);
                      setInputText("");
                    }}
                  >
                    전송
                  </Button>
                }
              ></Input>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
      <Tutorial tutorialContent={gameTutorialContent}></Tutorial>
    </section>
  );
}
