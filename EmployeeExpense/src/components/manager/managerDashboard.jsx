import React from "react";
import Sidebar from "../SideBar";
import PendingBills from './pendingbills.jsx';
import ApprovedBills from './approvedbills.jsx'
import RejecteBills from './rejectedbills.jsx'
const dashboard=()=>{
    return(
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PendingBills />
            <ApprovedBills/>
            <RejecteBills/>

            </div>
            </main>

    
</div>
    )
}
export default dashboard