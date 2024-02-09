"use client";

import React, { useState, useEffect } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Button, Divider } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import { LottieComplete } from "./common/lotties";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sampleStageData } from "./common/data";
import { TypeAnimation } from "react-type-animation";

const CARD_OFFSET = 12.5;
const SCALE_FACTOR = 0.05;

export default function CardStack(props) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:500px)" });
  //
  const wrapperStyle = {
    position: "relative",
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
    width: "100%",
    height: "0%",
  };
  const cardWrapStyle = {
    position: "relative",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    width: "100%",
    height: "0%",
  };
  const cardSize = {
    width: isTabletOrMobile ? "80vw" : "400px",
    height: isTabletOrMobile ? "80vw" : "400px",
  };
  const cardStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    transformOrigin: "top center",
    listStyle: "none",
  };
  //
  const [cards, setCards] = useState(props.data);
  const [isFliped, setIsFliped] = useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(true);
  //
  const rotateY = useMotionValue(0);
  const opacityCardContent = useMotionValue(100);
  const width = useMotionValue(cardSize.width);
  const height = useMotionValue(cardSize.height);
  const router = useRouter();

  const removeFirst = (from) => {
    setIsFliped(false);
    rotateY.set(0);
    // console.log(rotateY);
    var newCards = [...cards];
    newCards.shift();
    // console.log(newCards);
    setCards(newCards);
  };

  async function handlerCardFlip() {
    animate(rotateY, isFliped ? 0 : 180, {
      type: "spring",
      damping: 12.5,
      stiffness: 100,
    });
    setIsFliped(!isFliped);
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    props.setDialogContext([
      {
        isAnimated: true,
        isSent: false,
        isLoading: false,
        imgSrc: props.data[props.currentCardIndex]?.imgSrc,
        name: props.data[props.currentCardIndex]?.name,
        text: `안녕하세요! 저는 ${
          props.data[props.currentCardIndex]?.name
        } 입니다.`,
      },
    ]);
  }, [cards]);

  useEffect(() => {
    if (props.dialogContext[props.dialogContext.length - 1].isSent == true) {
      // setIsLoading(true);
      const timer = setTimeout(() => {
        // setIsLoading(false);
        props.setDialogContext([
          ...props.dialogContext,
          {
            isAnimated: true,
            isSent: false,
            isLoading: false,
            imgSrc: props.data[props.currentCardIndex]?.imgSrc,
            name: props.data[props.currentCardIndex]?.name,
            text: "챗봇이 사용자의 발화에 응답하는 텍스트입니다. 본 기능은 아직 개발 중에 있으며, 2024년 2월 중으로 완성될 예정입니다.",
          },
        ]);
      }, 500);
    }
  }, [props.dialogContext]);

  return (
    <div className="mx-auto w-fit h-full" style={wrapperStyle}>
      <ul style={cardWrapStyle}>
        {cards?.length == 0 ? (
          <motion.div
            animate={{
              scale: [0.75, 1],
              opacity: [0, 1],
            }}
            onAnimationEnd={() => setIsAnimationCompleted(true)}
            className="h-full flex flex-col justify-end"
          >
            <div className="h-full space-y-16">
              <LottieComplete
                play={isAnimationCompleted}
                width={"250px"}
              ></LottieComplete>
              <Button
                size={"lg"}
                fullWidth
                color={
                  props.indexStage == 0
                    ? "primary"
                    : props.indexStage == 1
                    ? "warning"
                    : "secondary"
                }
                className="font-bold"
                onPress={() => {
                  props.setSlidedDirection(null);
                  if (props.indexStage == 2) {
                    router.push("/game/result");
                  } else {
                    props.setCurrentCardIndex(0);
                    props.setIndexStage(props.indexStage + 1);
                    setCards(sampleStageData[props.indexStage + 1].content);
                    props.setDialogContext([
                      {
                        isAnimated: true,
                        isSent: false,
                        isLoading: false,
                        imgSrc:
                          sampleStageData[props.indexStage].content[
                            props.currentCardIndex
                          ]?.imgSrc,
                        name: sampleStageData[props.indexStage].content[
                          props.currentCardIndex
                        ]?.name,
                        text: "안녕하세요! 저는 누구누구 입니다.",
                      },
                    ]);
                  }
                }}
              >
                {props.indexStage == 2
                  ? "나의 법안 확인하러 가기"
                  : "다음 스테이지로 진행하기"}
              </Button>
            </div>
          </motion.div>
        ) : (
          cards?.map((e, index) => {
            var canDrag = index === 0;
            return (
              <motion.li
                // layout
                key={e.name}
                style={{
                  ...cardStyle,
                  backgroundColor: e.color,
                  cursor: canDrag ? "grab" : "auto",
                  rotateY: canDrag ? rotateY : 0,
                  width: true ? width : cardSize.width,
                  height: true ? height : cardSize.height,
                }}
                className="tranform-gpu shadow-lg shadow-gray-500"
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: cards.length - index,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  },
                }}
                drag={canDrag ? "x" : false}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                onDrag={(event, info) => {
                  if (info.offset.x > 175) {
                    props.setisPointRight(true);
                  } else {
                    props.setisPointRight(false);
                  }
                  if (info.offset.x < -175) {
                    props.setisPointLeft(true);
                  } else {
                    props.setisPointLeft(false);
                  }
                }}
                onDragEnd={(e, i) => {
                  if (i.offset.x > 200) {
                    props.setNumAccepted(props.numAccepted + 1);
                    props.setisPointRight(false);
                    removeFirst(index);
                    const randNum = rand(1, 9);
                    props.setRandomNumber(randNum);
                    props.setSlidedDirection("right");
                    props.setSupporter(props.supporter + randNum);
                    if (props.data.length > props.currentCardIndex) {
                      props.setCurrentCardIndex(props.currentCardIndex + 1);
                    }
                  } else {
                  }

                  if (i.offset.x < -200) {
                    props.setNumRejected(props.numRejected + 1);
                    props.setisPointLeft(false);
                    removeFirst(index);
                    const randNum = rand(1, 9);
                    props.setRandomNumber(randNum);
                    props.setSlidedDirection("left");
                    props.setOpponent(props.opponent + randNum);
                    if (props.data.length > props.currentCardIndex) {
                      props.setCurrentCardIndex(props.currentCardIndex + 1);
                    }
                  } else {
                  }
                }}
              >
                {index == 0 && isAnimationCompleted && (
                  <>
                    {isFliped ? (
                      <motion.div
                        style={{
                          opacity: opacityCardContent,
                          transform: "scaleX(-1)",
                        }}
                        className="flex flex-col justify-between items-center h-full w-full mx-auto transform-gpu p-6 space-y-2"
                      >
                        <div className="h-fit max-h-[80%] flex flex-col space-y-2 w-full">
                          <div className="flex flex-col w-full h-fit items-start justify-center">
                            <div className="flex flex-row space-x-2 items-center">
                              <Image
                                src={e.imgSrc}
                                alt="a"
                                height={35}
                                width={35}
                              ></Image>
                              <p className="font-bold text-black">{e.name}</p>
                            </div>
                          </div>
                          <Divider className="bg-black/75"></Divider>
                          <p className="font-md text-black h-fit overflow-y-scroll break-all text-start">
                            <TypeAnimation
                              sequence={[e.detail]}
                              wrapper="span"
                              speed={25}
                              repeat={1}
                              cursor={false}
                            />
                          </p>
                        </div>
                        <div className="flex flex-row justify-between items-center space-x-2">
                          <Button
                            className="w-full"
                            variant={"light"}
                            color={
                              props.indexStage == 0
                                ? "primary"
                                : props.indexStage == 1
                                ? "warning"
                                : "secondary"
                            }
                            onPress={handlerCardFlip}
                          >
                            이전으로 돌아가기
                          </Button>
                          <Button
                            className="w-full"
                            variant={"flat"}
                            color={
                              props.indexStage == 0
                                ? "primary"
                                : props.indexStage == 1
                                ? "warning"
                                : "secondary"
                            }
                            onPress={() => {
                              props.setIsModalVisible(!props.isModalVisible);
                            }}
                          >
                            챗봇과 대화하기
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        style={{ opacity: opacityCardContent }}
                        className="flex flex-col justify-between items-center h-full p-6"
                      >
                        <div className="flex flex-col h-fit items-center space-y-1 w-full">
                          <Image
                            src={e.imgSrc}
                            alt="a"
                            height={100}
                            width={100}
                          ></Image>
                          <p className="text-black text-pretty text-center break-keep font-bold">
                            {e.name}
                          </p>
                        </div>
                        <p className="text-black text-pretty text-center break-keep line-clamp-3 italic">
                          {e.previewText}
                        </p>
                        <div className="flex flex-row justify-between items-center space-x-2">
                          <Button
                            className="w-full"
                            variant={"light"}
                            color={
                              props.indexStage == 0
                                ? "primary"
                                : props.indexStage == 1
                                ? "warning"
                                : "secondary"
                            }
                            onPress={handlerCardFlip}
                          >
                            자세히 살펴보기
                          </Button>
                          <Button
                            className="w-full"
                            variant={"flat"}
                            color={
                              props.indexStage == 0
                                ? "primary"
                                : props.indexStage == 1
                                ? "warning"
                                : "secondary"
                            }
                            onPress={() => {
                              props.setIsModalVisible(!props.isModalVisible);
                            }}
                          >
                            챗봇과 대화하기
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.li>
            );
          })
        )}
      </ul>
    </div>
  );
}
