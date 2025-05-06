"use client";

import Card from "../components/ui/Card";

interface RankingUser {
  rank: number;
  name: string;
  participationCount: number;
  imageUrl: string;
}

const mockRankings: RankingUser[] = [
  {
    rank: 1,
    name: "김축구",
    participationCount: 48,
    imageUrl: "/avatars/1.png",
  },
  {
    rank: 2,
    name: "박배구",
    participationCount: 42,
    imageUrl: "/avatars/2.png",
  },
  {
    rank: 3,
    name: "이농구",
    participationCount: 36,
    imageUrl: "/avatars/3.png",
  },
  {
    rank: 4,
    name: "최탁구",
    participationCount: 30,
    imageUrl: "/avatars/4.png",
  },
  {
    rank: 5,
    name: "정배드민턴",
    participationCount: 24,
    imageUrl: "/avatars/5.png",
  },
];

export default function RankingPage() {
  return (
    <main className="w-full mx-auto py-4 space-y-4 mb-12">
      <h1 className="text-2xl font-bold text-green-800 text-center mt-6 mb-2">
        🏃 참여왕 순위
      </h1>
      <p className="text-blue-700 mb-6 text-center">
        지금까지 가장 열심히 참여한 멤버를 확인해보세요!
      </p>

      {/* 내 순위 */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-gray-600">#12</span>
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <div className="font-medium text-gray-800">나의 순위</div>
              <div className="text-sm text-gray-500">총 18회 참여</div>
            </div>
          </div>
          <div className="text-lg font-medium text-green-600">18회</div>
        </div>
      </Card>

      {/* 랭킹 목록 */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between text-sm text-gray-500 px-2">
            <span>순위</span>
            <span>참여 횟수</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {mockRankings.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium w-8 text-gray-600">
                  #{user.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="font-medium text-gray-800">{user.name}</div>
              </div>
              <div className="text-lg font-medium text-green-600">
                {user.participationCount}회
              </div>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
