import { Input, Textarea, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

type propsForAnimatedInputArea = {
  isAnimated: boolean;
  key?: number;
  value: string;
  label: string;
  isReadOnly?: boolean;
  onChange?: void;
  isEditable: boolean;
};

export function AnimatedInput(props: any) {
  const [text, setText] = useState<string>("");
  const [couter, setCouter] = useState(0);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (props.isAnimated) {
      const interval = setInterval(() => {
        if (props.value.length > couter) {
          setText((prev) => {
            const newText = (prev += props.value[couter]);
            return newText;
          });
          setCouter((couter) => couter + 1);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="flex flex-col justify-center items-end space-y-2">
      <Input
        isReadOnly={!isEditable}
        isRequired
        key={props.key}
        value={text}
        onChange={(e) => setText(e.target.value)}
        label={props.label}
        size={"lg"}
        variant={"underlined"}
      ></Input>
      <div className="flex flex-row space-x-1 items-center justify-end">
        <Button
          className="top-0 right-0 z-10"
          size={"sm"}
          variant={"light"}
          color={isEditable ? "success" : "warning"}
          onPress={() => {
            setIsEditable(!isEditable);
          }}
        >
          {isEditable ? "수정완료" : "수정하기"}
        </Button>
        <Button
          className="top-0 right-0 z-10"
          size={"sm"}
          variant={"light"}
          color={"danger"}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}

export function AnimatedTextArea(props: any) {
  const [text, setText] = useState<string>("");
  const [couter, setCouter] = useState(0);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (props.isAnimated) {
      const interval = setInterval(() => {
        if (props.value.length > couter) {
          setText((prev) => {
            const newText = (prev += props.value[couter]);
            return newText;
          });
          setCouter((couter) => couter + 1);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="flex flex-col justify-center items-end space-y-2">
      <Textarea
        type="text"
        key={props.key}
        value={text}
        onChange={(e) => setText(e.target.value)}
        label={props.label}
        isRequired
        variant={"faded"}
        size={"lg"}
        isReadOnly={!isEditable}
        classNames={{ input: "leading-loose" }}
      ></Textarea>
      <div className="flex flex-row space-x-1 items-center justify-end">
        <Button
          className="top-0 right-0 z-10"
          size={"sm"}
          variant={"light"}
          color={isEditable ? "success" : "warning"}
          onPress={() => {
            setIsEditable(!isEditable);
          }}
        >
          {isEditable ? "수정완료" : "수정하기"}
        </Button>
        <Button
          className="top-0 right-0 z-10"
          size={"sm"}
          variant={"light"}
          color={"danger"}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
