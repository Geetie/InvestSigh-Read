import type { CSSProperties, ReactNode } from "react";

export interface MagnetProps {
  children?: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  maxOffset?: number;
  exclusive?: boolean;
  axis?: "x" | "y" | "both";
  tilt?: number;
  scale?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  onActiveChange?: (active: boolean) => void;
  wrapperClassName?: string;
  innerClassName?: string;
  style?: CSSProperties;
}

declare const Magnet: (props: MagnetProps) => ReactNode;
export default Magnet;
