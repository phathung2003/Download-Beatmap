import { useEffect, useState, useMemo } from "react"
import '../Resources/CSS/Loading.css'
import getSongList from '../Process/SongList'
import App from '../App'
import Countdown from 'react-countdown';

import { createTimeModel, useTimeModel } from "react-compound-timer";


const TimeOut = 8000;

export default function SongList(token) {
  if (token == undefined) return App();
  const [list, setList] = useState(false);
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)
  const [percentage, setPercentage] = useState(total != 0 ? (current / (total-1) * 100).toFixed(5) : (0).toFixed(5))
  const [inProgress, setInProgress] = useState(false)
  const [estimateTime, setEstimateTime] = useState(0);
  const [overtime, setOvertime] = useState(false)
  const { value } = useTimeModel(frequentUpdatesStopwatch);

  //Xử lý lấy dữ liệu
  useEffect(() => async () => {
    frequentUpdatesStopwatch.stop(); //Dừng Stopwatch
    if (!list)
    {
      const response = await getSongList(token);
        if (response) {
          const uniqueSongs = response.data.filter((song, index, self) => (index === self.findIndex((s) => (s.id === song.id))));
          await setList(uniqueSongs);
          await setTotal(uniqueSongs.length)
          await setEstimateTime(uniqueSongs.length * TimeOut)
        }
    }
  }, [])
  
  //Xử lý tải file (Chạy vòng lặp)
  useEffect(() => {if (inProgress) {setTimeout(() => { Downloading() }, TimeOut)}}, [current, total, list, inProgress]);

  //Xử lý tải file (Hàm xử lý)
  const Downloading = () => {
    if (current < total) {
         
      DownloadBeatmap(list[current].id);
    
      var update = list.map(data => {
        if (data.id === list[current].id) {return { ...data, status: 1 };}
        else return data
      });
        
      // Cập nhật state với mảng mới
      setList(update);
      setCurrent(current + 1);
      setPercentage((current / (total-1) * 100).toFixed(5))
    }
    else {setInProgress(false)}
  }

  //Xử lý đếm giờ
  const countdown = useMemo(() => {
    if (inProgress) {
      return (
        <Countdown
          date={Date.now() + estimateTime}
          intervalDelay={0}
          precision={3}
          renderer={(props) => {
            if (props.total > 0) return formatTime(props.total);
            else {frequentUpdatesStopwatch.reset(); frequentUpdatesStopwatch.start(); setOvertime(true)} //Khởi động lại đồng hồ
          }}
        />
      );
    }
    else {
      frequentUpdatesStopwatch.stop(); //Dừng Stopwatch
      return formatTime(estimateTime); // Trả về null khi Countdown không được kích hoạt
    } 
  }, [inProgress, estimateTime, setOvertime]);

  //Đổi trang
  switch (list) {
    case false: return <Loading />; //Đang lấy trang
    case "Connection Failed": return <ConnectionFailed /> //Lỗi lấy dữ liệu

    default:
    return (
      <div className="relative">
        <div className="sticky top-0 z-50" style={{ backgroundColor: "#242424", color: "white" }}>
        <ul>
          <li>
            <div className="flex justify-center mb-3 max-h-48 w-100">
              <div className="max-w-screen-xl w-full flex justify-between mt-3">
                <div><p  className="text-3xl align-baseline text-white font-bold">Tổng số map: {total}</p></div>
                <div><p className="text-3xl align-baseline font-bold text-green-500">Đã thực hiện: {current}</p></div>
                {percentage != 100 ? 
                  <div><p className="text-3xl align-baseline font-bold text-red-500">Tiến trình: {percentage}%</p></div>
                  :<div><p className="text-3xl align-baseline font-bold text-green-500">Tiến trình: {percentage}%</p></div>}
              </div>
            </div>
          </li>

          <li>
            <div className="flex justify-center mb-2 max-h-48 w-100">
              <div className="max-w-screen-xl w-full flex justify-between mt-3">
                  <div>
                    <span className="text-xl font-bold">Thời gian giữa các lần tải:<span className='text-red-400'> {TimeOut} ms</span></span>
                    <p className="mt-3 text-sm font-bold text-red-500">Lưu ý: Thời gian giữa 2 lần càng ngắn thì xác xuất thất bại càng cao !</p>
                  </div>
                  <div>
                    <p></p>
                    {inProgress == false && percentage < 100 ? <button className="btn btn-danger text-xl font-bold" onClick={(e) => setInProgress(true)}>Bắt đầu quá trình tải xuống</button>:<div/>}
                  </div>
                  <div>{!overtime ? countdown : Overtime(value)}</div> 
              </div> 
            </div>
          </li>

        
          <li>
            <div className="flex justify-center mb-5">
              <div className="max-w-screen-xl w-full flex justify-between mt-3">
                  <div className="w-full h-11 bg-gray-200 rounded-full dark:bg-gray-700 pl-0">
                    <div className="h-11 bg-green-600 text-center leading-none rounded-full" style={{ width: `${percentage}%` }}><span className=" text-4xl font-bold p-1 text-red-100 ">{percentage == 100 ? "Hoàn thành" : percentage}%</span></div>
                  </div>
                </div>
              </div>
          </li>
        </ul>
      </div>
      
        <div className="pt-2">
          <ul>
            {list.map(song => (
              <li key={song.id}>
                <Card Song={song} />
              </li>))}
          </ul>
      </div>
    
    </div>
  )
  }


}


