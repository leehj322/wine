// 사용법 : <RatingInput name="rating" value={...} onChange={...} />

import { useState } from "react";
import Rating from "@/components/@shared/Rating";

interface RatingInputProps {
  value: number;
  name: string;
  onChange: (value: number, name: string) => void;
}

export default function RatingInput({
  value,
  name,
  onChange,
}: RatingInputProps) {
  const [rating, setRating] = useState<number>(value);
  const handleSelect = (nextValue: number) => onChange(nextValue, name);
  const handleMouseOut = () => setRating(value);

  return (
    <Rating
      className="cursor-pointer"
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
    />
  );
}
