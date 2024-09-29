import { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="w-64 absolute z-10 p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-full">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
