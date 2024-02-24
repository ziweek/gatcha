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

export const mapFilterOptions = [
  {
    name: "입양 유형",
    type: "",
    buttonType: "",
    items: ["전체", "전문입양", "유기견", "가정분양"],
  },
  {
    name: "견종",
    type: "",
    buttonType: "",
    items: [
      "전체",
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
  {
    name: "분양가",
    type: "slider",
    buttonType: "",
    items: [0, 50, 100, 150, 200, 200],
  },
  {
    name: "성별",
    type: "",
    buttonType: "",
    items: ["전체", "남성", "여성"],
  },
  {
    name: "나이",
    type: "slider",
    buttonType: "",
    items: [0, 3, 6, 9, 12, 12],
  },
  {
    name: "필터 모두 해제하기",
    type: "quit",
    buttonType: "light",
    items: [],
  },
];

export const templateForSelectedFilterOptions = {
  "입양 유형": null,
  견종: null,
  분양가: null,
  성병: null,
  나이: null,
};
