import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {API} from './API'

function Profile() {
    let userID = localStorage.getItem("ID")
    const [user,SetUser]=useState({})

    useEffect(()=>{
        datas()
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    let datas=async()=>{
        try {
            let check = await axios.get(`${API.Call}/Detail/${userID}`)
            SetUser(check)
        } catch (error) {
            
        }
    }

    const Person = user.data
    return (
        <>
        <Navbar/>
            {!Person? <h3 className='d-flex justify-content-center text-black'>Loading...</h3>:<div className="container form">
            <form className="row g-3 form1 ">
            <h5 className="text-center">User Detail</h5>
            <div className="col-6">
                    <label htmlFor="Username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Username" disabled value={Person.Data.Username || " "}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder='Email' disabled value={Person.Data.Email || " "}/>
                </div>
                <div className="col-6">
                    <label htmlFor="Age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="Age" placeholder="Age" value={Person.Data.Age || " "}  disabled/>
                </div>
                <div className="col-6">
                    <label htmlFor="DOB" className="form-label">DOB</label>
                    <input type="text" className="form-control" id="DOB" placeholder="DOB" disabled value={Person.Data.DOB || " "}/>
                </div>
                <div className="col-6">
                    <label htmlFor="Gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="Gender" placeholder="Gender" value={Person.Data.Gender || " "} disabled/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="Mobile" className="form-label">Mobile</label>
                    <input type="tel" className="form-control" id="Mobile" placeholder='Mobile Number' value={Person.Data.Mobile || " "} disabled/>
                </div>
                <div className="col-12 d-flex justify-content-center mt-4">
                    <a href={`/EditProfile/${Person.Data._id}`} className="btn btn-primary">Edit</a>
                </div>
            </form>
            </div>}
        </>
    )
}

export default Profile