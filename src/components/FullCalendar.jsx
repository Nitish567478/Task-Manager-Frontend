import { useState } from "react";
import "./FullCalendar.css";

const FullCalendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();

  const getDayClass = (day) => {
    if (
      day === selectedDay &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      return "calendar-day-selected";
    }

    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
        ? "calendar-day-today"
        : "calendar-day-default"
    );
  };

  const handleDateClick = (day) => {
    setSelectedDay(day);
    const selected = new Date(year, month, day);
    onDateSelect(selected); // send selected date to parent Dashboard
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav-btn">Prev</button>
        <h2 className="calendar-month-title">{monthNames[month]} {year}</h2>
        <button onClick={nextMonth} className="calendar-nav-btn">Next</button>
      </div>

      <div className="calendar-days-header">
        {days.map(d => <div key={d} className="calendar-day-name">{d}</div>)}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, i) => <div key={i}></div>)}

        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`calendar-day ${getDayClass(day)}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FullCalendar;
