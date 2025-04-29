"use client";

import Modal from "./ui/Modal";

interface GameHistory {
  date: string;
  time: string;
  result: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: GameHistory[];
}

export default function HistoryModal({
  isOpen,
  onClose,
  history,
}: HistoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold text-green-700">전체 참여 기록</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-100">
          {history.map((game, index) => (
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
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <button
          onClick={onClose}
          className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
