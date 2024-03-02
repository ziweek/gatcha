import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function FilterButton(props: any) {
  const [isButtonActivated, setIsButtonActivated] = useState<boolean>(false);
  const [filterElement, setFilterElement] = useState(props.filterElement);

  return (
    <Button
      key={props.key}
      size={"sm"}
      variant={
        filterElement.value != null
          ? // numOfFilterOption == i &&
            // props.selectedOptions[numOfFilterOption] != null
            "solid"
          : "bordered"
      }
      radius={"full"}
      color={
        isButtonActivated == true
          ? // numOfFilterOption == i &&
            // props.selectedOptions[numOfFilterOption] != null
            "primary"
          : "default"
      }
      className="min-w-fit"
      onPress={() => {
        setIsButtonActivated(!isButtonActivated);
        // setIsFilterOpen(!isFilterOpen);
        // setNumOfFilterOption(
        //   numOfFilterOption == null ? i : numOfFilterOption == i ? null : i
        // );
      }}
    >
      <p
      //   className={props.selectedOptions[i] != null ? "" : ""}
      >
        {props.filterElement.name}
        {/* {props.selectedOptions[i] != null
          ? filterBoxPreset[i].items[props.selectedOptions[i]] == "전체" ||
            filterBoxPreset[i].items[props.selectedOptions[i]] == 0
            ? `${e.name} 전체`
            : `${e.items[props.selectedOptions[i]]}${
                e.name == "분양가"
                  ? props.selectedOptions[i] == e.items.length - 1
                    ? " 만원 이상"
                    : " 만원 이하"
                  : e.name == "나이"
                  ? props.selectedOptions[i] == e.items.length - 1
                    ? " 개월 이상"
                    : " 개월 이하"
                  : ""
              }`
          : e.name} */}
      </p>
    </Button>
  );
}
