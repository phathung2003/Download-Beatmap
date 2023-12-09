//Process
import timeFormat from "../Process/Clock/TimeFormat"

//Components
import Card from '../Component/Card';

export default function BeatmapList(total, current, percentage, timeOut, overTime, inProgress, setInProgress, value, list, stopwatchSetting) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-50" style={{ backgroundColor: "#242424", color: "white" }}>
        <ul>
          <li>
            <div className="flex justify-center mb-3 max-h-48 w-100">
              <div className="max-w-screen-xl w-full flex justify-between mt-3">
                <div><p className="text-3xl align-baseline text-white font-bold">Tổng số map: {total}</p></div>
                <div><p className="text-3xl align-baseline font-bold text-green-500">Đã thực hiện: {current}</p></div>
                {percentage != 100 ?
                  <div><p className="text-3xl align-baseline font-bold text-red-500">Tiến trình: {percentage}%</p></div>
                  : <div><p className="text-3xl align-baseline font-bold text-green-500">Tiến trình: {percentage}%</p></div>}
              </div>
            </div>
          </li>

          <li>
            <div className="flex justify-center mb-2 max-h-48 w-100">
              <div className="max-w-screen-xl w-full flex justify-between mt-3">
                <div>
                  {/*
                         <span className="text-xl font-bold">Thời gian giữa các lần tải:<span className='text-red-400'> {TimeOut} ms</span></span>
                      <p className="mt-3 text-sm font-bold text-red-500">Lưu ý: Thời gian giữa 2 lần càng ngắn thì xác xuất thất bại càng cao !</p>
                       */}

                </div>
                <div>
                  <p></p>
                  {inProgress == false && percentage < 100 ? <button className="btn btn-danger text-xl font-bold" onClick={(e) => { setInProgress(true); stopwatchSetting.start() }}>Bắt đầu quá trình tải xuống</button> : <div />}
                </div>
                <div>{overTime ? countdown : timeFormat(value, "Stopwatch")}</div>
              </div>
            </div>
          </li>

          <li>
            <div className="flex justify-center mb-5">
              <div className="max-w-screen-xl w-full flex justify-between mt-3">
                <div className="w-full h-11 bg-gray-200 rounded-full dark:bg-gray-700 pl-0">
                  <div className="h-11 bg-green-600 text-center leading-none rounded-full" style={{ width: `${percentage}%` }}>
                    {percentage == 100 ?
                      <span className=" text-4xl font-bold p-1 text-red-100 ">Hoàn thành</span>
                      : <div>
                        <span className=" text-4xl font-bold p-1 text-red-100 whitespace-nowrap">{percentage} %</span>
                      </div>

                    }
                  </div>
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
              {Card(song)}
            </li>))}
        </ul>
      </div>

    </div>
  )
}