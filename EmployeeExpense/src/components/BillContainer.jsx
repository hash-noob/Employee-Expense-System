import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react';
import billsContext from './BillsContext';
import BillPopup from './Billpopup';
import AddBill from './AddBillbtn';
import BillCard from './BillCard';


const BillGrid = ({bills,onSubmit}) => {
  
  const [billPopup,setBillPopup] = useState(false)

  function showBillPop(){
    setBillPopup(true)
  }

  function closeBillPop(){
    setBillPopup(false)
  }
 
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
      <h2 className="text-xl font-semibold mb-4">Bills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill, index) => (
          <BillCard key={index} bill={bill} />
        ))}
      </div>
      {billPopup && <BillPopup onClose={closeBillPop} onSubmit={onSubmit} />}
      <AddBill onClick={showBillPop} />
    </div>
  );
}



const BillContainer = () => {

  const {bills, setBills} = useContext(billsContext)
  
  const getBills= async ()=>{
     const response = await axios.get("http://localhost:3001/api/user/pending-bills",{
                      headers:{
                        Authorization:"Bearer "+localStorage.getItem('token')
                      }
                    })
      let temp=[]
      for(let i of response.data){
        temp.push({
            billId: i.billId,
            billAmount: i.billAmount,
            category: i.category,
            merchant: i.merchant, 
            remark: i.remark, 
            datedOn: i.datedOn,
            paymentMethod: i.paymentMethod
        })
      const billsArray = temp.map((e)=>e.billId)
      localStorage.setItem('billsArray',billsArray)
      setBills(temp);
    }
  }
  
  useEffect(() => {
    getBills();
  }, []);
  

  const onSubmit=async (data)=>{
    const image = {
      "img" : data.billFile,
      "billId" : data.billId
    }
    try{
      const res = await axios.post("http://localhost:3001/api/user/bills",data)
      if(res.status==200){
        setBills([...bills,{
          billId: res.data.billId,
          billAmount: res.data.billAmount,
          category: res.data.category,
          merchant: res.data.merchant, 
          remark: res.data.remark, 
          datedOn: res.data.datedOn,
          paymentMethod: res.data.paymentMethod
        }])
        const billsArray = bills.map((e)=>e.billId)
        localStorage.setItem('billsArray',billsArray)
      }
    }
    catch(err){
      console.log(err)
      alert("Bill with given id already exist or BillAmount is not numeric")
    }
  }

  return (
    <div className="p-6">
      <BillGrid bills={bills} onSubmit={onSubmit} />
    </div>
  );
};


export default BillContainer;
