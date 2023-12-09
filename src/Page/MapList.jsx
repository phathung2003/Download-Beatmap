import { useEffect, useState, useMemo } from 'react'
import { useTimeModel } from 'react-compound-timer';
import '../Resources/CSS/Loading.css'
import Countdown from 'react-countdown';

//Process
import DownloadBeatmap from '../Process/DownloadBeatmap'
import timeFormat from '../Process/Clock/TimeFormat'
import stopwatchSetting from '../Process/Clock/stopwatchSetting'

//Components
import BeatmapList from '../Component/BeatmapList';
import App from './GET/Token'

const timeOut = 2000;

export default function SongList(dataList) {

  const [list, setList] = useState(dataList.dataList);
  const [total, setTotal] = useState(dataList.totalBeatmap)
  const [current, setCurrent] = useState(0)
  const [percentage, setPercentage] = useState(total != 0 ? (current / (total - 1) * 100).toFixed(5) : (0).toFixed(5))
  const [inProgress, setInProgress] = useState(false)
  const [estimateTime, setEstimateTime] = useState(dataList.ETA);
  const [overTime, setOvertime] = useState(false)
  const { value } = useTimeModel(stopwatchSetting());
  const [halt, setHalt] = useState(false);
  const [reset, setReset] = useState(true);

  //Xử lý tải file (Chạy vòng lặp)
  //useEffect(() => { if (inProgress) { setTimeout(() => { Downloading() }, timeOut) } }, [current, total, list, inProgress]);
  useEffect(() => { if (inProgress) { Downloading(halt, current, total, list, setList, setCurrent, setPercentage, setHalt, stopwatchSetting, setInProgress, reset, setReset) } }, [inProgress, current]);

  //Xử lý đếm giờ
  const countdown = useMemo(() => {
    if (inProgress) {
      return (
        <Countdown
          date={Date.now() + estimateTime}
          intervalDelay={0}
          precision={3}
          renderer={(props) => {
            if (props.total > 0) return timeFormat(props.total, "Countdown");
            else { stopwatchSetting().reset(); stopwatchSetting().start(); setOvertime(true) } //Khởi động lại đồng hồ
          }}
        />
      );
    }
    else {
      stopwatchSetting().stop(); //Dừng Stopwatch
      return timeFormat(estimateTime, "Countdown"); // Trả về null khi Countdown không được kích hoạt
    }
  }, [inProgress, estimateTime, setOvertime]);

  return BeatmapList(total, current, percentage, timeOut, overTime, inProgress, setInProgress, value, list, stopwatchSetting())
}


//Xử lý tải file (Hàm xử lý)
async function Downloading(halt, current, total, list, setList, setCurrent, setPercentage, setHalt, stopwatchSetting, setInProgress, reset, setReset) {
  if (reset) {
    stopwatchSetting().reset();
    setReset(false);
  }

  if (!halt) {
    if (current < total) {
      setHalt(true);

      await DownloadBeatmap(list[current]);


      var update = list.map(data => {
        if (data.id === list[current].id) { return { ...data, status: 1 }; }
        else return data
      });

      // Cập nhật state với mảng mới
      setList(update);
      setCurrent(current + 1);
      setPercentage(((current + 1) / total * 100).toFixed(5))
      setHalt(false);
    }
    else { setInProgress(false); stopwatchSetting().stop(); setReset(true) }
  }
}