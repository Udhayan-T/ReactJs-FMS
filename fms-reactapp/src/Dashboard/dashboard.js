import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Common/header';


class Dashboard extends Component {

    constructor(props) {
                super(props);
        
                this.state = {
                    eventsList: [],
                    livesImpacted: 0,
                    volunteers: 0
                }
                this.roletype=localStorage.getItem('roletype');
           
                this.pocId = localStorage.getItem('employeeId');
            }

            componentDidMount() {

                if(this.roletype!="POC"){
                    console.log("from if pocId : "+this.pocId);
                            axios.get("http://localhost:8083/getEvents").then(result => {
                                this.setState({
                                    eventsList: result.data
                                })
                                this.state.eventsList.map(eventsList => {
                                    this.state.livesImpacted = this.state.livesImpacted + parseInt(eventsList.livesImpacted);
                                    this.state.volunteers = this.state.volunteers + parseInt(eventsList.totalVolunteer)
                                })
                                console.log(this.state.eventsList)
                                console.log(this.state.livesImpacted);
                                this.setState({
                                    livesImpacted:this.state.livesImpacted,
                                    volunteers:this.state.volunteers
                                })
                            })
                        }
                        else{
                            console.log("from else pocId : "+this.pocId);
                            axios.get("http://localhost:8083/getPocEvents/"+this.pocId).then(result => {
                                this.setState({
                                    eventsList: result.data
                                })
                                this.state.eventsList.map(eventsList => {
                                    this.state.livesImpacted = this.state.livesImpacted + parseInt(eventsList.livesImpacted);
                                    this.state.volunteers = this.state.volunteers + parseInt(eventsList.totalVolunteer)
                                })
                                console.log(this.state.eventsList)
                                console.log(this.state.livesImpacted);
                                this.setState({
                                    livesImpacted:this.state.livesImpacted,
                                    volunteers:this.state.volunteers
                                })
                            })
                        
                        }

            }

            render() {
                return (
                    <>
                        <Header />
                       <div className="container-fluid">
                        <div className="card-deck text-white">
                            <div className="card">
                                <div className="card-body" style={{backgroundColor:"#b43c3c",fontSize:"12px"}}>
                                    <p>TOTAL EVENTS</p>
                                    <p className="h4">{this.state.eventsList.length}</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body" style={{backgroundColor:"darkorange",fontSize:"12px"}}>
                                    <p>LIVES IMPACTED</p>
                                    <p className="h4">{this.state.livesImpacted}</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body" style={{backgroundColor:"#a9059d",fontSize:"12px"}}>
                                    <p>VOLUNTEERS</p>
                                    <p className="h4">{this.state.volunteers}</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body" style={{backgroundColor:"#474b4f",fontSize:"12px"}}>
                                    <p>PARTICIPANTS</p>
                                    <p className="h4">{this.state.volunteers}</p>
                                </div>
                            </div>
                        </div>
                        </div>
        
                    </>
                )
            }
}
export default Dashboard;
