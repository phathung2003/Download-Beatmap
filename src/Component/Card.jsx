import '../Resources/CSS/Card.css'

export default function Card(data) {
  return (
    <div className="flex items-center justify-center mb-5">
      <div className="max-w-screen-xl w-full flex rounded-lg shadow-lg h-80" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url(${data.cover})` }}>
        <div className="w-100 p-4 flex flex-col justify-between">
          <div>

            {/*ID*/}
            <p className="uppercase mb-4 tracking-wide text-xl font-bold text-blue-200">ID: {data.id}</p>

            {/*Map title*/}
            <p className="mb-4 text-4xl leading-tight font-bold text-white overflow-hidden card-beatmap-title">{data.title}</p>

            {/*Artist - Mapper*/}
            <span className="block mb-4 text-base leading-tight font-medium text-white overflow-hidden card-background-subTitle"> Artist: <span className="font-bold text-lg">{data.artist}</span> - Mapper: <span className="font-bold text-lg">{data.creator}</span></span>

            {/*Status*/}
            <span className="absolute b-4 block text-lg leading-tight font-medium text-white overflow-hidden">Tình Trạng:
              {
                data.status == 0 ? <span className="text-2xl font-bold text-red-500">Chưa tải</span> :
                  data.status == 1 ? <span className="text-2xl font-bold text-green-500">Đã tải</span> :
                    <span className="text-2xl font-bold text-red-500">Lỗi tải xuống</span>
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}