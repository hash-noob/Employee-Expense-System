
import React, { useState, useEffect } from 'react';
import { useEmployee } from './EmployeeContext';
import InfoIcon from '@mui/icons-material/Info';
import demoImg from '../../assets/demo.png';
import * as XLSX from 'xlsx';
import './admin.css';
import '../App.css';

function AddUsers() {
  const { addEmployee, addBulkEmployees } = useEmployee();
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAddUser = async (e, role) => {
    e.preventDefault();
    const form = e.target;
    const eId = form.querySelector("#eId").value;
    const email = form.querySelector("#mail").value;
    const mobileNumber = form.querySelector("#Mnumber").value;

    if(mobileNumber.length!=10){
      setMessage('Invalid MobileNumber')
      return
    }
    try {
      const status = await addEmployee({ eId, email, password: eId, role, mobileNumber, username: eId });
      if(status) setMessage(role === 'user' ? 'User added successfully!' : 'Manager added successfully!');
      else setMessage(role === 'user' ? 'Error: User already exists or there was an issue.' : 'Error: Manager already exists or there was an issue.');
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage(role === 'user' ? 'Error: User already exists or there was an issue.' : 'Error: Manager already exists or there was an issue.');
    }
    form.reset();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
     
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const users = XLSX.utils.sheet_to_json(worksheet);
      
        // Attempt to add bulk users
        try {
         const status= await addBulkEmployees(users);
          if(status)setMessage('Bulk users added successfully!'); 
          else setMessage('Error: There was an issue adding bulk users.');
        } catch (err) {
          console.error("Error adding bulk users:", err);
          setMessage('Error: There was an issue adding bulk users.');
        }
        finally {
        setShowModal(false);
      }
    }
  };

  const [showDemo,setShowDemo] = useState(false)

  return (
    <div>
      <div className='card-container-dashboard'>
        <div className='card-heading-dashboard'>
          <h1 style={{fontSize:'20px'}}>Add New <span>User</span></h1>
          <button
            style={{ width: 'max-content' }}
            className="btn"
            onClick={() => setShowModal(true)}
          >
            Add Bulk Users
          </button>
        </div>
        <form method='post' onSubmit={(e) => handleAddUser(e, 'user')}>
          <input id="eId" type="text" name='eId' placeholder='Employee-Id' className="form-group" required />
          <div className="form-group">
            <input id="mail" type="email" name='email' placeholder='Employee-MailId' required />
          </div>
          <div className="form-group">
            <input id="Mnumber" type="number" name='Mnumber' placeholder='Employee-MobileNumber' required />
          </div>
          <button type="submit" className="btn">Add</button>
          {message && (
            <div className="popup rounded-lg">
              <h2>{message}</h2>
            </div>
          )}
        </form>
      </div>
      <div className='card-container-dashboard'>
        <div className='card-heading-dashboard'>
          <h1 style={{fontSize:'20px'}}>Add New <span>Manager</span></h1>
          
        </div>
        <form method='post' onSubmit={(e) => handleAddUser(e, 'manager')}>
          <div className="form-group">
            <input id="eId" type="text" name='eId' placeholder='Manager-Id' required />
          </div>
          <div className="form-group">
            <input id="mail" type="email" name='mail' placeholder='Manager-MailId' required />
          </div>
          <div className="form-group">
            <input id="Mnumber" type="number" name='Mnumber' placeholder='Manager-MobileNumber' required />
          </div>
          <button type="submit" className="btn">Add</button>
          {message && (
            <div className="popup">
              <h2>{message}</h2>
            </div>
          )}
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Upload Users</h2>
            <div onClick={()=>{setShowDemo(!showDemo)}}>
            <InfoIcon/>
            {showDemo && <img height="200px" width="200px" src={demoImg}></img>}
            </div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUsers;
