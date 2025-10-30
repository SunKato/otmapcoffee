import React, { FC, useMemo, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedDeliveryTimeState } from "state";
import { displayDate, displayHalfAnHourTimeRange } from "utils/date";
import { matchStatusBarColor } from "utils/device";
import { Picker } from "zmp-ui";

// Opening hours: 7:00 - 21:00
const OPENING_HOUR = 7;
const CLOSING_HOUR = 21;

export const TimePicker: FC = () => {
  const [date, setDate] = useState(+new Date());
  const [time, setTime] = useRecoilState(selectedDeliveryTimeState);

  const availableDates = useMemo(() => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = today.getHours() >= CLOSING_HOUR ? 1 : 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay);
    }
    return days;
  }, []);

  const availableTimes = useMemo(() => {
    const times: Date[] = [];
    const now = new Date();
    const selectedDate = new Date(date);
    let time = new Date(selectedDate);
    
    if (now.getDate() === selectedDate.getDate() && 
        now.getMonth() === selectedDate.getMonth() &&
        now.getFullYear() === selectedDate.getFullYear()) {
      // Starting time is the current time rounded up to the nearest 30 minutes
      const minutes = Math.ceil(now.getMinutes() / 30) * 30;
      time.setHours(now.getHours());
      time.setMinutes(minutes);
      
      // If rounded time goes past closing hour, no times available for today
      if (time.getHours() >= CLOSING_HOUR) {
        return times;
      }
    } else {
      time.setHours(OPENING_HOUR);
      time.setMinutes(0);
    }
    
    time.setSeconds(0);
    time.setMilliseconds(0);
    
    const endTime = new Date(selectedDate);
    endTime.setHours(CLOSING_HOUR);
    endTime.setMinutes(0);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);
    
    while (time <= endTime) {
      times.push(new Date(time));
      time.setMinutes(time.getMinutes() + 30);
    }
    return times;
  }, [date]);

  // Prepare picker data with guaranteed non-empty arrays
  const pickerData = useMemo(() => {
    const timeOptions = availableTimes.length > 0 
      ? availableTimes.map((time) => ({
          displayName: displayHalfAnHourTimeRange(time),
          value: +time,
        }))
      : [{
          displayName: "Không có giờ khả dụng",
          value: +new Date(),
        }];

    const dateOptions = availableDates.length > 0
      ? availableDates.map((date) => ({
          displayName: displayDate(date, true),
          value: +date,
        }))
      : [{
          displayName: displayDate(new Date(), true),
          value: +new Date(),
        }];

    return [
      {
        options: timeOptions,
        name: "time",
      },
      {
        options: dateOptions,
        name: "date",
      },
    ];
  }, [availableTimes, availableDates]);

  // Compute picker value - must always have valid time and date
  const pickerValue = useMemo(() => {
    let validTime = time;
    
    // Find matching time in available times
    const matchingTime = availableTimes.find((t) => +t === time);
    
    // If current time is not in available times, use first available
    if (!matchingTime && availableTimes.length > 0) {
      validTime = +availableTimes[0];
    } else if (availableTimes.length === 0) {
      // No times available, use current date + opening hour
      const fallback = new Date(date);
      fallback.setHours(OPENING_HOUR);
      fallback.setMinutes(0);
      validTime = +fallback;
    }

    return {
      time: validTime,
      date: date,
    };
  }, [date, time, availableTimes]);

  // Update time state when it changes
  useEffect(() => {
    if (availableTimes.length > 0) {
      const matchingTime = availableTimes.find((t) => +t === time);
      if (!matchingTime) {
        setTime(+availableTimes[0]);
      }
    }
  }, [availableTimes, time, setTime]);

  return (
    <Picker
      mask
      maskClosable
      onVisibilityChange={(visbile) => matchStatusBarColor(visbile)}
      inputClass="border-none bg-transparent text-sm text-primary font-medium text-md m-0 p-0 h-auto"
      placeholder="Chọn thời gian nhận hàng"
      title="Thời gian nhận hàng"
      value={pickerValue}
      formatPickedValueDisplay={({ date, time }) => {
        if (!date?.value || !time?.value) return "Chọn thời gian";
        try {
          return `${displayHalfAnHourTimeRange(new Date(time.value))}, ${displayDate(
            new Date(date.value)
          )}`;
        } catch (e) {
          return "Chọn thời gian";
        }
      }}
      onChange={({ date, time }) => {
        if (date?.value) {
          setDate(+date.value);
        }
        if (time?.value) {
          setTime(+time.value);
        }
      }}
      data={pickerData}
    />
  );
};