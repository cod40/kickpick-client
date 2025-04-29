"use client";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ko } from "date-fns/locale";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function Calendar({ selected, onSelect }: CalendarProps) {
  const today = new Date();
  const modifiers = {
    past: (date: Date) => date < today,
  };

  const modifiersClassNames = {
    past: "text-gray-400",
  };

  const css = `
  .rdp-nav{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .rdp-button_previous {
    border: 1px solid light-gray;
    border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .rdp-button_next {
    border: 1px solid light-gray;
    border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .rdp-chevron {
    fill: black;
    }

  .rdp-month_caption {
    display: flex;
    justify-content: center;
      }

  .rdp-selected {
  }
  `;

  return (
    <>
      <style>{css}</style>
      <DayPicker
        className="flex justify-center w-full p-4 border border-gray-300 rounded-2xl text-black"
        mode="single"
        locale={ko}
        selected={selected}
        onSelect={onSelect}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </>
  );
}
