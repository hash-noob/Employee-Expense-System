import axios from 'axios';
import React, { useEffect,useState } from 'react';
import BillPopup from './Billpopup';
import AddBill from './AddBillbtn';


const BillCard = ({ bill }) => (
  <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <h3 className="text-lg font-semibold">{bill.title}</h3>
    <p className="text-gray-600">{bill.description}</p>
    <div className="mt-2">
      <a href='#' className="text-blue-500 hover:underline">
      {bill.link}
      </a>
    </div>
  </div>
);

const BillGrid = ({bills,onSubmit}) => {
  
  const [billPopup,setBillPopup] = useState(false)

  function showBillPop(){
    setBillPopup(true)
  }

  function closeBillPop(){
    setBillPopup(false)
  }
 
  return (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Bills</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bills.map((bill, index) =>{
        return (
        <BillCard key={index} bill={bill} />
      )}
      )}
    </div>  
      <AddBill onClick={showBillPop}/>
      { billPopup && <BillPopup onClose={closeBillPop} onSubmit={onSubmit} />}
  </div>
  )
}



const BillContainer = () => {

  const [bills, setBills] = useState([]);
  
  const getBills= async ()=>{
     const response = await axios.get("http://localhost:3001/api/user/bills",{
                      headers:{
                        Authorization:"Bearer "+localStorage.getItem('token')
                      }
                    })
      let temp=[]
      for(let i of response.data){
        temp.push({
          title : i.billId,
          description : i.category,
          link : i.billAmount
        })
      const billsArray = temp.map((e)=>e.title)
      localStorage.setItem('billsArray',billsArray)
      setBills(temp);
    }
  }
  useEffect(() => {
    getBills();
  }, []);
  

  const onSubmit=async (formData)=>{
    try{
      const res = await axios.post("http://localhost:3001/api/user/bills",formData)
      if(res.status==200){
        setBills([...bills,{title:res.data.billId,description:res.data.category,link:res.data.billAmount}])
        const billsArray = bills.map((e)=>e.title)
        localStorage.setItem('billsArray',billsArray)
      }
    }
    catch(err){
      alert("Bill with given id already exist or BillAmount is not numeric")
    }
  }

  return (
    <div className="p-6">
      <BillGrid bills={bills} onSubmit={onSubmit}/>
    </div>
  );
};


export default BillContainer;
