import { ReactNode } from "react";

interface IndicatorProps {
  label: string;
  active: boolean;
  children: ReactNode;
}

export const Indicator = ({ label, active, children }: IndicatorProps) => {
  return (
    <div className={`indicator ${active ? "active" : ""}`} title={label}>
      {children}
      <span>{label}</span>
    </div>
  );
};
