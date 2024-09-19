/* eslint-disable jsx-a11y/alt-text */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';


//  getting data from the DB to React

const EmployeeList = () => {
    let [infoFromDB, setinfoFromDB] = useState([])
    let [reload, setReload] = useState(0)
    useEffect(()=>{
        axios.get("http://localhost:4001/employee-list")
        .then((e)=>{
                setinfoFromDB(e.data)
            })
         .catch((e)=>{
                console.log("error from EmployeeList useEffect");
            })
            setReload(1)
        
    },[reload])
    let deleteUser = (e)=>{
      axios.delete(`http://localhost:4001/employee-list/${e}`)
      setReload(2)
    }

  return (
    <div className='w-screen'>
      <p>Total Count : {infoFromDB.length}</p>
       <table>
       <thead className='border border-black w-screen'>
          <tr>
            <th className='px-7 py-2'>Unique Id</th>
            <th className='px-7 py-2'>Image</th>
            <th className='px-7 py-2'>Name</th>
            <th className='px-7 py-2'>Email</th>
            <th className='px-7 py-2'>Phone</th>
            <th className='px-7 py-2'>Designation</th>
            <th className='px-7 py-2'>Gender</th>
            <th className='px-7 py-2'>Course</th>
            <th className='px-12 py-2'>Action</th>
          </tr>
        </thead>
        <tbody className='text-center text-[15px]'>
          {infoFromDB.map((item,i) => (
            <tr key={item.id}>
              <td className='border-2 border-green-700'>{i+1}</td>
              <td className='border-2 border-green-700'><img src={`/Images/${item.image}`}/></td>
              <td className='border-2 border-green-700'>{item.name}</td>
              <td className='border-2 border-green-700'>{item.email}</td>
              <td className='border-2 border-green-700'>{item.phone}</td>
              <td className='border-2 border-green-700'>{item.designation}</td>
              <td className='border-2 border-green-700'>{item.gender}</td>
              <td className='border-2 border-green-700'>{item.course[0]},{item.course[1]}</td>
              <td className='border-2 border-green-700'>
              <Link  to={`/edit-employee/${item._id}`}>Edit - </Link>
                <Button variant="outlined" color="error"  onClick={()=>{deleteUser(item._id)}}> Delete </Button>
              </td>
            </tr>
          ))}
        </tbody>
        
       </table>
    </div>
  )
}

export default EmployeeList