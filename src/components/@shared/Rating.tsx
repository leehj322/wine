// 사용법 : <Rating value={...} className={...} />

import React from "react";

const RATINGS = [1, 2, 3, 4, 5];
const SELECT_STAR = "text-light-purple-100";
const UNSELECT_STAR = "text-light-gray-300";

interface StarProps {
  selected: boolean;
  rating: number;
  onSelect: (rating: number) => void;
  onHover: (rating: number) => void;
}

function Star({ selected = false, rating, onSelect, onHover }: StarProps) {
  const className = `${selected ? SELECT_STAR : UNSELECT_STAR}`;
  const handleClick = () => onSelect?.(rating);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSelect?.(rating);
    }
  };
  const handleMouseOver = () => onHover?.(rating);
  const handleFocus = () => onHover?.(rating);

  return (
    <span
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseOver={handleMouseOver}
      onFocus={handleFocus}
      role="button"
      tabIndex={0}
    >
      ★
    </span>
  );
}

interface PartialStarProps {
  percentage: number;
}

function PartialStar({ percentage }: PartialStarProps) {
  return (
    <span className="relative">
      <span className={UNSELECT_STAR}>★</span>
      <span
        className="absolute left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        <span className={SELECT_STAR}>★</span>
      </span>
    </span>
  );
}

interface RatingProps {
  className?: string;
  value?: number;
  onSelect?: (rating: number) => void;
  onHover?: (rating: number) => void;
  onMouseOut?: () => void;
  onBlur?: () => void;
}

export default function Rating({
  className = "",
  value = 0,
  onSelect = () => {},
  onHover = () => {},
  onMouseOut = () => {},
  onBlur = () => {},
}: RatingProps) {
  const fullStars = Math.floor(value);
  const partialStarPercentage = (value - fullStars) * 100;

  return (
    <div className={className} onMouseOut={onMouseOut} onBlur={onBlur}>
      {RATINGS.map((rating) => {
        if (rating <= fullStars) {
          return (
            <Star
              key={rating}
              selected={rating <= fullStars}
              rating={rating}
              onSelect={onSelect}
              onHover={onHover}
            />
          );
        }

        if (rating === fullStars + 1 && partialStarPercentage > 0) {
          return (
            <PartialStar key={rating} percentage={partialStarPercentage} />
          );
        }

        return (
          <Star
            key={rating}
            selected={false}
            rating={rating}
            onSelect={onSelect}
            onHover={onHover}
          />
        );
      })}
    </div>
  );
}
