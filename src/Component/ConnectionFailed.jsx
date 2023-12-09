export default function ConnectionFailed(errorCode) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Lỗi {errorCode}</h1>
        <p className="text-lg text-white-600 mb-8">Mất kết nối tới máy chủ. Vui lòng thử lại sau !</p>
      </div>
    </div>
  )
}