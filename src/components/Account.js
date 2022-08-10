import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
const GET_USER = "http://localhost:8080/api/user/get-info";
const SAVE_CLOSET = "http://localhost:8080/api/closet/save";
const ADD_FRIEND = "http://localhost:8080/api/friend-request/send";
const CREATE_SHOE = "http://localhost:8080/api/shoe/save";
const ASSIGN_SHOE = "http://localhost:8080/api/shoe/assign";

const userObj = {
  "id": 0,
  "username": "",
  "firstName": "",
  "lastName": "",
  "closets": [],
  "friendRequest": [],
  "friends": [],
  "friendsOf": [],
  "numOfClosets": 0,
  "numOfFollowers": 0,
  "numOfFollowing": 0
}

export default function Account() {
  const {auth} = useAuth();
  const [followersIsActive, setFollowersIsActive] = useState(false)
  const [followingIsActive, setFollowingIsActive] = useState(false)
  const [userData, setUserData] = useState(userObj)
  const [activeCloset, setActiveCloset] = useState(0)
  const [displayShoes, setDisplayShoes] = useState([])
  const [closetName, setClosetName] = useState('')
  const [addFriendName, setAddFriendName] = useState('')
  const [shoeName, setShoeName] = useState('')
  const [shoeSize, setShoeSize] = useState('')

  useEffect(() => {
    let getUserData = async (e) => {
      try {
        let response = await axios.get(GET_USER,
          {
            params: 
            {
              username: auth?.user
            },
            headers: {'Authorization': `Bearer ${auth?.accessToken}`}
          });
          setUserData(oldData => {
            return response?.data?.data
          })
      } catch (e){
          console.log(e);
      }
    }
    getUserData();
  }, [auth?.accessToken, auth?.user, closetName, addFriendName, shoeSize])

  useEffect(() => {
    let shoeList
    userData.closets.map((closet) => {
      if(closet.id === activeCloset) {
        shoeList = closet.shoes
      }
      return null;
    })
    setDisplayShoes(shoeList)
  }, [activeCloset, userData.closets])

  const setFollowersActive = () => {
    setFollowersIsActive(!followersIsActive)
  }

  const setFollowingActive = () => {
    setFollowingIsActive(!followingIsActive)
  }

  const changeActiveCloset = (id) => {
    setActiveCloset(id)
  }

  const saveCloset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SAVE_CLOSET,
        {
          name: closetName
        },
        {
          headers: {'Authorization': `Bearer ${auth?.accessToken}`}
        });
        setClosetName('')
    } catch (e){
        console.log(e);
    }
  }

  const addFriend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ADD_FRIEND,
        {
          sendTo: addFriendName
        },
        {
          headers: {'Authorization': `Bearer ${auth?.accessToken}`}
        });
        setAddFriendName('')
    } catch (e){
        console.log(e);
    }
  }

  const addShoe = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(CREATE_SHOE,
        {
          name: shoeName,
          size: shoeSize
        },
        {
          headers: {'Authorization': `Bearer ${auth?.accessToken}`}
        });
        console.log(response)
      await axios.post(ASSIGN_SHOE,
        {},
        {
          params: {
            shoeId: response?.data?.id,
            closetId: activeCloset
          },
          headers: {'Authorization': `Bearer ${auth?.accessToken}`}
        });
        setShoeName('')
        setShoeSize('')
    } catch (e){
        console.log(e);
    }
  }

  return (
    <section>
        <div className='accountHolder'>
            <div className='accountHolderTitle'>
                <h2>My Account</h2>
                <div id="userInfo">
                  <div id="shoeInfo">
                    <p>0</p>
                    <p>Shoes</p>
                  </div>
                  <div className={`dropdown ${followersIsActive ? 'active' : ''}`}>
                    <button id='dropdownLink' onClick={setFollowersActive}>
                        <p>{userData.numOfFollowers}</p>
                        <p>Followers</p>
                    </button>
                    <div className='dropdown-menu2' onClick={setFollowersActive}>
                      {userData.friendsOf.map((user) => (
                        <p key={user}>{user}</p>
                      ))}
                    </div>
                  </div>
                  <div className={`dropdown ${followingIsActive ? 'active' : ''}`}>
                    <button id='dropdownLink' onClick={setFollowingActive}>
                        <p>{userData.numOfFollowing}</p>
                        <p>Following</p>
                    </button>
                    <div className='dropdown-menu2' onClick={setFollowingActive}>
                    {userData.friends.map((user) => (
                        <p key={user}>{user}</p>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
            <div id="twoForms">
              <form className='addForm' onSubmit={saveCloset}>
                <button className='acceptButton' id="createClosetButton">New Closet</button>
                <input 
                  type="text"
                  id="closetName"
                  placeholder='Closet Name'
                  onChange={(e) => setClosetName(e.target.value)}
                  required
                  value={closetName}
                />
              </form>
              <form className='addForm' onSubmit={addFriend}>
                <button className='acceptButton' id="createClosetButton">Add Friend</button>
                <input 
                  type="text"
                  id="userName"
                  placeholder='Username'
                  onChange={(e) => setAddFriendName(e.target.value)}
                  required
                  value={addFriendName}
                />
              </form>
            </div>
            <div className='closetHolder'>
              { userData.closets < 1 ? (
                <h3 id="noShoes">Create a closet</h3>
              ) : (
                userData.closets.map((closet) => {
                  const className = activeCloset === closet.id ? 'closetCard selectedCloset' : 'closetCard';
                  return (
                    <button className={className} key={closet.id} onClick={() => changeActiveCloset(closet.id)}>
                      <h3>{closet.name}</h3>
                    </button>
                  )
                })
              )
              }
            </div>
        </div>
        <div className='shoesHolder'>
        <form className='addForm' onSubmit={addShoe}>
                <button className='acceptButton' id="createClosetButton">New Shoe</button>
                <input 
                  type="text"
                  id="shoeName"
                  placeholder='Shoe Name'
                  onChange={(e) => setShoeName(e.target.value)}
                  required
                  value={shoeName}
                />
                <input 
                  type="text"
                  id="shoeSz"
                  placeholder='Size'
                  onChange={(e) => setShoeSize(e.target.value)}
                  required
                  value={shoeSize}
                />
              </form>
          <div className='shoeHolder'>
            { activeCloset === 0 || !displayShoes ? (
              <h3 id="noShoes">Please select a collection</h3>
            ) : (
              <>
                {                                    
                  displayShoes.length < 1 ? (
                    <h3 id="noShoes">Collection Empty</h3>
                  ) : (
                    displayShoes.map((shoe) => {
                      return (
                          <div className='shoeCard' key={shoe.id}>
                            <p>{shoe.name}</p>
                            <p>Sz: {shoe.size}</p>
                          </div> 
                      )
                    })
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
