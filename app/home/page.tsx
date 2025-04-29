"use client";

import Calendar from "@/components/calendar/Calendar";
import Card from "@/components/ui/Card";
import PageLayout from "@/components/ui/PageLayout";
import VoteModal from "@/components/VoteModal";
import { useState } from "react";

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleVoteClick = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    }
  };

  return (
    <PageLayout>
      <h1 className="text-center text-2xl font-bold text-green-800 mt-6 mb-2">
        ⚽ 이번주 언제 축구할까?
      </h1>
      <p className="text-blue-700 mb-6 text-center">
        원하는 날짜를 선택하고 투표해보세요!
      </p>
      <Card>
        <Calendar selected={selectedDate} onSelect={handleDateSelect} />
      </Card>
      <Card className="mt-2 text-center">
        <h2 className="text-sm font-semibold text-green-700 px-4 md:text-base">
          📅 날짜를 선택하면 아래에 투표가 나타나요!
        </h2>

        <button
          onClick={handleVoteClick}
          disabled={!selectedDate}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl mt-1 py-2 transition-colors"
        >
          {selectedDate ? "날짜 선택하고 투표하러 가기" : "날짜를 선택해주세요"}
        </button>
      </Card>

      <VoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </PageLayout>
  );
}
