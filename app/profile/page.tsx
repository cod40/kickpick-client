"use client";

import Card from "../components/ui/Card";
import Image from "next/image";
import { useState } from "react";
import HistoryModal from "../components/HistoryModal";
import PositionBadge from "../components/ui/PositionBadge";
import { getPositionsByNames } from "@/constants/positions";
import { getProfile } from "@/api/user/profile";
import { GetProfileResponse } from "@/types/user";
import useSWR from "swr";
import { useAuthStore } from "@/store/auth";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/ui/PageLayout";

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
    result: "참여 완료",
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
    result: "참여 완료",
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
    result: "참여 완료",
  },
  {
    date: "2024.02.12",
    time: "19:00~21:00",
    result: "참여 완료",
  },
];

export default function ProfilePage() {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { data: profileData } = useSWR<GetProfileResponse>(
    "api/profile",
    getProfile
  );
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    // 쿠키에서 토큰 삭제
    deleteCookie("token");
    // Zustand 스토어에서 토큰 삭제
    logout();
    // 로그인 페이지로 이동
    router.push("/login");
  };

  console.log(profileData);

  return (
    <PageLayout>
      {/* 프로필 헤더 */}
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <Image
              src={
                profileData?.profile_image ||
                "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
              }
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {profileData?.name}
            </h2>
            <p className="text-gray-500">{profileData?.team}</p>
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
          {profileData?.positions &&
            getPositionsByNames(profileData.positions).map((position) => (
              <PositionBadge
                key={position.id}
                position={position}
                variant="light"
              />
            ))}
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
        <button
          onClick={() => router.push("/profile/edit")}
          className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          개인정보 수정
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
        >
          로그아웃
        </button>
      </div>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={allHistory}
      />
    </PageLayout>
  );
}
