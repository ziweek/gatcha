function shuffle(array: number[]) {
  return array.sort(() => Math.random() - 0.5);
}

let arr = [1, 2, 3, 4, 5];

const aaa = shuffle(arr);

export const projectInfo = {
  name: "육군팀",
  title: "독독",
  description: "(가제) 팻 업계의 직방을 꿈군다",
};

export type type_MARK = {
  value: number;
  label: string;
};

export type type_SLIDER_PRESET = {
  defaultValue: number[];
  step: number | undefined;
  minValue: number | undefined;
  maxValue: number | undefined;
  marks: type_MARK[];
  unit: string;
};

export type type_FILTER_PRESET = {
  order: string[];
  content: {
    [index: string]: {
      name: string;
      value: string[] | number[] | undefined;
      type: "single" | "multiple" | "slider";
      items: string[] | number[] | type_SLIDER_PRESET[];
      default: string | number | undefined;
    };
  };
};

export const FILTER_PRESET: type_FILTER_PRESET = {
  order: ["입양 유형", "견종", "분양가", "성별", "나이"],
  content: {
    "입양 유형": {
      name: "입양 유형",
      default: undefined,
      value: undefined,
      type: "multiple",
      items: ["전문입양", "유기견", "가정분양"],
    },
    견종: {
      name: "견종",
      default: undefined,
      value: undefined,
      type: "multiple",
      items: [
        "말티즈",
        "푸들",
        "포메라니안",
        "치와와",
        "시추",
        "골든리트리버",
        "진돗개",
        "요크셔테리어",
        "비글",
        "웰시코기",
        "닥스훈트",
        "슈나우저",
        "보더콜리",
        "프렌치 불독",
        "퍼그",
        "파피용",
        "시바",
        "비숑프리제",
        "스코티쉐 테리어",
        "코카 스파니엘",
        "허스키",
      ],
    },
    분양가: {
      name: "분양가",
      default: undefined,
      value: undefined,
      type: "slider",
      items: [
        {
          defaultValue: [50, 200],
          step: 50,
          minValue: 0,
          maxValue: 250,
          unit: "만원",
          marks: [
            {
              value: 50,
              label: "50만원",
            },
            {
              value: 100,
              label: "100만원",
            },
            {
              value: 150,
              label: "150만원",
            },
            {
              value: 200,
              label: "200만원",
            },
          ],
        },
      ],
    },
    성별: {
      name: "성별",
      default: undefined,
      value: undefined,
      type: "multiple",
      items: ["남성", "여성"],
    },
    나이: {
      name: "나이",
      default: undefined,
      value: undefined,
      type: "slider",
      items: [
        {
          defaultValue: [3, 12],
          step: 3,
          minValue: 0,
          maxValue: 15,
          unit: "개월",
          marks: [
            {
              value: 3,
              label: "3개월",
            },
            {
              value: 6,
              label: "6개월",
            },
            {
              value: 9,
              label: "9개월",
            },
            {
              value: 12,
              label: "12개월",
            },
          ],
        },
      ],
    },
  },
};

export const templateForSelectedFilterOptions = {
  "입양 유형": null,
  견종: null,
  분양가: null,
  성병: null,
  나이: null,
};
