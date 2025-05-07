"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { GetProfileResponse } from "@/types/user";
import useSWR from "swr";
import { getProfile } from "@/api/user/profile";
import PositionBadge from "@/components/ui/PositionBadge";
import { POSITIONS } from "@/constants/positions";
import PasswordChangeModal from "@/components/PasswordChangeModal";
import PageLayout from "@/components/ui/PageLayout";

export default function EditProfilePage() {
  const { data: profileData } = useSWR<GetProfileResponse>(
    "api/profile",
    getProfile
  );
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    positions: [] as string[],
  });

  // 수정 모드 시작시 현재 데이터로 초기화
  const startEdit = () => {
    setEditData({
      name: profileData?.name || "",
      positions: profileData?.positions || [],
    });
    setIsEditMode(true);
  };

  const togglePosition = (positionName: string) => {
    if (!isEditMode) return;

    setEditData((prev) => ({
      ...prev,
      positions: prev.positions.includes(positionName)
        ? prev.positions.filter((p) => p !== positionName)
        : [...prev.positions, positionName],
    }));
  };

  const handleSave = () => {
    // TODO: API 호출
    setIsEditMode(false);
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">프로필 수정</h1>
        {!isEditMode && (
          <button
            onClick={startEdit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            수정
          </button>
        )}
      </div>

      {/* 프로필 이미지 섹션 */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-black">프로필 이미지</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <Image
              src={profileData?.profile_image || "/default-profile.png"}
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          {isEditMode && (
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-black">
              이미지 변경
            </button>
          )}
        </div>
      </Card>

      {/* 기본 정보 섹션 */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-black">기본 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder={profileData?.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="text-gray-800">{profileData?.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <p className="text-gray-800">{profileData?.login_id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              소속팀
            </label>
            <p className="text-gray-800">{profileData?.team}</p>
          </div>
        </div>
      </Card>

      {/* 포지션 선택 섹션 */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-black">선호 포지션</h2>
        <div className="flex flex-wrap gap-2">
          {POSITIONS.map((position) => (
            <PositionBadge
              key={position.id}
              position={position}
              variant={
                (isEditMode
                  ? editData.positions
                  : profileData?.positions || []
                ).includes(position.name)
                  ? "default"
                  : "light"
              }
              onClick={
                isEditMode ? () => togglePosition(position.name) : undefined
              }
            />
          ))}
        </div>
      </Card>

      {/* 비밀번호 변경 섹션 */}
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">비밀번호</h2>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="text-green-600 hover:text-green-700"
          >
            수정
          </button>
        </div>
      </Card>

      {/* 저장 버튼 */}
      {isEditMode && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsEditMode(false)}
            className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-black"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            저장
          </button>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </PageLayout>
  );
}
