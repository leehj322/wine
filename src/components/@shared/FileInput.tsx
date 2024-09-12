import { ChangeEvent, useState } from "react";
import NextImage from "next/image";

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
  const imageExtensionValidCheck = (fileName: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "bmp", "webp"];
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (!extension) return false;

    return imageExtensions.includes(extension);
  };

  // image file ratio checker
  const imageRatioValidCheck = async (currentImgFile: File) => {
    let isRatioValid = false;

    const { width, height } = await new Promise<{
      width: number;
      height: number;
    }>((resolve, reject) => {
      const image = new Image();
      const objectUrl = URL.createObjectURL(currentImgFile);
      image.src = objectUrl;

      image.onload = () => {
        const imageSize = { width: image.width, height: image.height };
        URL.revokeObjectURL(objectUrl);
        resolve(imageSize);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("image failed to load"));
      };
    });

    if (width / height <= 0.3 && width / height >= 0.28) {
      isRatioValid = true;
    }

    console.log("width: ", width);
    console.log("height: ", height);
    console.log("isRatioValid", isRatioValid);
    console.log("----------------------------");

    return isRatioValid;
  };

  // file input change handler
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

      e.target.value = "";

      if (!currentImgFile) return;

      // 이미지 파일 확장자 검사
      if (!imageExtensionValidCheck(currentImgFile.name)) {
        alert("이미지 확장자는 jpg, jpeg, png, bmp, webp만 가능합니다!");
        return;
      }

      // 이미지 파일 비율 검사
      try {
        const isRatioValid = await imageRatioValidCheck(currentImgFile);
        if (!isRatioValid) {
          alert(
            "이미지 비율이 올바르지 않습니다. (권장 가로 : 세로 = 19 : 65)\n추천 사이즈 : 가로 119px, 세로 390px",
          );
          return;
        }
      } catch (error) {
        console.error(error);
        return;
      }

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
            <NextImage
              width={32}
              height={32}
              src="/images/ic_camera.png"
              alt="카메라 아이콘"
            />
          </div>
        </label>
        {hasPreview && previewImg && (
          <div className="relative h-[120px] w-[120px] md:h-[140px] md:w-[140px]">
            <NextImage
              fill
              className="rounded-xl object-contain"
              src={previewImg}
              alt="프리뷰 이미지"
            />
            <button
              type="button"
              onClick={handleDelBtnClick}
              className="absolute right-1 top-1"
            >
              <NextImage
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
