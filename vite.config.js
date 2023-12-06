import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

export default defineConfig({
  plugins: [react()],
  define:{
    //Env variable from .env file
    'process.env.VITE_API_DOWNLOAD_API': JSON.stringify(process.env.VITE_API_DOWNLOAD_API),
    'process.env.VITE_API_SERVER': JSON.stringify(process.env.VITE_API_SERVER),
    'process.env.VITE_API_OAUTH': JSON.stringify(process.env.VITE_API_OAUTH),
    'process.env.VITE_API_SONG_LIST': JSON.stringify(process.env.VITE_API_SONG_LIST),
  }
})
