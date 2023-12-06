require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

const osuBeatmapSet = process.env.OSU_BEATMAP_SET
const osuUser = process.env.OSU_USER
const osuUserID = process.env.OSU_USERID
const osuScore = process.env.OSU_SCORE
const downloadAPI = process.env.DOWNLOAD_API

//Lấy beatmap
router.post('/get-beatmap', async (req, res) => {
  const {token} = req.body;
  const url = new URL(osuBeatmapSet + "/1470072");

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

const response = await fetch(url, { 
    method: "GET",
    headers,
})

const tokenData = await response.json();
    res.json({ access_token: tokenData}); // Trả về access token
});



//Lấy dữ liệu điểm
router.get('/get-user', async (req,res) => {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyODU4NiIsImp0aSI6IjhiN2QyNmY1MmJjNWIxNTEwMmZjYjdhMDM4NzdmYmQwNDQ0NjE0YjQ1ZDM2Nzc3NjM0YzY0MzJkMTcwNTZlMzJiZDIwYmZmMDc3ZjVmNzgxIiwiaWF0IjoxNzAxNzA2MTg0LjQyMjU3NSwibmJmIjoxNzAxNzA2MTg0LjQyMjU3NywiZXhwIjoxNzAxNzkyNTg0LjQxNTU2Niwic3ViIjoiIiwic2NvcGVzIjpbInB1YmxpYyJdfQ.B5aMLsYMWTasoRBCfnoPyspPHOcmGdXP6SSVLV5lmkNiUNxh8eD8rNMDTtVQaYTHyt8asBuNF9vHpKNlEmImUBVl1Q8tZDa0qc1PI2wrGwg4hTiAFDbU_zc5k2c7I6maWHBFVdyCKSZYl5jJCOTXM-brCB-baOJwWernI7J6Xni48Ju46A-Wf9uUIQEM7JPVpwgumKPoD0ebpusgw0RhCfOIpgI57_Uj3X0OM9Myy87CcXbTdIA4Y0KhQOqf_rmKSefXZxGxqoohnQHTmKQ8wvJ250VNLMPE4FBXuf8bhgYCjZQogytby-vn2_MIPsjjpD8siduNRnj8dEfNx61HhlHymSYBwA_7CLUq9BndraUcJXdofgkrBGG3SgpsBXER9eSYGjR01M_rwn738uZBAWeZ4oBUaFaL1nULXQ1LOwVrw14pMtxhzMZAlL7LH6N-HMV_jjSlf5JbnBHfUw2GKx8hxnHNl2PHc12P2hmb5meGQeALbmULCkI6Gqvg4UJ32_zfJ6bTEpIEHB-uVZvI5Yx1wVR1QZQWUYFzclAnl7Y4mg3Kv1a7QGy3MDUXpEY8FonilHglhn07qCbm-YXPcYswpZDcqH-wnre5o5ygcnGTQwS7qqYOoLamApFlPMq8HdBDDQglENcKntINPnYrb9BLMEdDXLXaXPAIshtdnic";
  const url = new URL(osuUser + osuUserID + osuScore);

  const params = {
    "include_fails": "0",
    "mode": "osu",
    "limit": "99999",
    "offset": "1",
  };
  
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  })

  const tokenData = await response.json();
  res.json(tokenData); // Trả về access token
  // console.log(tokenData)
})


//Tải map
router.get('/download', async(req,res)=> {
  try {
    
    const url = new URL(downloadAPI + "1470072");

    const response = await fetch(url, {
      method: "GET",
      header: {'accept': 'application/octet-stream'}
    });

    if (!response.ok) {throw new Error('Error downloading file');}

    const fileBuffer = await response.buffer(); // Lấy dữ liệu tệp tin dưới dạng buffer hoặc .arrayBuffer()

    res.set({
      'Content-Disposition': 'attachment; filename="downloadedFile.ext"', // Đổi tên và định dạng file cần download
      'Content-Type': 'application/octet-stream'
    }).send(fileBuffer);
  } 
  catch (error) {res.status(500).send('Error downloading file');}
});


module.exports = router;
