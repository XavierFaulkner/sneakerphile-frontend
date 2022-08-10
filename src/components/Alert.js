import React, {useState} from 'react'
import userIcon from '../images/user-icon.png'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
const FRIEND_REQUEST_RESPONSE = "http://localhost:8080/api/friend-request/response";

export default function Alert(props) {
    const [display, setDisplay] = useState(props.type);
    const {auth} = useAuth();

    const friendRequestAccept = async () => {
        try {
            let response = await axios.post(FRIEND_REQUEST_RESPONSE, 
                {
                    id: props.id,
                    accept: true
                },
                {
                    headers: {'Authorization': `Bearer ${auth?.accessToken}`}
                });
                setDisplay("FRIEND-REQUEST-ACCEPTED")
            return response;
        } catch (e) {

        }
    }

    const friendRequestDecline = async () => {
        try {
            let response = await axios.post(FRIEND_REQUEST_RESPONSE, 
                {
                    id: props.id,
                    accept: false
                },
                {
                    headers: {'Authorization': `Bearer ${auth?.accessToken}`}
                });
                setDisplay("FRIEND-REQUEST-DECLINED")
            return response;
        } catch (e) {

        }
    }

  return (
    <>
        {
            {
                'FRIEND-REQUEST': 
                <div key={props.id} className='alert friendRequest'>
                    <h2>{props.title}</h2>
                    <div className='alertContent'>
                        <div className='side1'>
                            <img src={userIcon} alt="user icon"/>
                            <p>User since Aug 22'</p>
                        </div>
                        <div className='side2'>
                            <div className='grid'>
                                <div>
                                    <p>{props.numOfCollections}</p>
                                    <p>Collections</p>
                                </div>
                                <div>
                                    <p>{props.numOfShoes}</p>
                                    <p>Shoes</p>
                                </div>
                                <div>
                                    <p>{props.numOfFollowers}</p>
                                    <p>Followers</p>
                                </div>
                                <div>
                                    <p>{props.numOfFollowing}</p>
                                    <p>Following</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='alertResponse'>
                        <button className='acceptButton' onClick={friendRequestAccept}>Accept</button>
                        <button className='declineButton' onClick={friendRequestDecline}>Decline</button>
                    </div>
                </div>,
                'FRIEND-REQUEST-ACCEPTED':
                <div key={props.id} className='alert accepted'>
                    <p>Friend request accepted</p>
                </div>,
                'FRIEND-REQUEST-DECLINED':
                <div key={props.id} className='alert declined'>
                    <p>Friend request declined</p>
                </div>
            }[display]
        }
    </>
  )
}
