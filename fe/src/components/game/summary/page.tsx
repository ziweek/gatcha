"use client";

import {
  Card,
  CardBody,
  Divider,
  Button,
  Modal,
  Progress,
  ModalContent,
  Spinner,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LottieWalkingBox,
  LottieVotingBox,
  LottieCongratulations,
} from "@/components/common/lotties";
import { TypeAnimation } from "react-type-animation";

export default function GameResult() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [value, setValue] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + 10);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (value >= 100) {
      setIsModalVisible(false);
    }
  }, [value]);

  return (
    <>
      {!isModalVisible && (
        <section className="flex h-screen py-8 w-full flex-col items-center justify-between z-0 px-6">
          <div
            className="flex flex-col max-w-xl h-full"
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr 1fr auto",
              gap: "20px",
            }}
          >
            <p className="select-none text-xl font-bold text-start w-full">
              GPT가 평가하는 나의 입법안
            </p>
            <Card className="w-full h-ful" shadow={"none"}>
              <CardBody className="space-y-2 h-full">
                <div className="w-full h-full flex items-center justify-center">
                  <Carousel
                    className="h-fit w-full"
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    selectedItem={index}
                    onChange={(index, item) => {
                      setIndex(index);
                    }}
                  >
                    {[
                      {
                        content: (
                          <>
                            <motion.div
                              animate={{ opacity: [0, 1], scale: [0, 1] }}
                              transition={{ delay: 8.5 }}
                              className="space-y-1 flex flex-col justify-center items-center h-full"
                            >
                              <LottieCongratulations
                                play={true}
                                loop={true}
                                width={"250px"}
                              ></LottieCongratulations>
                            </motion.div>
                          </>
                        ),
                      },
                      {
                        content: (
                          <p className="text-justify text-pretty">
                            industry. Lorem Ipsum has been the industrys
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essen
                          </p>
                        ),
                      },
                      {
                        content: (
                          <p className="text-justify text-pretty">
                            industry. Lorem Ipsum has been the industrys
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essen
                          </p>
                        ),
                      },
                      {
                        content: (
                          <p className="text-justify text-pretty">
                            industry. Lorem Ipsum has been the industrys
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essen
                          </p>
                        ),
                      },
                      {
                        content: (
                          <p className="text-justify text-pretty">
                            industry. Lorem Ipsum has been the industrys
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essen
                          </p>
                        ),
                      },
                    ].map((e, i) => (
                      <div
                        key={i}
                        className="w-full h-full px-2 flex flex-col items-center"
                      >
                        {e.content}
                      </div>
                    ))}
                  </Carousel>
                </div>
              </CardBody>
            </Card>
            <Card className="flex flex-col w-full h-full bg-transparent shadow-none border-0 justify-center items-center">
              <CardHeader>
                <p className="text-lg font-bold">내가 만든 법안의 분석결과</p>
              </CardHeader>
              <CardBody className="space-y-2 h-full w-full flex flex-col">
                <Carousel
                  showArrows={false}
                  showStatus={false}
                  selectedItem={index}
                  showIndicators={false}
                  showThumbs={false}
                  dynamicHeight={true}
                  onChange={(index, item) => {
                    setIndex(index);
                  }}
                  className="flex flex-col overflow-clip rounded-lg"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
                    <div
                      key={i}
                      className="w-full h-full flex flex-col justify-start p-1"
                    >
                      <Card
                        className="w-full min-h-screen p-6 bg-blue-300 flex flex-col"
                        radius={"lg"}
                      >
                        <div className="flex flex-col h-full text-black">
                          <p className="h-full w-full text-start overflow-y-scroll font-bold">
                            <TypeAnimation
                              sequence={[
                                "2024년 01월 31일\n전체 의원수 351명\n...\n...\n찬성 217명, 반대 107명, 기권 27명\n법안이 통과되었음을 알려드립니다...!!!",
                              ]}
                              wrapper="span"
                              speed={5}
                              repeat={1}
                              cursor={false}
                              style={{ whiteSpace: "pre-line" }}
                            />
                          </p>
                        </div>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              </CardBody>
            </Card>
            <Button
              size={"lg"}
              fullWidth
              color={"primary"}
              className="font-bold min-h-fit"
              onPress={() => {
                router.push("/home");
              }}
            >
              홈으로 돌아가기
            </Button>
          </div>
        </section>
      )}
      <Modal
        isOpen={isModalVisible}
        placement={"center"}
        className="mx-8"
        backdrop={"blur"}
      >
        <ModalContent className="flex flex-col items-center p-6 h-[300px] justify-center">
          {value > 50 ? (
            <div className="h-[200px] w-[200px] mx-auto">
              <LottieVotingBox loop={true} height={"200px"}></LottieVotingBox>
            </div>
          ) : (
            <div className="h-[200px] w-[200px] mx-auto">
              <LottieWalkingBox loop={true} height={"200px"}></LottieWalkingBox>
            </div>
          )}

          <div className="flex flex-col items-center justify-center space-y-2 w-full px-4">
            {/* <Spinner></Spinner> */}
            <p className="font-bold">
              {value > 50 ? "입법안 투표 중..." : "본회의장 가는 중..."}
            </p>
            <Progress
              aria-label="Downloading..."
              size="md"
              value={value}
              color="success"
              className="max-w-md"
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
