import { data } from "autoprefixer";
import { setBeatmapStorage } from "../LocalStorage/BeatmapStorage";
import DownloadBeatmap from "./DownloadBeatmap";

//Xử lý tải file (Hàm xử lý)
export default async function DownloadFile(halt, current, total, list, setList, setCurrent, setPercentage, setHalt, stopwatchSetting, setInProgress, reset, setReset) {
  if (reset) {
    stopwatchSetting().reset();
    setReset(false);
  }

  if (!halt && list[current].status == 0) {
    if (current <= total) {
      setHalt(true);

      var success = true;
      // try {
      //   await DownloadBeatmap(list[current]);
      // }
      // catch { success = false; }



      var update = list.map(data => {
        if (data.id === list[current].id) {
          if (success) return { ...data, status: 1 };
          else return { ...data, status: 2 };
        }
        else return data
      });

      // Cập nhật state với mảng mới
      setList(update);
      setBeatmapStorage(update);
      setCurrent(current + 1);

      console.log(list[current].title)
      console.log(current + 1);
      setPercentage(((current + 1) / total * 100).toFixed(5))
      setHalt(false);
    }
    else { setInProgress(false); stopwatchSetting().stop(); setReset(true) }
  }
}