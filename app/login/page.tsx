"use client";

import Card from "../components/ui/Card";
import PageLayout from "../components/ui/PageLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth/login";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!id || !password) {
      setError("아이디와 비밀번호를 입력해주세요");
      return;
    }

    try {
      const response = await login({
        login_id: id,
        password: password,
      });

      // Zustand store에 토큰 저장
      setToken(response.access_token);

      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다");
    }
  };

  return (
    <PageLayout className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-8">
        ⚽ KickPick
      </h1>

      <Card className="w-full p-6 space-y-6">
        <h2 className="text-black text-xl font-semibold text-center mb-4">
          로그인
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            로그인하기
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <a href="/signup" className="hover:text-green-500 transition-colors">
            계정이 없으신가요? 회원가입하기
          </a>
        </div>
      </Card>
    </PageLayout>
  );
}
