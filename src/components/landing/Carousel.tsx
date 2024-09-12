import React, { ReactNode, useState, useEffect } from "react";

interface CarouselProps {
  children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesLength = React.Children.count(children);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide === slidesLength - 1) {
        setCurrentSlide(0);
        return;
      }

      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleRightBtnClick = () => {
    if (currentSlide === slidesLength - 1) {
      setCurrentSlide(0);
      return;
    }

    setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  const handleLeftBtnClick = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slidesLength - 1);
      return;
    }

    setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-1000 ease-out [&>*]:flex [&>*]:h-full [&>*]:w-full [&>*]:flex-shrink-0 [&>*]:items-center [&>*]:justify-center"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>
      <button
        type="button"
        className="absolute bottom-0 left-0 top-0 w-[50%]"
        onClick={handleLeftBtnClick}
        aria-label="slide-left-button"
      />
      <button
        type="button"
        className="absolute bottom-0 right-0 top-0 w-[50%]"
        onClick={handleRightBtnClick}
        aria-label="slide-right-button"
      />
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
