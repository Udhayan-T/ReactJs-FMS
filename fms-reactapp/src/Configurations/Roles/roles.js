import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../Common/header';


class Roles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pmoList: []
        }

        this.pmoRef = React.createRef();
    }

    componentDidMount() {
        this.getPmos();
    }
    getPmos(){
        axios.get("http://localhost:8082/api/userservice/getPmoEmployees").then(res => {
console.log(res.data);
this.setState({
    pmoList:res.data
})
        })
    }

    onsubmit() {
        console.log(this.pmoRef.current.value);
    }

    onAddPmo = () => {
        console.log("Add Pmo");
        axios.patch("http://localhost:8082/api/userservice/addpmo/"+this.pmoRef.current.value).then((res)=>{
            console.log(res);
            this.getPmos();

        })
    }
    onRemovePmo = () => {
        console.log("Remove Pmo");
        axios.patch("http://localhost:8082/api/userservice/removepmo/"+this.pmoRef.current.value).then((res)=>{
            console.log(res);
            this.getPmos();

        })
    }
    render() {
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="card mb-2">
                        <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                            ASSIGN PMO
                </div>
                        <div className="card-body">
                            <div className="row">
                                <label className="mr-5 font-weight-bold">Employee ID</label>
                                <input className="ml-5" type="text" placeholder="Enter Employee ID" ref={this.pmoRef} style={{ width: "400px" }} />
                                <button className="btn btn-success ml-2" style={{ fontSize: "12px" }} onClick={this.onAddPmo} >ADD PMO</button>
                                <button className="btn btn-danger ml-2" style={{ fontSize: "12px" }} onClick={this.onRemovePmo} >REMOVE PMO</button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                            PMO USERS </div>
                        <div className="row justify-content-end mr-3 my-2">
                            <button className="btn ml-2 text-white" style={{ backgroundColor: "#0000a7", fontSize: "12px" }} onClick={this.onRemovePmo} ><i className="fa fa-file-excel-o mr-1" aria-hidden="true"></i>DOWNLOAD EXCEL</button>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered" style={{ fontSize: "12px" }}>
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>FIRST NAME</th>
                                        <th>LAST NAME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.pmoList.length?this.state.pmoList.map(pmo=>(
                                        <tr key={pmo.username}>
                                        <td>{pmo.username}</td>
                                    <td>{pmo.firstname}</td>
                                    <td>{pmo.lastname}</td>
                                    </tr>
                                    )):null}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Roles;
