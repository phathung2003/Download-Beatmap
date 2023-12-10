import { useEffect, useState, useMemo } from 'react'
import { useTimeModel } from 'react-compound-timer';
import '../Resources/CSS/Loading.css'
import Countdown from 'react-countdown';

//Process
import timeFormat from '../Process/Clock/TimeFormat'
import stopwatchSetting from '../Process/Clock/stopwatchSetting'
import currentPoint from '../Process/Download/currentPoint';
import downloadManager from '../Process/Download/DownloadManager';
import { deleteBeatmapStorage } from '../Process/LocalStorage/BeatmapStorage';

//Components
import BeatmapList from '../Component/BeatmapList';
import Token from './GET/Token';

const timeOut = 2000;

export default function SongList(data) {

  const [list, setList] = useState(data.beatmapList);
  const [total, setTotal] = useState(data.beatmapList.length)
  const [current, setCurrent] = useState(currentPoint(data.beatmapList))
  const [percentage, setPercentage] = useState(total != 0 ? (current / (total - 1) * 100).toFixed(5) : (0).toFixed(5))
  const [inProgress, setInProgress] = useState(false)
  const [estimateTime, setEstimateTime] = useState((data.beatmapList.length + 1) * 2000);
  const [overTime, setOvertime] = useState(false)
  const { value } = useTimeModel(stopwatchSetting());
  const [halt, setHalt] = useState(false);
  const [reset, setReset] = useState(true);
  const [resetData, setResetData] = useState(false);

  //Xử lý tải file (Chạy vòng lặp)
  //useEffect(() => { if (inProgress) { setTimeout(() => { Downloading() }, timeOut) } }, [current, total, list, inProgress]);
  useEffect(() => { if (inProgress) { downloadManager(halt, current, total, list, setList, setCurrent, setPercentage, setHalt, stopwatchSetting, setInProgress, reset, setReset) } }, [inProgress, current]);

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

  switch (resetData) {
    case true: deleteBeatmapStorage(); return <Token message={"cài lại dữ liệu"} />
    default: return BeatmapList(total, current, percentage, timeOut, overTime, inProgress, setInProgress, value, list, stopwatchSetting(), setResetData)
  }
}
