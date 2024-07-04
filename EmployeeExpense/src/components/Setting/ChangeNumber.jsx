import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import axios from 'axios';

function ChangeNumber(){
    
    const navigate = useNavigate()
    const [password,setPassword] = useState()
    const [newNumber,setNewNumber] = useState()
    const [message1,setMessage1] = useState()
    const [message2,setMessage2] = useState()
    const [message3,setMessage3] = useState()

    useEffect(()=>{document.getElementById('change').disabled=true},[])
    const checkNumber = (number) =>{
        if(number.length<10){
            setMessage1('Invalid number')
            document.getElementById('change').disabled = true
        }
        else{
            setMessage1('')
            setNewNumber(number)
        }
        if(number == document.getElementById('renum').value){
            document.getElementById('change').disabled = false
            setMessage2('')
        }
    }

    const compareNumber = (number) =>{
        if(number=== newNumber){
            document.getElementById('change').disabled = false
            setMessage2('')
        }else{
            document.getElementById('change').disabled = true
            setMessage2('The mobile numbers do not match')
        }
    }

    const handleBack = ()=>{ 
    if(localStorage.getItem('role')){
        navigate('/managerDashboard/settings')
    }else{
    navigate('/dashboard/settings')
    }}
    const handleSave =async ()=>{
        try{
            const res = await axios.post("http://localhost:3001/api/user/ChangeNumber",
                {newNumber,password},
                { headers:{ Authorization:"Bearer "+localStorage.getItem('token')}},
                );
            setMessage3(res.data)
        }catch(err){
            console.log(err)
            setMessage3("Oopss.. Something went wrong")
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white  rounded-lg shadow-md mt-8 p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Change Mobile Number</h2>
            <PasswordInput onchange={(e)=>(setPassword(e.target.value))} placeholder="Password" id="pass" />
            <input 
              type="number" 
              placeholder="New mobile number"
              onChange={(e)=>(checkNumber(e.target.value))}
              className="w-full px-3 py-2 border rounded my-4" 
              required 
            />
            <div className="text-red-500">{message1}</div>
            <input 
              type="number" 
              placeholder="Re-enter mobile number"
              onChange={(e)=>(compareNumber(e.target.value))}
              className="w-full px-3 py-2 border rounded my-4" 
              id = "renum"
              required 
            />
            <div className="text-red-500">{message2}</div>
            <div className="flex justify-around">
                <button
                    onClick={handleSave}
                    className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60"
                    id="change"
                >
                    Save Change
                </button>
                <button
                    onClick={handleBack}
                    className="w-fit bg-white-500 hover:shadow-md text-blue-500 font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
            <div className="text-center">{message3}</div>
        </div>
    )
}

export default ChangeNumber