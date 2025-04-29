"use client";

import Card from "../components/ui/Card";
import Image from "next/image";
import { useState } from "react";
import HistoryModal from "../components/HistoryModal";

const mockHistory = [
  {
    date: "2024.04.15",
    time: "19:00~21:00",
    result: "참여 완료",
  },
  {
    date: "2024.04.08",
    time: "20:00~22:00",
    result: "참여 완료",
  },
  {
    date: "2024.04.01",
    time: "18:00~20:00",
    result: "불참",
  },
];

const allHistory = [
  ...mockHistory,
  {
    date: "2024.03.25",
    time: "19:00~21:00",
    result: "참여 완료",
  },
  {
    date: "2024.03.18",
    time: "20:00~22:00",
    result: "참여 완료",
  },
  {
    date: "2024.03.11",
    time: "19:00~21:00",
    result: "불참",
  },
  {
    date: "2024.03.04",
    time: "18:00~20:00",
    result: "참여 완료",
  },
  {
    date: "2024.02.26",
    time: "19:00~21:00",
    result: "참여 완료",
  },
  {
    date: "2024.02.19",
    time: "20:00~22:00",
    result: "불참",
  },
  {
    date: "2024.02.12",
    time: "19:00~21:00",
    result: "참여 완료",
  },
];

export default function ProfilePage() {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <main className="w-full mx-auto py-4 space-y-4 mb-12">
      {/* 프로필 헤더 */}
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <Image
              src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">sangdo</h2>
            <p className="text-gray-500">fc-ayas</p>
          </div>
        </div>
      </Card>

      {/* 참여 통계 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">총 참여</p>
          <p className="text-2xl font-bold text-green-600">32회</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">이번 달 참여</p>
          <p className="text-2xl font-bold text-green-600">8회</p>
        </Card>
      </div>

      {/* 선호 포지션 */}
      <Card className="p-4">
        <h3 className="font-medium text-gray-800 mb-3">선호 포지션</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
            피봇
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            아라
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
            윙
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
            고정수비
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
            키퍼
          </span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
            전능수비
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
            올라운더
          </span>
        </div>
      </Card>

      {/* 최근 참여 기록 */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between">
          <h3 className="font-medium text-gray-800">최근 참여 기록</h3>
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            더보기
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {mockHistory.map((game, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-800">{game.date}</p>
                <p className="text-sm text-gray-500">{game.time}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  game.result === "참여 완료"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {game.result}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 버튼 그룹 */}
      <div className="space-y-3">
        <button className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
          개인정보 수정
        </button>
        <button className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
          로그아웃
        </button>
      </div>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={allHistory}
      />
    </main>
  );
}
