import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

function Home() {
    const[username,setName]=useState('');
    const navigate=useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(()=>{
       axios.get('http://localhost:8081')
       .then(res => {
          if(res.data.valid){
          console.log("its valid");
          setName(res.data.name);
        }else{
            navigate('/login')
        }
       })
       .catch(err=> console.log(err));

    });
  return (
    <div>
     <h1> welcome back {username}</h1>
    </div>
  )
}

export default Home
