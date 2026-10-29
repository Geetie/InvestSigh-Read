import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from "react";

/**
 * 给 React Bits 的 JSX 组件补一层 props 声明。
 * 不写在 .jsx 里，是为了让 vendor 文件保持与上游逐字节可比。
 */

export interface MagicBentoItem {
  id?: string | number;
  label?: ReactNode;
  title?: string;
  description?: string;
  icon?: ReactNode;
  image?: string;
  /** 内置插画键名，或直接给一个节点 */
  visual?: ReactNode | string;
  /** 整块替换卡片内部（光、边框、点击涟漪仍然保留） */
  content?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: ReactMouseEvent) => void;
  colSpan?: number;
  rowSpan?: number;
}

export interface MagicBentoProps {
  items?: MagicBentoItem[];
  columns?: number;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  theme?: "dark" | "light";
  glowColor?: string;
  textAutoHide?: boolean;
  enableBorderGlow?: boolean;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  enableStars?: boolean;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  intro?: boolean;
  disableAnimations?: boolean;
  onItemClick?: (item: MagicBentoItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

declare const MagicBento: (props: MagicBentoProps) => ReactNode;
export default MagicBento;
