import React from "react";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  markedDates: Dayjs[]; // Define the markedDates prop
}

const Calendar: React.FC<CalendarProps> = ({ markedDates }) => {
  const currentDate = dayjs();
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();

  const isMarked = (day: number) => {
    return markedDates.some(
      (date) =>
        date.year() === currentDate.year() &&
        date.month() === currentDate.month() &&
        date.date() === day
    );
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="flex justify-center items-center h-12"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const marked = isMarked(day);
      days.push(
        <div
          key={day}
          className={`flex justify-center items-center h-12 ${
            marked ? "bg-green-500 text-white" : ""
          }`}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{currentDate.format("MMMM YYYY")}</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        <div className="font-bold">Sun</div>
        <div className="font-bold">Mon</div>
        <div className="font-bold">Tue</div>
        <div className="font-bold">Wed</div>
        <div className="font-bold">Thu</div>
        <div className="font-bold">Fri</div>
        <div className="font-bold">Sat</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
