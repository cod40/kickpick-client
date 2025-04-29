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
                <div className="flex-1 px-4">
                  <div className="text-sm text-gray-500 space-y-4">
                    {/* TODO: 참여자 목록 */}
                    아직 참여자가 없습니다
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
          <div className="p-4 text-center text-gray-500">
            아직 매칭된 상대팀이 없습니다
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
