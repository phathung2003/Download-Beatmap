import getBeatmapFile from './BeatmapFile'

//Kết nối server để thực hiện tải (Chimu.moe)
export default async function DownloadBeatmap(data) {
  const id = data.id;
  const artist = data.artist;
  const title = data.title;

  try {
    const blob = await getBeatmapFile(id);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${id} ${artist} - ${title}.osz`; // Replace 'extension' with the appropriate file extension
    link.click();
    document.body.appendChild(link);
  }
  catch { console.log(`ID Lỗi ${data.id}`) }

}



//Kết nối server để thực hiện tải (Chimu.moe) - Bản đầu
async function DownloadBeatmapv1(data) {
  const id = data.id;
  const artist = data.artist;
  const title = data.title;

  try {
    const url = [import.meta.env.VITE_API_DOWNLOAD_API] + data.id;
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${id} ${artist} - ${title}.osz`; // Replace 'extension' with the appropriate file extension
    link.click();
    document.body.appendChild(link);
  }
  catch { console.log(`ID Lỗi ${data.id}`) }
}