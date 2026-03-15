import { Calendar } from "@/components/ui/calendar";

export default function RangeCalendar({ edition, dateRange, setDateRange }) {
  return (
    <>
      <Calendar
        mode="range"
        defaultMonth={edition?.start_date ? edition.start_date : Date.now()}
        selected={dateRange}
        onSelect={(range) => {
          (console.log(range), setDateRange(range));
        }}
        numberOfMonths={2}
      />
    </>
  );
}
