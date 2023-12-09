import axios from 'axios';
import { useEffect, useState } from 'react';

export default function YourComponent(){
  const [token, setToken] = useState(false);
  
  useEffect(() => async function fetchData(){
    var response = await axios.get('http://localhost:3000/OAuth/get-token')
    if(response){setToken(response.data.access_token)}
  },[])
  
  useEffect(() => { if (token) { getBeatmap(token) } }, [])
  
  return (<p>Hello</p>);
};

//Testing Site
async function getBeatmap(token){
  console.log(token)
  var beatmap = await axios.post('http://localhost:3000/get-user',{token})
  console.log(beatmap)
}