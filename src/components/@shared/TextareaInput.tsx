import { ChangeEvent, useState } from "react";

interface TextareaInputProps {
  placeholder?: string;
  className?: string;
}

/**
 * TextareaInput은 사용자 입력을 위한 텍스트 영역
 *
 * // (주의사항) 페이지 또는 모달에 사용할 때 width, height를 지정해준 div 태그로 감싸서 사용해주세요.
 *
 * // 사용법
 * <TextareaInput placeholder="여기에 리뷰를 작성하세요" className="mobile-size" />
 */
export default function TextareaInput({
  placeholder = "내용을 입력해 주세요",
  className = "",
}: TextareaInputProps) {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <textarea
      value={content}
      onChange={handleContentChange}
      placeholder={placeholder}
      className={`w-full rounded-[16px] border border-solid border-light-gray-300 px-[20px] py-[14px] text-md-14px-regular placeholder:text-md-14px-regular ${className}`}
    />
  );
}
