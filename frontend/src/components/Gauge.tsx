interface GaugeProps {
  title: string;
  value: number;
  min: number;
  max: number;
  unit: string;
}

export const Gauge = ({ title, value, min, max, unit }: GaugeProps) => {
  const percentage = (value - min) / (max - min);
  const angle = -90 + percentage * 180;

  return (
    <div className="gauge-card">
      <div className="gauge">
        <div className="gauge-scale">
          <span>{min}</span>
          <span>{Math.round(max / 2)}</span>
          <span>{max}</span>
        </div>

        <div
          className="needle"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        <div className="gauge-value">
          <strong>{Math.round(value)}</strong>
          <span>{unit}</span>
        </div>
      </div>

      <div className="gauge-title">{title}</div>
    </div>
  );
};
