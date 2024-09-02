import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  customDimStyle?: string;
}

/**
 * 공통 Modal 컴포넌트
 * @param isOpen 모달이 열린 상태 (true), 닫힌 상태 (false)를 가지는 boolean state
 * @param onClose 모달의 닫는 기능을 실행하는 함수
 * @param customDimStyle dim 스타일을 커스텀 하는 tailwind css classname / 기본값 : bg-light-black(#101318), opacity: 30%
 */
export default function Modal({
  children,
  isOpen,
  onClose,
  customDimStyle = "",
}: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: EventListener = (e) => {
    if (!isOpen) return;

    // modalContent가 등록되었고 현재 클릭한 target이 modal 혹은 modal 내부의 element가 아닌 경우
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // 내부에서 이벤트 핸들러를 등록 해서 모달 외부 클릭 시 모달 닫히게 설정
  // mousedown이 아니라 click으로 하는 경우 modal open button의 onClick과 겹쳐서 열리자마자 닫힘 (안열린것 처럼 보이게 됨)
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-0">
          <div
            className={`absolute h-full w-full bg-light-black opacity-30 ${customDimStyle}`}
          />
          <div
            ref={modalContentRef}
            className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
