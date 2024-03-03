import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FutureDateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  // Function to handle selecting future dates
  const handleDateChange = date => {
    if (date > new Date()) {
      setStartDate(date);
    }
  };

  // Function to round time to nearest hour
  const roundToHour = date => {
    const roundedDate = new Date(date);
    roundedDate.setMinutes(0);
    roundedDate.setSeconds(0);
    return roundedDate;
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      showTimeSelect
      timeIntervals={60}
      timeFormat="HH:mm"
      dateFormat="MMMM d, yyyy h:mm aa"
      minDate={new Date()}
      minTime={roundToHour(new Date())}
      maxTime={roundToHour(new Date(new Date().setHours(23)))}
    />
  );
};

export default FutureDateTimePicker;