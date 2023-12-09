import '../Resources/CSS/Loading.css'

export default function Loading(text) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="lds-roller mb-4"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p className="text-center text-white">Đang lấy {text}. Vui lòng đợi ...</p>
      </div>
    </div>
  )
}