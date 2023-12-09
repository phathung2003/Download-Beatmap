import axios from 'axios';

export default async function DownloadStatus(id) {
  const myPromise = new Promise(
    async function (resolve) {
      try {
        const response = await instance.get([import.meta.env.VITE_API_SERVER] + [import.meta.env.VITE_API_SONG_DOWNLOAD] + id, {

        })
        console.log(response.data)
        resolve(response.data);
      }
      catch (error) { console.log(`Tải thất bại ID: ${id}`); resolve(false) }
    });

  return myPromise;
};

// Cấu hình headers cho yêu cầu Axios
const config = { headers: { 'Content-Type': 'application/octet-stream' } };

// Cấu hình Axios instance
const instance = axios.create({
  // responseType: 'arraybuffer' // hoặc 'buffer' nếu bạn đang sử dụng Node.js,
  responseType: 'blob', // Chỉ định kiểu dữ liệu phản hồi là blob (file)
});
