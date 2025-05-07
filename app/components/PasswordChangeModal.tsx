import { useState } from "react";
import Modal from "./ui/Modal";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    // TODO: 비밀번호 변경 API 호출
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full">
        <h2 className="text-xl font-bold mb-6 text-black">비밀번호 변경</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-black"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