const Loading = () => {
  return(
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="lds-roller mb-4"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p className="text-center text-white">Đang lấy danh sách. Vui lòng đợi...</p>
      </div>
    </div>
  )
}

const Card = ({ Song }) => {
  
  return (
    <div className="flex items-center justify-center mb-5">
      <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url(${Song.cover})`}} className="max-w-screen-xl w-full flex rounded-lg overflow-hidden shadow-lg">
    
      <div className="max-h-48.5 w-100 p-4 flex flex-col justify-between ">
                
        <div>
            <p className="uppercase mb-4 tracking-wide text-xl font-bold text-blue-200">ID: {Song.id}</p>
            <p className="block mb-4 text-4xl leading-tight font-bold text-white overflow-hidden" style={{ maxHeight: "3.6rem", lineHeight: "1.2em", textOverflow: "ellipsis" }}>{Song.title}</p>
            <span className="block mb-4 text-base leading-tight font-medium text-white overflow-hidden" style={{ maxHeight: "3.6rem", lineHeight: "1.2em", textOverflow: "ellipsis" }}> Artist: <span className="font-bold text-lg">{Song.artist}</span> - Mapper: <span className="font-bold text-lg">{Song.creator}</span></span>
            
            <span className="block text-lg leading-tight font-medium text-white overflow-hidden">Tình Trạng: {Song.status == 0 ? <span className="text-2xl font-bold text-red-500">Chưa tải</span> : <span className="text-2xl font-bold text-green-500">Đã tải</span>}</span>
        </div>
      </div>
  </div>
</div>
  )
}


//Kết nối thất bại
const ConnectionFailed = () => {
  return (
    <div>
     <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Lỗi 404</h1>
        <p className="text-lg text-white-600 mb-8">Mất kết nối tới máy chủ. Vui lòng thử lại sau !</p>
      </div>
    </div>
  )
} 

//Kết nối server để thực hiện tải (Chimu.moe)
const DownloadBeatmap = (id) => {
    const url = [import.meta.env.VITE_API_DOWNLOAD_API] + id;
    console.log(url)
    
    // Đường dẫn tới tập tin cần tải xuống
    const link = document.createElement('a');
    link.href = url;
    link.download = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//Format thời gian
const TimeNumber = (number, type) => {
  switch (type) {
    case "MiliSecond": return number < 10 ? `00${number}` : number < 100 ? `0${number}` : `${number}`; //Miligiây thì 3 số
    default:  return number < 10 ? `0${number}` : `${number}`; //Còn lại 2 số
  }
};

//Hiện thời gian (Ước tính)
function formatTime(time) {
  return (
    <div className="text-xl">
      <p className="font-bold">Thời gian ước tính</p>

      <div style={{ whiteSpace: 'nowrap' }}>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(Math.floor(time / 3600000),"Hour")} Giờ</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(Math.floor((time % 3600000) / 60000),"Minute")} Phút</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(Math.floor((time % 60000) / 1000),"Second")} Giây</p>
        <p style={{ display: 'inline-block' }}>{TimeNumber(time % 1000, "MiliSecond")} Mili giây</p>
      </div>
    </div>
  )
}

//Hiện thời gian (Qúa giờ)
function Overtime(time) {
  return (
     <div className="text-xl">
      <p className='text-red-500 font-bold'>Quá giờ</p>
      <div style={{ whiteSpace: 'nowrap' }}>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(time.h,"Hour")} Giờ</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(time.m,"Minute")} Phút</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(time.s,"Second")} Giây</p>
        <p style={{ display: 'inline-block' }}>{TimeNumber(time.ms, "MiliSecond")} Mili giây</p>
      </div>
    </div>
  )
}
//Cài đặt Stopwatch
const frequentUpdatesStopwatch = createTimeModel({
  // starting from 1 hour 11 minutes 10 seconds
  //initialTime: 1 * 60 * 60 * 1000 + 11 * 60 * 1000 + 10 * 1000,
  startImmediately: false,
  initialTime: 0,
  timeToUpdate: 10,
});



