// CalendarWithMultiDateSelector.tsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import for default styles; can be overridden by Tailwind

const CalendarWithMultiDateSelector: React.FC = () => {
  const [date, setDate] = useState<Date | Date[]>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [leaveNature, setLeaveNature] = useState<string>("");

  const handleDateClick = (value: Date) => {
    const isDateSelected = selectedDates.some(
      (date) => date.toDateString() === value.toDateString()
    );

    if (isDateSelected) {
      setSelectedDates((prevDates) =>
        prevDates.filter((date) => date.toDateString() !== value.toDateString())
      );
    } else {
      setSelectedDates((prevDates) => [...prevDates, value]);
    }
  };
  const handleClear = () => {
    setSelectedDates([]);
    setLeaveNature("");
  };

  const calculateDays = () => {
    const uniqueDates = new Set(
      selectedDates.map((date) => date.toDateString())
    );
    return uniqueDates.size;
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date.toDateString() === today.toDateString()) {
      return "hover:none"; // Dark gray for today's date
    }

    if (
      selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      )
    ) {
      return "bg-HRMSRed text-white"; // Blue for selected dates
    }

    return "";
  };

  return (
    <div className=" mt-4 ">
      <h2 className="text-xl font-bold mb-4">Select Dates</h2>
      <div className="border rounded-lg shadow-lg p-4">
        <Calendar
          value={date}
          onClickDay={handleDateClick}
          tileClassName={tileClassName}
        />
      </div>
      <div className=" flex flex-row space-x-20 gap-4 mt-3">
        <p className="text-lg font-semibold">
          Number of Days Selected: {calculateDays()}
          
        </p>
        <button
          type="button"
          className=" bg-HRMSRed text-HRMSBeige text-sm p-2 rounded-md hover:bg-HRMSBlack hover:text-HRMSBeige"
          onClick={handleClear}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default CalendarWithMultiDateSelector;
