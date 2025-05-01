"use client";

import Modal from "./ui/Modal";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  isAdmin?: boolean;
}

type Tab = "vote" | "opponent" | "notice";

export default function VoteModal({
  isOpen,
  onClose,
  selectedDate,
  isAdmin = false,
}: VoteModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("vote");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!selectedDate) return null;

  const formattedDate = format(selectedDate, "M월 d일 (EEEE)", { locale: ko });

  const timeSlots = Array.from(
    { length: 18 },
    (_, i) => `${String(i + 6).padStart(2, "0")}:00`
  );

  const handleTimeSelect = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const tabs = [
    { id: "vote" as const, label: "투표" },
    { id: "opponent" as const, label: "상대팀" },
    ...(isConfirmed ? [{ id: "notice" as const, label: "공지사항" }] : []),
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold text-green-700">{formattedDate}</h2>
        </div>
        {/* Navigation */}
        <div className="flex px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 -mb-px ${
                activeTab === tab.id
                  ? "border-b-2 border-green-500 text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "vote" && (
          <div className="space-y-2">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="flex items-center border rounded-lg p-3 hover:border-green-500 transition-color"
              >
                <div className="w-[15%] font-medium text-black">{time}</div>
                <div className="w-[50%] flex-1 px-4">
                  <div className="overflow-x-auto">
                    <div className="grid grid-flow-col grid-rows-4 gap-x-5 text-sm text-gray-500 min-w-max">
                      {/* TODO: 참여자 목록 */}
                      {/* 아직 참여자가 없습니다 */}
                      {Array(30)
                        .fill("김상도")
                        .map((name, index) => (
                          <div key={index} className="truncate">
                            {name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleTimeSelect(time)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTimes.includes(time)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {selectedTimes.includes(time) ? "선택됨" : "선택"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "opponent" && (
          <div className="py-5">
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-700">
                    자체전
                  </div>
                  <div className="text-sm text-gray-500">{formattedDate}</div>
                </div>
              </div>
              <button
                onClick={() => setIsConfirmed((prev) => !prev)}
                className={`text-sm px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  isConfirmed
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-red-200"
                    : "bg-green-500 hover:bg-green-600 text-white shadow-green-200"
                } shadow-lg transform hover:scale-105 active:scale-100`}
              >
                {isConfirmed ? "취소" : "확정"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "notice" && (
          <div className="space-y-4">
            {isAdmin ? (
              <textarea
                className="w-full h-32 p-3 border rounded-lg"
                placeholder="공지사항을 입력하세요..."
              />
            ) : (
              <div className="p-4 text-center text-gray-500">
                등록된 공지사항이 없습니다
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-black"
          >
            취소
          </button>
          <button className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
            {activeTab === "vote"
              ? "투표하기"
              : activeTab === "notice" && isAdmin
              ? "공지 등록"
              : "확인"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
