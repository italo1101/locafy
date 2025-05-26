'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange
}) => {
  const onAdd = useCallback(() => {
    if (value < 1000) {
      onChange(value + 1);
    }
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value > 1) {
      onChange(value - 1);
    }
  }, [value, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue)) {
      const validValue = Math.max(1, Math.min(1000, newValue));
      onChange(validValue);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10 h-10 rounded-full border border-neutral-400
            flex items-center justify-center text-neutral-600
            cursor-pointer hover:opacity-80 transition
          "
        >
          <AiOutlineMinus />
        </div>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="
            w-16 text-center text-xl font-light text-neutral-600
            border border-neutral-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-300
          "
          min={1}
          max={1000}
        />
        <div
          onClick={onAdd}
          className="
            w-10 h-10 rounded-full border border-neutral-400
            flex items-center justify-center text-neutral-600
            cursor-pointer hover:opacity-80 transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
