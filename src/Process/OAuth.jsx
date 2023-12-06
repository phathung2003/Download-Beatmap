import axios from 'axios';

export default async function OAuth() {
  try {
    const response = await axios.get([import.meta.env.VITE_API_SERVER] + [import.meta.env.VITE_API_OAUTH])
    return response;
  }
  catch (error) {
    console.error("Không kết nối được đến với server")
    return "Connection Failed";
  }
};
