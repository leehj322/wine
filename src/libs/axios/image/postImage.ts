import axiosInstance from "../axiosInstance";

interface UploadImageResponse {
  url: string;
}

export default async function postImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axiosInstance.post<UploadImageResponse>(
      "images/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.url;
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    throw error;
  }
}
