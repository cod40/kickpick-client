export interface Position {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
  bgColorLight: string; // profile 페이지에서 사용할 밝은 배경색
}

export const POSITIONS: Position[] = [
  {
    id: 1,
    name: "피봇",
    bgColor: "bg-red-500",
    textColor: "text-white",
    bgColorLight: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    name: "아라",
    bgColor: "bg-blue-500",
    textColor: "text-white",
    bgColorLight: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    name: "윙",
    bgColor: "bg-purple-500",
    textColor: "text-white",
    bgColorLight: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    name: "고정수비",
    bgColor: "bg-amber-500",
    textColor: "text-white",
    bgColorLight: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 5,
    name: "키퍼",
    bgColor: "bg-green-500",
    textColor: "text-white",
    bgColorLight: "bg-green-100 text-green-600",
  },
  {
    id: 6,
    name: "전능수비",
    bgColor: "bg-sky-500",
    textColor: "text-white",
    bgColorLight: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 7,
    name: "올라운더",
    bgColor: "bg-rose-500",
    textColor: "text-white",
    bgColorLight: "bg-orange-100 text-orange-600",
  },
];

// 포지션 이름으로 포지션 정보 찾기
export const getPositionByName = (name: string): Position | undefined => {
  return POSITIONS.find((position) => position.name === name);
};

// 포지션 이름 배열을 받아서 해당하는 포지션 정보 배열 반환
export const getPositionsByNames = (names: string[]): Position[] => {
  return names
    .map((name) => getPositionByName(name))
    .filter((p): p is Position => p !== undefined);
};
