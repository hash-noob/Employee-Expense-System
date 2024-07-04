import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import axios from 'axios'

function ChangePassword(){

    const navigate = useNavigate()
    const [message1,setMessage1] = useState('')
    const [message2,setMessage2] = useState('')
    const [message3,setMessage3] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    const handleBack = ()=>{
        if(localStorage.getItem('role')){
            navigate('/managerDashboard/settings')
        }else{
        navigate('/dashboard/settings')
        }
    }

    const handleSave = async () => {
        try{
          const res = await axios.post("http://localhost:3001/api/user/ChangePassword",
                                      {currentPassword,newPassword},
                                      { headers:{ Authorization:"Bearer "+localStorage.getItem('token')}},
                                      );
          if(res.status===200){
            console.log("token changed")
            localStorage.setItem('token',res.data.token)
          }
          setMessage3(res.data.msg)
          }catch(err){
            setMessage1()
            console.log(err)
        }         
      }

      useEffect(()=>{
        document.getElementById('save').disabled = true
      },[])

     const checkPassword = (password)=>{
        if (isValidPassword(password)){
            setMessage1('')
            setNewPassword(password)
            if(password === document.getElementById('repass').value){
              document.getElementById('save').disabled=false
              setMessage2('')
            }
        }else{
            setMessage1('The password must contain 8-20 characters,a number and a special character')
            document.getElementById('save').disabled= true
        }
     }

     const isValidPassword = (password) => {

        const minLength = 8;
        const maxLength = 20;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        setNewPassword(password)

        if (password.length < minLength || password.length > maxLength) {
            return false;
        }
    
        if (!hasNumber.test(password)) {
            return false;
        }

        if (!hasSpecialChar.test(password)) {
            return false;
        }
    
        return true;
    }

    

      const comparePassword = (reEnteredPassaword) =>{
        if(reEnteredPassaword === newPassword){
            setMessage2("")
            document.getElementById("save").disabled = false
        }else{
            setMessage2("Password is not matching!!")
            document.getElementById("save").disabled = true
        }
      }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
            <PasswordInput onchange={(e)=>(setCurrentPassword(e.target.value))} placeholder="Current Password" id="pass" />
            <PasswordInput onchange={(e)=>(checkPassword(e.target.value))} placeholder="New Password" id="newpass" />
            <div className="text-red-500">{message1}</div>
            <input 
              type="password" 
              placeholder="Renter New-Password"
              onChange={(e)=>{comparePassword(e.target.value)}}
              className="w-full px-3 py-2 border rounded my-4" 
              id="repass"
              required 
            />
            <div className="text-red-500">{message2}</div>
            <div className="flex justify-around">
            <button
                onClick={handleSave}
                className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60"
                id="save"
            >
                Save
            </button>
            <button
                onClick={handleBack}
                className="w-fit bg-white-500 hover:shadow-md text-blue-500 font-bold py-2 px-4 rounded"
            >
                Back
            </button>
            </div>
            <div className="text-center">
                {message3}
            </div>
        </div>
    )
}

export default ChangePassword