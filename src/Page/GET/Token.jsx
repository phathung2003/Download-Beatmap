//Components
import getToken from '../../Process/OAuth'
import Loading from '../../Component/Loading';
import ConnectionFailed from '../../Component/ConnectionFailed'
import MapData from './MapData'
import { useEffect, useState } from 'react';


export default function Token() {
  const [token, setToken] = useState(false);
  useEffect(() => async () => { setToken(await getToken()); }, [])

  switch (token) {
    case false: return Loading("token");
    case "Connection Failed": return ConnectionFailed(404)
    default: return <MapData token={token.data.access_token} />
  }
}