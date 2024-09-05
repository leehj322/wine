/** 사용법 : <Rating rating={3.5} width={120} height={24} className="cursor-default" /> */

import React from "react";

interface RatingProps {
  rating: number;
  maxRating?: number;
  width: number;
  height: number;
  onSelect?: (rating: number) => void;
  onHover?: (rating: number) => void;
  onMouseOut?: () => void;
  className?: string;
}

export default function Rating({
  rating,
  maxRating = 5,
  width,
  height,
  onSelect,
  onHover,
  onMouseOut,
  className,
}: RatingProps) {
  const starWidth = width / maxRating;
  const filledWidth = (rating / maxRating) * width;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onSelect) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newRating = Math.ceil((clickX / width) * maxRating);
      onSelect(newRating);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onHover) {
      const rect = e.currentTarget.getBoundingClientRect();
      const hoverX = e.clientX - rect.left;
      const hoverRating = Math.ceil((hoverX / width) * maxRating);
      onHover(hoverRating);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onSelect && (e.key === "Enter" || e.key === " ")) {
      onSelect(Math.ceil(rating));
    }
  };

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      aria-label="별점 평가"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseOut}
      onKeyDown={handleKeyDown}
    >
      <span
        className="inline-block bg-unselect-star bg-repeat-x"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundSize: `${starWidth}px ${height}px`,
        }}
      >
        <span
          className="inline-block bg-select-star bg-repeat-x"
          style={{
            width: `${filledWidth}px`,
            height: `${height}px`,
            backgroundSize: `${starWidth}px ${height}px`,
          }}
        />
      </span>
    </div>
  );
}
