import { useEffect, useState } from 'react';

//Process
import { getBeatmapStorage } from '../../Process/LocalStorage/BeatmapStorage';

//Components
import getToken from '../../Process/OAuth'
import Loading from '../../Component/Loading';
import ConnectionFailed from '../../Component/ConnectionFailed'
import MapData from './MapData'
import MapList from '../mapList'


export default function Token(data) {
  const beatmapList = getBeatmapStorage();
  if (beatmapList != null) { return <MapList beatmapList={beatmapList} /> }

  else {
    const [token, setToken] = useState(false);
    useEffect(() => async () => { setToken(await getToken()); }, [])

    switch (token) {
      case false: return Loading(data.message);
      case "Connection Failed": return ConnectionFailed(404)
      default: return <MapData token={token.data.access_token} />
    }
  }
}