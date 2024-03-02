import { Button, Slider, SliderStepMark } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { FILTER_PRESET } from "./data";
import { IconBack, IconTriangle } from "./icons";
import { useTheme } from "next-themes";
import { type_SLIDER_PRESET } from "./data";

type typeOfActivatedFilters = {
  [index: string]: any[];
};

export default function Header(props: any) {
  const { systemTheme } = useTheme();
  const sliderRef = useRef<any>(null);
  const [numOfFilterOption, setNumOfFilterOption] = useState<number | null>(
    null
  );

  const [activatedFilter, setActivatedFilter] = useState<string>("");
  const [isFilterDetailVisible, setIsFilterDetailVisible] =
    useState<boolean>(false);
  const [activatedFilters, setActivatedFilters] =
    useState<typeOfActivatedFilters>({});

  return (
    <section className="top-0 z-50 w-screen dark:border-gray-500 fixed">
      {/* BASIC HEADER */}
      <div className="flex flex-row w-full justify-between items-center bg-[#F2E9DA] dark:bg-black min-h-[60px] p-2">
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

      {/* FILTER BOX */}
      {props.isFilterBoxVisible && (
        <>
          {/* FILTER OPTIONS */}
          <div
            className={`bg-white dark:bg-black flex flex-row justify-start items-center px-2 py-4 gap-2 overflow-x-auto scrollbar-hide w-[95vw] mx-auto rounded-lg mt-2 border-[#FFB2A5] border-2 ${
              isFilterDetailVisible == true ? "border-b-0 rounded-b-none" : ""
            }`}
          >
            {/* <div ref={sliderRef} className="pr-2"></div> */}
            {FILTER_PRESET.order.map((e: string, i: number) => {
              return (
                <Button
                  key={i}
                  size={"sm"}
                  variant={activatedFilters[e] != null ? "solid" : "bordered"}
                  color={activatedFilters[e] != null ? "primary" : "default"}
                  className={`border-2 min-w-fit ${
                    activatedFilters[e] != null ? "border-[#FFB2A5]" : ""
                  }`}
                  radius={"full"}
                  onPress={() => {
                    setIsFilterDetailVisible(true);
                    if (e == activatedFilter) {
                      setIsFilterDetailVisible(!isFilterDetailVisible);
                    }
                    setActivatedFilter(() => e);
                  }}
                >
                  {
                    // 슬라이더 확인
                    FILTER_PRESET.content[e].type == "slider"
                      ? // 타입 검사
                        activatedFilters[e] != null ||
                        activatedFilters[e] != undefined
                        ? `${activatedFilters[e][0]}${
                            (
                              FILTER_PRESET.content[e].items[0] as {
                                unit: string | undefined;
                              }
                            ).unit
                          } 이상 ${
                            activatedFilters[e][1] ==
                            (
                              FILTER_PRESET.content[activatedFilter]
                                .items[0] as {
                                maxValue: number | undefined;
                              }
                            ).maxValue
                              ? ""
                              : activatedFilters[e][1]
                          }${
                            activatedFilters[e][1] ==
                            (
                              FILTER_PRESET.content[activatedFilter]
                                .items[0] as {
                                maxValue: number | undefined;
                              }
                            ).maxValue
                              ? ""
                              : `${
                                  (
                                    FILTER_PRESET.content[e].items[0] as {
                                      unit: string | undefined;
                                    }
                                  ).unit
                                } 미만`
                          }`
                        : e
                      : // 타입 검사
                      activatedFilters[e] != null ||
                        activatedFilters[e] != undefined
                      ? // 복수 선택일 경우
                        activatedFilters[e].length > 1
                        ? `${activatedFilters[e][0]} 외 ${
                            activatedFilters[e].length - 1
                          }개`
                        : activatedFilters[e][0]
                      : e
                  }
                </Button>
              );
            })}
            {/* <Button
              variant={"light"}
              radius={"sm"}
              size={"sm"}
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
                props.setSelectedOptions([null, null, null, null, null]);
                setNumOfFilterOption(null);
              }}
            >
              필터 모두 해제하기
            </Button> */}
          </div>

          {/* FILTER DETAIL */}
          {isFilterDetailVisible == true && (
            <>
              <div className="bg-white dark:bg-black flex flex-row justify-start items-center px-4 py-2 gap-2 flex-wrap w-[95vw] mx-auto border-[#FFB2A5] border-r-2 border-l-2">
                {FILTER_PRESET.content[activatedFilter].type == "slider" ? (
                  <Slider
                    className="py-2"
                    label={`${FILTER_PRESET.content[activatedFilter].name} 범위 설정`}
                    hideValue
                    showSteps={true}
                    defaultValue={
                      (
                        FILTER_PRESET.content[activatedFilter].items[0] as {
                          defaultValue: number | number[] | undefined;
                        }
                      ).defaultValue
                    }
                    value={activatedFilters[activatedFilter]}
                    step={
                      (
                        FILTER_PRESET.content[activatedFilter].items[0] as {
                          step: number | undefined;
                        }
                      ).step
                    }
                    minValue={
                      (
                        FILTER_PRESET.content[activatedFilter].items[0] as {
                          minValue: number | undefined;
                        }
                      ).minValue
                    }
                    maxValue={
                      (
                        FILTER_PRESET.content[activatedFilter].items[0] as {
                          maxValue: number | undefined;
                        }
                      ).maxValue
                    }
                    marks={
                      (
                        FILTER_PRESET.content[activatedFilter].items[0] as {
                          marks: SliderStepMark[] | undefined;
                        }
                      ).marks
                    }
                    onChangeEnd={(value: any) => {
                      var newActivatedFilter: any[] = value;
                      var newActivatedFilters = {
                        ...activatedFilters,
                      };
                      newActivatedFilters[activatedFilter] = newActivatedFilter;
                      console.log(newActivatedFilters);
                      setActivatedFilters(newActivatedFilters);
                    }}
                    classNames={{
                      label: "text-tiny",
                      mark: "text-tiny pt-1",
                    }}
                  ></Slider>
                ) : (
                  <>
                    {FILTER_PRESET.content[activatedFilter].items.map(
                      (item: string | number | any, j: number) => {
                        return (
                          <Button
                            className={`border-2 ${
                              activatedFilters[activatedFilter]?.includes(item)
                                ? "border-[#FFB2A5]"
                                : ""
                            }`}
                            key={j}
                            variant={
                              activatedFilters[activatedFilter]?.includes(item)
                                ? "solid"
                                : "bordered"
                            }
                            radius={"full"}
                            size={"sm"}
                            color={
                              activatedFilters[activatedFilter]?.includes(item)
                                ? "primary"
                                : "default"
                            }
                            onPress={() => {
                              //
                              var newActivatedFilter: any =
                                activatedFilters[activatedFilter] == undefined
                                  ? []
                                  : [...activatedFilters[activatedFilter]];
                              if (newActivatedFilter.includes(item)) {
                                newActivatedFilter = newActivatedFilter.filter(
                                  (value: string | number) => value !== item
                                );
                              } else {
                                if (
                                  typeof item === "string" ||
                                  typeof item === "number"
                                ) {
                                  newActivatedFilter.push(item);
                                }
                              }
                              //
                              var newActivatedFilters = {
                                ...activatedFilters,
                              };
                              newActivatedFilters[activatedFilter] =
                                newActivatedFilter.length == 0
                                  ? undefined
                                  : newActivatedFilter;
                              //
                              console.log(newActivatedFilters);
                              setActivatedFilters(newActivatedFilters);
                            }}
                          >
                            {item}
                          </Button>
                        );
                      }
                    )}
                  </>
                )}
              </div>
              {/* FILTER CONTROL */}
              <div className="bg-white dark:bg-black flex flex-row justify-between items-center px-4 py-2 gap-2 flex-wrap w-[95vw] mx-auto rounded-b-lg border-[#FFB2A5] border-2 border-t-0">
                <div className="flex flex-row w-fit gap-2">
                  {[{ text: "필터 저장" }, { text: "필터 초기화" }].map(
                    (e, j) => {
                      return (
                        <Button
                          key={j}
                          variant={"light"}
                          radius={"sm"}
                          size={"sm"}
                          color={j == 0 ? "primary" : "danger"}
                          onPress={() => {
                            setActivatedFilters({});
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
                  size={"sm"}
                  onPress={() => {
                    setNumOfFilterOption(null);
                  }}
                >
                  <IconTriangle
                    fill={systemTheme == "dark" ? "#FFB2A5" : "#FFB2A5"}
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
