import { ChangeEvent, useState } from "react";
import Image from "next/image";

interface FileInputProps {
  id: string;
  initialImage?: string | null;
  hasPreview?: boolean;
  onChangeImage: (image: File | null) => void;
}

/**
 * FileInput 컴포넌트 내부에서 preview 이미지를 띄워 주는 동작을 실행
 * @param id input과 label의 htmlFor에 들어갈 값 ex. image
 * @param onChangeImage image file이 변할때 해당 image file을 변수로 해서 실행할 함수 ex. handleChangeImage
 * @param initialImg 최초에 previewImage로 띄워줄 이미지 / 기본값 null
 * @param hasPreview preview 이미지를 띄워줄지 결정 / 기본값 true (띄워줌)
 */
export default function FileInput({
  id,
  initialImage = null,
  hasPreview = false,
  onChangeImage,
}: FileInputProps) {
  const [previewImg, setPreviewImg] = useState<string | null>(initialImage);

  // image file extension checker
  const imageExtensionCheck = (fileName: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "bmp", "webp"];
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (!extension) return false;

    return imageExtensions.includes(extension);
  };

  // file input change handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!hasPreview) return;

    // 파일 선택창을 눌렀다가 취소하는 경우에 선택된 파일을 전부 제거
    if (previewImg) {
      URL.revokeObjectURL(previewImg);
      onChangeImage(null);
      setPreviewImg(null);
    }

    // 파일을 제대로 선택한 경우
    if (e.target?.files) {
      const currentImgFile = e.target.files[0];

      if (!currentImgFile || !imageExtensionCheck(currentImgFile.name)) return;

      onChangeImage(currentImgFile);
      setPreviewImg(URL.createObjectURL(currentImgFile));
    }
  };

  // preview image del button handler
  const handleDelBtnClick = () => {
    URL.revokeObjectURL(previewImg!); // 절대 null일 수 없음
    onChangeImage(null);
    setPreviewImg(null);
  };

  return (
    <>
      <div className="flex gap-3">
        <label htmlFor={id} className="cursor-pointer">
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-xl border-[1px] border-solid border-light-gray-300 md:h-[140px] md:w-[140px] md:rounded-2xl">
            <Image
              width={32}
              height={32}
              src="/images/ic_camera.png"
              alt="카메라 아이콘"
            />
          </div>
        </label>
        {hasPreview && previewImg && (
          <div className="relative h-[120px] w-[120px] md:h-[140px] md:w-[140px]">
            <Image
              fill
              className="rounded-xl object-cover"
              src={previewImg}
              alt="프리뷰 이미지"
            />
            <button
              type="button"
              onClick={handleDelBtnClick}
              className="absolute right-1 top-1"
            >
              <Image
                width={20}
                height={20}
                src="images/icons/close.svg"
                alt="이미지 제거 버튼"
              />
            </button>
          </div>
        )}
      </div>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
