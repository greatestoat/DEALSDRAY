
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let login=()=>{
        let payload = {email, password}
        axios.post('http://localhost:4001/login', payload)
        .then((e)=>{
            // eslint-disable-next-line eqeqeq
            if(e.data.status == "success"){
                navigate(`/dashbord/${e.data.id}`)
            }
            
            else if(e.data.status === "fail"){
                alert("wrong password")
            }
            else if(e.data.status === "noUser"){
                alert("Invalid Email")
            }
        })
    }

    return (
        <div>
            <div className=' max-w-[940px]  h-[450px] border-4 border-blue-900 mx-auto shadow-xl scale-75 p-[30px]'>
                <h1 className='text-center font-bold text-2xl my-3'>Login Form</h1>
                <div className='border border-yellow-600 max-w-[300px] mx-auto my-5 p-10'> 
                <input className='bg-white-200 border-2 border-violet-400 text-black my-3 placeholder-black ' placeholder='Email' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <br />
                <input className='bg-white-200 border-2 border-violet-400 text-black my-3 placeholder-black' placeholder='Password' type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='bg-blue-300 ml-5 rounded-lg p-1' onClick={login}>LOGIN</button>
                <br />
                <p>do not have Account? <Button variant="outlined"><Link to='/register'>Register</Link></Button> </p>
                </div>
            </div>


        </div>
    )
}

export default Login