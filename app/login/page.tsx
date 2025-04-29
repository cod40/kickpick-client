"use client";

import Card from "../components/ui/Card";
import PageLayout from "../components/ui/PageLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // TODO: 이메일/비밀번호 validation

    try {
      // TODO: API 연동
      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) throw new Error("로그인에 실패했습니다");

      // 임시로 쿠키 설정 (나중에 API 응답으로 대체)
      router.push("/home");
      // document.cookie = "token=temporary-token; path=/";
      // router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다");
    }
  };

  return (
    <PageLayout>
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
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
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
