import { useEffect } from "react";

// Loader.tsx
interface LoaderProps {
  loader_text: string;
  width?: number;
  height?: number;
}

export const Loader = ({ loader_text, width = 392, height = 392 }: LoaderProps) => {

  useEffect(() => {
  }, [width, height])
  return (
    <div
      className="loader"
      style={width && height ? { width: `${width}px !important`, height: `${height}px !important` } : undefined}
    >
      <div className="inner-loader">{loader_text}</div>
    </div>
  )
};
