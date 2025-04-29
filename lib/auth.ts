import { cookies } from "next/headers";

export async function getToken() {
  const token = cookies().get("token")?.value;
  return token;
}

// 나중에 API 연동 시 실제 검증 로직으로 대체
export async function verifyAuth() {
  const token = await getToken();
  return !!token;
}
