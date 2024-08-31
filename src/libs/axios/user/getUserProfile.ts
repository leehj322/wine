import axiosInstance from "../axiosInstance";

// type은 이후에 로그인, 로그아웃 구현되면 거기서 import 해서 사용할 예정
interface User {
  id: number;
  image: string;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
}

/**
 * 현재 로그인한 계정의 정보를 불러오는 API 요청 함수
 */
export default async function getUserProfile(): Promise<User | null> {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    // 헤더에 토큰 등록은 인터셉터 작업 끝나면 없애기
    const res = await axiosInstance.get<User>("users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
