import axios from 'axios';

export default async function SongList(token, setErrorCode) {
  const myPromise = new Promise(
    async function (resolve) {
      try {
        const response = await axios.post([import.meta.env.VITE_API_SERVER] + [import.meta.env.VITE_API_SONG_LIST], { token })
        resolve(response);
      }
      catch (error) { console.error(error.response.data.error); setErrorCode(error.response.status); resolve("Connection Failed"); }
    });
  return myPromise;
};
