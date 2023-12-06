import { useEffect, useState } from 'react'
import './Resources/CSS/Loading.css'

import getToken from './Process/OAuth'
import MapList from './Page/MapList'

export default function App() {
  const [token, setToken] = useState(false);
  useEffect(() => async () => { setToken(await getToken()); }, [])

  switch (token) {
    case false: return <Loading />
    case "Connection Failed": return <ConnectionFailed />
    default: return <MapList token = {token.data.access_token}/>
  }
}

//Báo lỗi
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

//Load trang
const Loading = () => {
  return(
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="lds-roller mb-4"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p className="text-center text-white">Đang lấy token. Vui lòng đợi...</p>
      </div>
    </div>
  )
}