import { ReactNode } from "react";

interface Props {
  className?: string;
  label: string;
  children: ReactNode;
}

export default function AuthLabel({ className = "", label, children }: Props) {
  const classCombined = `flex flex-col gap-2.5${className ? ` ${className}` : ""}`;

  return (
    <label className={classCombined}>
      <p className="text-md-14px-medium text-gray-800 md:text-lg-16px-medium">
        {label}
      </p>
      {children}
    </label>
  );
}
