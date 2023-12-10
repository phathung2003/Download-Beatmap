require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

const songAPI = process.env.SONG_SERVER_API //Server lưu trữ danh sách BeatMapSet
const osuBeatmapSet = process.env.OSU_BEATMAP_SET  //API Osu lấy dữ liệu set beatmap
const downloadAPI = process.env.DOWNLOAD_API

//Không paste được token vào URL
router.post('/list', async (req, res) => {
  const { token } = req.body;
  const tokenString = token.token;

  try {
    const beatmapSetList = await getBeatmapSetList(); //Lấy danh sách BeatMapSet lưu trữ

    // const beatmapSetList = [{
    //   id: 1796612,
    //   status: 0,
    // },
    // {
    //   id: 1470072,
    //   status: 0,
    // },
    // {
    //   id: 1034179,
    //   status: 0,
    // }]

    const beatmapSetInfo = await checkInfo(beatmapSetList, tokenString) //Lấy thông tin cho từng BeatMapSet
    res.json(beatmapSetInfo); // Trả dữ liệu về
  }
  catch (error) { ErrorStatus(error.message, res) }
});


//Nếu paste được token vào URL
router.get('/list/:IDToken', async (req, res) => {
  try {
    const beatmapSetList = await getBeatmapSetList(res); //Lấy danh sách BeatMapSet lưu trữ
    const beatmapSetInfo = await checkInfo(beatmapSetList, req.params.IDToken) //Lấy thông tin cho từng BeatMapSet
    res.json(beatmapSetInfo); // Trả dữ liệu về
  }
  catch (error) { ErrorStatus(error.message, res) }
});

module.exports = router;


//Lấy danh sách BeatmapSet lưu trữ
async function getBeatmapSetList() {
  try {
    const response = await fetch(songAPI, { method: 'GET' });

    //Đổi dữ liệu qua dạng JSON
    const beatmapSetList = await response.json();

    return beatmapSetList
  }
  catch (error) { throw new Error(error.code); }
}

//Lấy thông tin cho từng BeatmapSet
async function getBeatmapSetInfo(token, ID) {

  const url = new URL(osuBeatmapSet + ID); //URL để lấy dữ liệu
  const headers = headersData({ token });

  //Lấy dữ liệu từ server Osu
  const response = await fetch(url, {
    method: "GET",
    headers,
  })

  //Đổi dữ liệu qua dạng JSON
  const beatmapSetInfo = await response.json();

  return beatmapSetInfo;
};


//Khởi tạo file JSON lưu dữ liệu mới
async function checkInfo(beatmapSetList, token) {
  //Duyệt từng set Beatmap để lấy thông tin
  const promises = beatmapSetList.map(async (element) => {
    try {
      const data = await getBeatmapSetInfo(token, element.id); //Lấy thông tin BeatmapSet từ server Osu
      var cover = null;
      try { cover = data.covers['cover@2x']; }
      catch { cover = null }

      //Tạo JSON tạm lưu thông tin
      let newJSON = {
        id: data.id,
        title: data.title,
        artist: data.artist,
        creator: data.creator,
        // cover: data.covers['cover@2x'],
        //cover: data.covers.cover,
        cover: cover,
        status: element.status,
      };
      return newJSON;
    }
    catch (error) { console.error("Error fetching data for element:", error); return null; }
  });

  const results = await Promise.all(promises); //Đợi tất cả phản hồi
  const List = results.filter((result) => result !== null); //Lưu thành file JSON mới
  return List;
}


const headersData = ({ token }) => {
  return ({
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  })
};


function ErrorStatus(error, res) {
  switch (error) {
    case "ETIMEDOUT": res.status(404).json({ code: 404, error: 'Không kết nối được đến server để lấy set Beatmap' }); break;
    default: res.status(500).json({ code: 500, error: 'Unknowed Error' }); break;
  }
}
