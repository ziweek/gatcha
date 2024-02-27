import { Button, Slider } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useRef } from "react";
import { mapFilterOptions, templateForSelectedFilterOptions } from "./data";
import { IconBack, IconTriangle } from "./icons";
import { useTheme } from "next-themes";

export default function Header(props: any) {
  const { systemTheme } = useTheme();
  const sliderRef = useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [numOfFilterOption, setNumOfFilterOption] = useState<number | null>(
    null
  );

  return (
    <section className="top-0 z-50 w-screen border-b-1 border-white dark:border-gray-500 fixed">
      <div className="flex flex-row w-full justify-between items-center bg-white dark:bg-black min-h-[60px] p-2">
        <div className="flex flex-row items-center justify-center w-full gap-2 px-2">
          {props.isBackButtonVisible && (
            <Button
              variant={"light"}
              isIconOnly
              onPress={() => {
                props.setIsModalVisible(false);
              }}
            >
              <IconBack
                fill={systemTheme == "dark" ? "#ffffff" : "#000000"}
                width={"20px"}
              ></IconBack>
            </Button>
          )}
          <p className="w-full text-xl font-bold select-none text-start px-2">
            {props.title}
          </p>
        </div>
      </div>
      {pathname == "/map" && (
        <>
          <div className="bg-white dark:bg-black flex flex-row justify-start items-center w-full pr-2 py-2 gap-2 overflow-x-auto scrollbar-hide">
            <div ref={sliderRef} className="pr-2"></div>
            {mapFilterOptions.map((e, i) => {
              return (
                <>
                  {e.type == "quit" ? (
                    <Button
                      key={i}
                      variant={"light"}
                      radius={"sm"}
                      color={"danger"}
                      className="min-w-fit"
                      onPress={() => {
                        if (
                          sliderRef.current != null &&
                          sliderRef.current != undefined
                        ) {
                          sliderRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "nearest",
                          });
                        }
                        props.setSelectedOptions([
                          null,
                          null,
                          null,
                          null,
                          null,
                        ]);
                        setNumOfFilterOption(null);
                      }}
                    >
                      <p
                        className={
                          props.selectedOptions[i] != null
                            ? "text-[#006FEE]"
                            : ""
                        }
                      >
                        {e.name}
                      </p>
                    </Button>
                  ) : (
                    <Button
                      // ref={i == 0 ? sliderRef : null}
                      key={i}
                      variant={"flat"}
                      radius={"sm"}
                      color={
                        numOfFilterOption == i &&
                        props.selectedOptions[numOfFilterOption] != null
                          ? "primary"
                          : "default"
                      }
                      className="min-w-fit"
                      onPress={() => {
                        setNumOfFilterOption(
                          numOfFilterOption == null
                            ? i
                            : numOfFilterOption == i
                            ? null
                            : i
                        );
                      }}
                    >
                      <p
                        className={
                          props.selectedOptions[i] != null
                            ? "text-[#006FEE]"
                            : ""
                        }
                      >
                        {props.selectedOptions[i] != null
                          ? mapFilterOptions[i].items[
                              props.selectedOptions[i]
                            ] == "전체" ||
                            mapFilterOptions[i].items[
                              props.selectedOptions[i]
                            ] == 0
                            ? `${e.name} 전체`
                            : `${e.items[props.selectedOptions[i]]}${
                                e.name == "분양가"
                                  ? props.selectedOptions[i] ==
                                    e.items.length - 1
                                    ? " 만원 이상"
                                    : " 만원 이하"
                                  : e.name == "나이"
                                  ? props.selectedOptions[i] ==
                                    e.items.length - 1
                                    ? " 개월 이상"
                                    : " 개월 이하"
                                  : ""
                              }`
                          : e.name}
                      </p>
                    </Button>
                  )}
                </>
              );
            })}
          </div>
          {numOfFilterOption != null && (
            <>
              <div className="bg-white dark:bg-black flex flex-row justify-start items-center w-full px-4 py-2 gap-2 flex-wrap">
                {mapFilterOptions[numOfFilterOption].type == "slider" ? (
                  mapFilterOptions[numOfFilterOption].name == "분양가" ? (
                    <Slider
                      className="py-4"
                      label="분양가 범위 설정"
                      step={1}
                      minValue={0}
                      maxValue={5}
                      defaultValue={[1, 3]}
                      hideValue
                      showSteps={true}
                      marks={[
                        {
                          value: 1,
                          label: "50만원",
                        },
                        {
                          value: 2,
                          label: "100만원",
                        },
                        {
                          value: 3,
                          label: "150만원",
                        },
                        {
                          value: 4,
                          label: "200만원",
                        },
                      ]}
                      onChange={(v: any) => {
                        const newSelectedOptions = props.selectedOptions.map(
                          (n: any, k: any) => {
                            if (k == numOfFilterOption) {
                              if (props.selectedOptions[k] == v) {
                                return null;
                              } else {
                                return v;
                              }
                            } else {
                              return n;
                            }
                          }
                        );
                        props.setSelectedOptions(newSelectedOptions);
                        return;
                      }}
                    ></Slider>
                  ) : (
                    <Slider
                      className="py-4"
                      label="나이 범위 설정"
                      step={1}
                      minValue={0}
                      maxValue={5}
                      defaultValue={[1, 3]}
                      hideValue
                      showSteps={true}
                      onChange={(v: any) => {
                        const newSelectedOptions = props.selectedOptions.map(
                          (n: any, k: any) => {
                            if (k == numOfFilterOption) {
                              if (props.selectedOptions[k] == v) {
                                return null;
                              } else {
                                return v;
                              }
                            } else {
                              return n;
                            }
                          }
                        );
                        props.setSelectedOptions(newSelectedOptions);
                        return;
                      }}
                      marks={[
                        {
                          value: 1,
                          label: "3개월",
                        },
                        {
                          value: 2,
                          label: "6개월",
                        },
                        {
                          value: 3,
                          label: "9개월",
                        },
                        {
                          value: 4,
                          label: "12개월",
                        },
                      ]}
                    ></Slider>
                  )
                ) : (
                  <>
                    {mapFilterOptions[numOfFilterOption].items.map((e, j) => {
                      return (
                        <Button
                          key={j}
                          variant={"flat"}
                          radius={"sm"}
                          color={
                            props.selectedOptions[numOfFilterOption] == j
                              ? "primary"
                              : "default"
                          }
                          onPress={() => {
                            const newSelectedOptions =
                              props.selectedOptions.map((n: any, k: any) => {
                                if (k == numOfFilterOption) {
                                  if (props.selectedOptions[k] == j) {
                                    return null;
                                  } else {
                                    return j;
                                  }
                                } else {
                                  return n;
                                }
                              });
                            props.setSelectedOptions(newSelectedOptions);
                          }}
                        >
                          {e}
                        </Button>
                      );
                    })}
                  </>
                )}
              </div>
              <div className="bg-white dark:bg-black flex flex-row justify-between items-center w-full px-4 py-2 gap-2 flex-wrap">
                <div className="flex flex-row w-fit gap-2">
                  {[{ text: "필터 저장" }, { text: "필터 초기화" }].map(
                    (e, j) => {
                      return (
                        <Button
                          key={j}
                          variant={"light"}
                          radius={"sm"}
                          color={j == 0 ? "primary" : "danger"}
                          onPress={() => {
                            const newSelectedOptions =
                              props.selectedOptions.map((n: any, k: any) => {
                                if (k == numOfFilterOption) {
                                  if (props.selectedOptions[k] == j) {
                                    return null;
                                  } else {
                                    return null;
                                  }
                                } else {
                                  return n;
                                }
                              });
                            props.setSelectedOptions(newSelectedOptions);
                          }}
                        >
                          {e.text}
                        </Button>
                      );
                    }
                  )}
                </div>
                <Button
                  isIconOnly
                  variant={"light"}
                  onPress={() => {
                    setNumOfFilterOption(null);
                  }}
                >
                  <IconTriangle
                    fill={systemTheme == "dark" ? "#ffffff75" : "#00000075"}
                    width={"20px"}
                  ></IconTriangle>
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
