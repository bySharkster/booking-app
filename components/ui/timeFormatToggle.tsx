import React, { useState } from "react";

const TimeFormatToggle: React.FC<{ onToggle: (is24Hour: boolean) => void }> = ({
  onToggle,
}) => {
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);

  const handleToggle = () => {
    setIs24HourFormat(!is24HourFormat);
    onToggle(!is24HourFormat);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div
        onClick={handleToggle}
        className={`w-16 h-8 flex items-center bg-gray-400 rounded-lg p-1 cursor-pointer ${
          is24HourFormat ? "justify-end" : "justify-start"
        }`}
      >
        <div className="bg-foreground w-6 h-6 rounded-md shadow-md transform transition-all ease-in-out">
          <span className="text-xs text-center block mt-1 text-input">
            {is24HourFormat ? "24h" : "12h"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeFormatToggle;
