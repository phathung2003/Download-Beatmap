require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();


const ClientID = process.env.CLIENT_ID //Client ID
const ClientSecret = process.env.CLIENT_SECRET //Client Secret


router.get('/getToken', async (req, res) => {

  const body = new URLSearchParams();
  body.append('client_id', ClientID);
  body.append('client_secret', ClientSecret);
  body.append('grant_type', 'client_credentials');
  body.append('scope', 'public');

  try {
    const response = await fetch('https://osu.ppy.sh/oauth/token', {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) { throw new Error('Lấy token thất bại'); } //lỗi lấy token

    const tokenData = await response.json();
    res.json({ access_token: tokenData.access_token }); // Trả về Access token
  }
  catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({ error: 'Failed to get Access Token' });
  }
});

//Header API
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'data': "client_id=1&client_secret=clientsecret&grant_type=client_credentials&scope=public"
}

module.exports = router;