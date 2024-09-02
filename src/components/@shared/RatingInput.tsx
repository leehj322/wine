/** 사용법 : <RatingInput rating={3.5} name="rating" onChange={handleChange} width={120} height={24} /> */

import { useState } from "react";
import Rating from "@/components/@shared/Rating";

interface RatingInputProps {
  rating: number;
  name: string;
  onChange: (value: number, name: string) => void;
  width: number;
  height: number;
}

export default function RatingInput({
  rating,
  name,
  onChange,
  width,
  height,
}: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const handleSelect = (nextValue: number) => onChange(nextValue, name);
  const handleMouseOut = () => setHoverRating(null);

  return (
    <div className="inline-block cursor-pointer">
      <Rating
        rating={hoverRating ?? rating}
        onSelect={handleSelect}
        onHover={setHoverRating}
        onMouseOut={handleMouseOut}
        width={width}
        height={height}
      />
    </div>
  );
}
