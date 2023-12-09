export default function TimeFormat(time, type) {
  switch (type.toLowerCase()) {
    case "countdown": return Countdown(time);
    default: return Stopwatch(time);
  }
}


//Format thời gian
const TimeNumber = (number, type) => {
  switch (type) {
    case "MiliSecond": return number < 10 ? `00${number}` : number < 100 ? `0${number}` : `${number}`; //Miligiây thì 3 số
    default: return number < 10 ? `0${number}` : `${number}`; //Còn lại 2 số
  }
};

function Countdown(time) {
  return (
    <div className="text-xl">
      <p className="font-bold">Thời gian ước tính</p>
      <div style={{ whiteSpace: 'nowrap' }}>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(Math.floor(time / 3600000), "Hour")} Giờ</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(Math.floor((time % 3600000) / 60000), "Minute")} Phút</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(Math.floor((time % 60000) / 1000), "Second")} Giây</p>
        <p style={{ display: 'inline-block' }}>{TimeNumber(time % 1000, "MiliSecond")} Mili giây</p>
      </div>
    </div>
  )
}

function Stopwatch(time) {
  return (
    <div className="text-xl">
      <p className='text-red-500 font-bold'>Tổng thời gian tải</p>
      <div style={{ whiteSpace: 'nowrap' }}>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(time.h, "Hour")} Giờ</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(time.m, "Minute")} Phút</p>
        <p style={{ display: 'inline-block', marginRight: '10px' }}>{TimeNumber(time.s, "Second")} Giây</p>
        <p style={{ display: 'inline-block' }}>{TimeNumber(time.ms, "MiliSecond")} Mili giây</p>
      </div>
    </div>
  )
}