import getSongList from '../../Process/SongList'

//Components
import GetToken from './Token'
import Loading from '../../Component/Loading';
import ConnectionFailed from '../../Component/ConnectionFailed'
import MapList from '../mapList'
import { useEffect, useState } from 'react';

const timeOut = 2000;

export default function MapData(token) {
  if (token == undefined) return <GetToken />

  const [errorCode, setErrorCode] = useState(false);
  const [list, setList] = useState(false);
  const [total, setTotal] = useState(0)
  const [estimateTime, setEstimateTime] = useState(0);

  //Xử lý lấy dữ liệu
  useEffect(() => async () => {
    if (!list) {
      const response = await getSongList(token, setErrorCode);
      if (response) {
        const uniqueSongs = response.data.filter((song, index, self) => (index === self.findIndex((s) => (s.id === song.id))));
        await setList(uniqueSongs);
        await setTotal(uniqueSongs.length)
        await setEstimateTime(uniqueSongs.length * timeOut)
      }
    }
  }, [])

  //Đổi trang
  switch (list) {
    case false: return Loading("dữ liệu"); //Đang lấy trang
    case "Connection Failed": return ConnectionFailed(errorCode) //Lỗi lấy dữ liệu
    default: return (<MapList dataList={list} totalBeatmap={total} ETA={estimateTime} />)
  }
}

