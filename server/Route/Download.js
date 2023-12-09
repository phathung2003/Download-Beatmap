require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

const downloadAPI = process.env.DOWNLOAD_API

//Lấy trạng thái đường link
router.get('/data/:ID', async (req, res) => {
  const url = downloadAPI + req.params.ID;
  try {
    const response = await fetch(url);
    const buffer = await response.buffer(); // Sử dụng response.buffer() thay vì response.blob()
    res.set({ 'Content-Type': 'application/octet-stream', });
    res.send(buffer); // Gửi buffer về cho client (ứng dụng React)
  }
  catch (error) { console.error(`Error downloading beatmap with ID: ${req.params.ID}`, error); res.status(500).send('Error downloading beatmap'); }
})

module.exports = router;
