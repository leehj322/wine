import React, {
  ReactNode,
  useState,
  useEffect,
  TouchEvent,
  MouseEvent,
} from "react";
import Image from "next/image";

interface CarouselProps {
  children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesLength = React.Children.count(children);

  const [touchLocationX, setTouchLocationX] = useState(0);

  const changeSlideRight = () => {
    if (currentSlide === slidesLength - 1) {
      setCurrentSlide(0);
      return;
    }

    setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  const changeSlideLeft = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slidesLength - 1);
      return;
    }

    setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlideRight();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleRightBtnClick = (e: MouseEvent) => {
    e.preventDefault();
    changeSlideRight();
  };

  const handleLeftBtnClick = (e: MouseEvent) => {
    e.preventDefault();
    changeSlideLeft();
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchLocationX(e.changedTouches[0].pageX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const distanceX = touchLocationX - e.changedTouches[0].pageX;

    if (distanceX >= 80) {
      changeSlideRight();
    } else if (distanceX <= -80) {
      changeSlideLeft();
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex h-full transition-transform duration-1000 ease-out [&>*]:flex [&>*]:h-full [&>*]:w-full [&>*]:flex-shrink-0 [&>*]:items-center [&>*]:justify-center"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>
      <button
        type="button"
        className="absolute bottom-0 left-0 top-0"
        onClick={handleLeftBtnClick}
        aria-label="slide-left-button"
      >
        <Image
          className="rotate-180"
          width={18}
          height={18}
          src="/images/ic_x_scroll_right.svg"
          alt="왼쪽 버튼"
        />
      </button>
      <button
        type="button"
        className="absolute bottom-0 right-0 top-0"
        onClick={handleRightBtnClick}
        aria-label="slide-right-button"
      >
        <Image
          width={18}
          height={18}
          src="/images/ic_x_scroll_right.svg"
          alt="왼쪽 버튼"
        />
      </button>
      <div className="absolute bottom-0 left-[50%] flex translate-x-[-50%] gap-2">
        {Array.from({ length: 3 }, (_, i) => i).map((idx) => (
          <button
            key={idx}
            type="button"
            className="h-[10px] w-[50px] rounded-full transition-colors duration-300"
            style={{
              backgroundColor: currentSlide === idx ? "#cfdbea" : "#ffffff",
            }}
            aria-label="slide-indicator-button"
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
