import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';

const DashBord = () => {
  let [name, setname] = useState("")
  let ID = useParams()

  useEffect(()=>{
    axios.get(`http://localhost:4001/user/${ID.ID}`)
    .then((e)=>{
      setname(e.data)
    
    })
    .catch(()=>{console.log("unable to fetch data in Edit comp");})
},[ID.ID])

  return (
    <div>
      <div id='navbar' className=' bg-stone-50  '>
        <ul className='flex gap-20 px-10'>
          <li>HOME</li>
          <li><Button variant="text"><Link to='/create-employee'> Create Employee</Link></Button> </li>
          <li><Button variant="text"><Link to="/employee-list">  Employee list </Link></Button> </li>
          <li className='border-red-400'>{name}</li>
          <li>LOGOUT</li>
        </ul>
      </div>
      <h1 className='bg-yellow-200' style={{ textAlign: 'center', marginTop: '20px' }}>DASHBOARD</h1>
 <p style={{ textAlign: 'center', marginTop: '20px' }}>Welcome to Admin Panel</p>

    </div>
  )
}

export default DashBord 