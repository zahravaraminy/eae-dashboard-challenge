import { ReactNode } from "react";

interface InfoTileProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export const InfoTile = ({ icon, label, value }: InfoTileProps) => {
  return (
    <div className="info-tile">
      <div className="tile-icon">{icon}</div>
      <div className="tile-value">{value}</div>
      <div className="tile-label">{label}</div>
    </div>
  );
};
