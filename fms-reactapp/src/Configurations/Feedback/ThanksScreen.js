import React from 'react';

const ThanksScreen=()=>{
return(
    <>
    <div className=" container-fluid bg-light" style={{minHeight:"100vh",fontSize:"18px"}}>
        <br></br>
        <div className="card mx-2 bg-white text-center"> 
        <div className="card-body">
        <h3 style={{ color: "#0000a7" }}>Many Thanks for the Feedback</h3>

        <div className="text-success" >Feedback like this help us constantly improve our outreach experiences by knowing what we are doing right and what we can work on. So, We appreciate you taking
        the time to send us this helpful response.</div>
        <div className="text-success">Don't hesitate to reach out if you have any more questions, comments, or concerns.</div>
        <div className="mt-4">Cheers,</div>
        <div className="text-success">Outreach Team.</div>
        </div>
    </div>
    </div>

    </>
)
}

export default ThanksScreen;