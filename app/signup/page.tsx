"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/ui/Card";
import PageLayout from "../components/ui/PageLayout";
import Image from "next/image";
import SuccessModal from "../components/ui/SuccessModal";
import { Team } from "@/types/team";
import { register } from "@/api/auth/register";
import useSWR from "swr";

interface ValidationErrors {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  team?: string;
  team_code?: string;
  name?: string;
  role_code?: string;
}

const POSITIONS = [
  { id: 1, name: "피봇", bgColor: "bg-red-500", textColor: "text-white" },
  { id: 2, name: "아라", bgColor: "bg-blue-500", textColor: "text-white" },
  { id: 3, name: "윙", bgColor: "bg-purple-500", textColor: "text-white" },
  { id: 4, name: "고정수비", bgColor: "bg-amber-500", textColor: "text-white" },
  { id: 5, name: "키퍼", bgColor: "bg-green-500", textColor: "text-white" },
  { id: 6, name: "전능수비", bgColor: "bg-sky-500", textColor: "text-white" },
  { id: 7, name: "올라운더", bgColor: "bg-rose-500", textColor: "text-white" },
];

export default function SignupPage() {
  const router = useRouter();
  const { data: teams } = useSWR<Team[]>("api/teams");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    team: "",
    team_code: "",
    name: "",
    profileImage: "",
    positions: [] as string[],
    role_code: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.username) {
      newErrors.username = "아이디를 입력해주세요";
    } else if (formData.username.length < 4) {
      newErrors.username = "아이디는 4자 이상이어야 합니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요";
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    }

    if (!formData.team) {
      newErrors.team = "팀을 선택해주세요";
    }

    if (!formData.team_code) {
      newErrors.team_code = "팀 코드를 입력해주세요";
    }

    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData({ ...formData, profileImage: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이름의 공백 제거
    setFormData((prev) => ({
      ...prev,
      name: prev.name.trim(),
    }));

    console.log("폼 제출 시도:", formData);

    if (!validateForm()) {
      console.log("유효성 검사 실패:", errors);
      return;
    }

    try {
      const registerData = {
        login_id: formData.username,
        password: formData.password,
        name: formData.name.trim(),
        team: formData.team,
        team_code: formData.team_code,
        role_code: formData.role_code || undefined,
        profile_image: formData.profileImage || undefined,
        positions: formData.positions,
      };

      console.log("API 요청 데이터:", registerData);

      await register(registerData);
      console.log("회원가입 성공!");
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("회원가입 실패:", err);
      if (err instanceof Error) {
        console.log("에러 메시지:", err.message);
        setErrors({ team_code: err.message });
      }
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    router.push("/login");
  };

  const togglePosition = (position: string) => {
    const updatedPositions = formData.positions.includes(position)
      ? formData.positions.filter((p) => p !== position)
      : [...formData.positions, position];

    setFormData((prev) => ({
      ...prev,
      positions: updatedPositions,
    }));
  };

  return (
    <PageLayout className="mb-4">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-8">
        ⚽ KickPick
      </h1>

      <Card className="w-full p-6 space-y-6">
        <h2 className="text-black text-xl font-semibold text-center mb-4">
          회원가입
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 프로필 이미지 업로드 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="프로필 미리보기"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profileImage"
            />
            <label
              htmlFor="profileImage"
              className="cursor-pointer text-sm text-green-600 hover:text-green-700"
            >
              프로필 이미지 선택
            </label>
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="아이디 (4자 이상)"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호 (6자 이상)"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={formData.passwordConfirm}
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* 팀 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              소속팀 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div
                onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                className="w-full px-4 py-3 rounded-lg bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors cursor-pointer flex justify-between items-center"
              >
                <span className="text-white opacity-60">
                  {formData.team || "소속팀을 선택해주세요"}
                </span>
                <svg
                  className={`w-5 h-5 text-white opacity-60 transition-transform ${
                    isTeamDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isTeamDropdownOpen && teams && (
                <div className="absolute z-10 w-full mt-1 bg-black rounded-lg shadow-lg overflow-hidden">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          team: team.name,
                        });
                        setIsTeamDropdownOpen(false);
                      }}
                      className="px-4 py-3 text-white hover:bg-gray-900 cursor-pointer transition-colors"
                    >
                      <div className="font-medium">{team.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.team && (
              <p className="text-red-500 text-xs mt-1">{errors.team}</p>
            )}
          </div>

          {/* 팀 코드 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              팀 코드 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="팀 코드를 입력해주세요"
              value={formData.team_code}
              onChange={(e) =>
                setFormData({ ...formData, team_code: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            {errors.team_code && (
              <p className="text-red-500 text-xs mt-1">{errors.team_code}</p>
            )}
          </div>

          {/* 팀 관리자 인증코드 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              팀 관리자 인증코드
            </label>
            <input
              type="text"
              placeholder="팀 관리자이신 경우 인증코드를 입력해주세요"
              value={formData.role_code}
              onChange={(e) =>
                setFormData({ ...formData, role_code: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            {errors.role_code && (
              <p className="text-red-500 text-xs mt-1">{errors.role_code}</p>
            )}
          </div>

          {/* 선호 포지션 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              선호 포지션 (선택)
            </label>
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map((position) => {
                const isSelected = formData.positions.includes(position.name);
                return (
                  <button
                    key={position.id}
                    type="button"
                    onClick={() => togglePosition(position.name)}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-all duration-200
                      ${
                        isSelected
                          ? `${position.bgColor} ${
                              position.textColor
                            } ring-2 ring-offset-2 ring-${position.bgColor.replace(
                              "bg-",
                              ""
                            )}`
                          : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                      }
                    `}
                  >
                    {position.name}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            회원가입
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <a href="/login" className="hover:text-green-500 transition-colors">
            이미 계정이 있으신가요? 로그인하기
          </a>
        </div>
      </Card>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />
    </PageLayout>
  );
}
