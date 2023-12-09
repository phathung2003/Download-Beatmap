import { createTimeModel } from "react-compound-timer";

//Cài đặt Stopwatch (Loại frequentUpdatesStopwatch)
export default function StopwatchSetting() { return Setting; }

const Setting = createTimeModel({
  // starting from 1 hour 11 minutes 10 seconds
  //initialTime: 1 * 60 * 60 * 1000 + 11 * 60 * 1000 + 10 * 1000,
  startImmediately: false,
  initialTime: 0,
  timeToUpdate: 10,
});