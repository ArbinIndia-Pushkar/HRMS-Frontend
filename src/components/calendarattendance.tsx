import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  isSaturday,
  isSunday,
} from "date-fns";
import axios from "axios";

type CalendarDate = Date;

// Hardcoded holidays
const holidays: Date[] = [
  new Date(2024, 7, 15), // Example: August 15, 2024
  new Date(2024, 11, 25), // Example: December 25, 2024
  new Date(2024, 8, 7), // Example: September 7, 2024
  new Date(2024, 8, 17), // Example: September 17, 2024
  new Date(2024, 9, 2), // Example: October 2, 2024
  new Date(2024, 9, 17), // Example: October 17, 2024
];

const CalendarComponent: React.FC<{ employeeId: string }> = ({ employeeId }) => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [markedDates, setMarkedDates] = useState<CalendarDate[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDateClick = (date: CalendarDate) => {
    setSelectedDate(date);
  };

  const handleMarkAttendance = () => {
    if (selectedDate) {
      if (markedDates.some((d) => isSameDay(d, selectedDate))) {
        setMarkedDates(markedDates.filter((d) => !isSameDay(d, selectedDate)));
      } else {
        setMarkedDates([...markedDates, selectedDate]);
      }
    }
  };

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prevMonth) =>
      direction === "prev" ? subMonths(prevMonth, 1) : addMonths(prevMonth, 1)
    );
  };

  const API_URL = `https://localhost:7289/api/Attendance/${employeeId}/attendance`;

  const getAttendance = async () => {
    try {
      const response = await axios.get(API_URL);
      const attendanceData = response.data;
      const attendanceDates = Object.keys(attendanceData)
        .filter((date) => attendanceData[date])
        .map((date) => new Date(date));
      setMarkedDates(attendanceDates);
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, [employeeId]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex justify-center mb-2">
          <button
            onClick={() => handleMonthChange("prev")}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l"
          >
            &#9664;
          </button>
          <button
            onClick={() => handleMonthChange("next")}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r"
          >
            &#9654;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4 text-center font-semibold text-gray-600">
        <div className="text-gray-600">Sun</div>
        <div className="text-gray-600">Mon</div>
        <div className="text-gray-600">Tue</div>
        <div className="text-gray-600">Wed</div>
        <div className="text-gray-600">Thu</div>
        <div className="text-gray-600">Fri</div>
        <div className="text-gray-600">Sat</div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Empty cells before the first day of the month */}
        {Array.from({ length: startDay.getDay() }, (_, index) => (
          <div key={`empty-start-${index}`} className="p-3 text-center"></div>
        ))}

        {days.map((day) => (
          <div
            key={day.toString()}
            className={`p-3 cursor-pointer rounded-lg text-center ${
              markedDates.some((d) => isSameDay(d, day))
                ? "bg-green-500 text-white"
                : "bg-white"
            } ${isToday(day) ? "border-2 border-blue-500" : ""} ${
              isSaturday(day) || isSunday(day)
                ? "text-gray-400 bg-gray-100"
                : ""
            } ${
              holidays.some((holiday) => isSameDay(day, holiday))
                ? "bg-red-100"
                : ""
            } hover:bg-gray-200`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, "d")}
          </div>
        ))}

        {/* Empty cells after the last day of the month */}
        {Array.from({ length: 6 - endDay.getDay() }, (_, index) => (
          <div key={`empty-end-${index}`} className="p-3 text-center"></div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleMarkAttendance}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={!selectedDate}
        >
          Mark Attendance
        </button>
        {selectedDate && (
          <p className="mt-2 text-sm text-gray-700">
            Selected Date: {format(selectedDate, "MMMM d, yyyy")}
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
