import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Alert from './Alert';
import refreshButton from '../images/refresh.png'
const ALERT_GET_ALL = "http://localhost:8080/api/alert/get-all";

export default function Feed() {
    const {auth} = useAuth();
    const [alerts, setAlerts] = useState([]);
    const [alertCards, setAlertCards] = useState([]);

    useEffect(() => {
        let getAlerts = async (e) => {
            try {
                let response = await axios.post(ALERT_GET_ALL, 
                    {},
                    {
                        headers: {'Authorization': `Bearer ${auth?.accessToken}`}
                    });
                    setAlerts(oldAlerts => {
                        return response?.data?.data
                       })
            } catch (e) {
                console.log(e);
            }
        }
        getAlerts();
    }, [auth?.accessToken])

    useEffect(() => {
        const getAlertCards = () => {
            setAlertCards(alerts.map((alert) => (
                <Alert id={alert.id} key={alert.id} title={alert.title} type={alert.type} userSince={alert.userSince}
                 numOfCollections={alert.numOfCollections} numOfShoes={alert.numOfShoes}
                 numOfFollowers={alert.numOfFollowers} numOfFollowing={alert.numOfFollowing}
                />
            )));
        }
        getAlertCards();
    }, [alerts])

    let refresh = async (e) => {
        try {
            let response = await axios.post(ALERT_GET_ALL, 
                {},
                {
                    headers: {'Authorization': `Bearer ${auth?.accessToken}`}
                });
                setAlerts(oldAlerts => {
                    return response?.data?.data
                   })
        } catch (e) {

        }
    }

  return (
    <section>
        <div id="feedContainer">
            <div id="loginFormTitle">
                <h1>Feed</h1>
                <button id="refreshButton" onClick={refresh}><img src={refreshButton} alt="refresh button"></img></button>
            </div>
            <div id="feed">
                {
                    alertCards.length < 1 ? (
                        <h3 id="caughtUp">All caught up</h3>
                    ) : (
                        <>
                            {
                                alertCards.map((item) => (
                                        <div key={item.key}>{item}</div>
                                    )
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    </section>
  )
}
