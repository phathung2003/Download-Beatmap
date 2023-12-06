import axios from 'axios';

export default async function SongList(token) {
  try {
    const response = await axios.post([import.meta.env.VITE_API_SERVER] + [import.meta.env.VITE_API_SONG_LIST],{token})
    return response;
  }
  catch (error) {
    console.error("Không kết nối được đến với server")
    return "Connection Failed";
  }
};
