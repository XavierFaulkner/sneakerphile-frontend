import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
const ALERT_GET_ALL = "http://localhost:8080/api/alert/get-all";

export default function Feed() {
    const {auth} = useAuth();
    const [alerts, setAlerts] = useState([]);
    useEffect(() => {
        let getAlerts = async (e) => {
            try {
                let response = await axios.post(ALERT_GET_ALL, 
                    {},
                    {
                        headers: {'Authorization': `Bearer ${auth?.accessToken}`}
                    });
                    setAlerts(oldAlerts => {
                        return response?.data
                       })
            } catch (e) {
    
            }
        }
        getAlerts();
       console.log(alerts);
    })

  return (
    <section>
        <div id="feedContainer">
            <div id="loginFormTitle">
                <h1>Feed</h1>
            </div>
            <div id="feed">
                
            </div>
        </div>
    </section>
  )
}
