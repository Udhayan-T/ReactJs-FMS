import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Common/header';
import { Link } from 'react-router-dom';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
        };

        this.roletype = localStorage.getItem('roletype');

        this.pocId = localStorage.getItem('employeeId');
    }

    componentDidMount() {
        if (this.roletype != "POC") {
            axios.get("http://localhost:8083/getEvents").then((res) => {
                console.log(res.data);
                this.setState({
                    eventsList: res.data
                })
                //on success


            }).catch((error) => {

                this.setState({
                    pageRedirect: true
                })
            });
        }
        else {
            axios.get("http://localhost:8083/getPocEvents/" + this.pocId).then((res) => {
                console.log(res.data);
                this.setState({
                    eventsList: res.data
                })
                //on success


            }).catch((error) => {

                this.setState({
                    pageRedirect: true
                })
            });
        }
    }

    onDownloadExcel = (e) => {
        e.preventDefault();

        if (this.roletype != "POC") {

            axios.get("http://localhost:8083/downloadExcel",
                {
                    headers:
                        {
                            'Content-Disposition': "attachment; filename=Events.xlsx",
                            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        },
                    responseType: 'arraybuffer',
                }
            ).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Events.xlsx');
                document.body.appendChild(link);
                link.click();
            })
                .catch((error) => console.log(error));
        }

        else {
            axios.get("http://localhost:8083/downloadPocExcel/" + this.pocId,
                {
                    headers:
                        {
                            'Content-Disposition': "attachment; filename=POCEvents.xlsx",
                            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        },
                    responseType: 'arraybuffer',
                }
            ).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'template.xlsx');
                document.body.appendChild(link);
                link.click();
            })
                .catch((error) => console.log(error));
        }
    }

    render() {
        const { eventsList = [] } = this.state;
        const roletype = localStorage.getItem('roletype');
        return (
            <>
                <Header />
                <div className="container col-sm-12" >
                    {roletype == 'ADMIN' ?
                        <div className="card mb-3">
                            <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                <span className="card-title ">ACTIONS </span>
                                <div className="float-right">

                                    <i className="fa fa-dot-circle-o mr-2" style={{ color: "" }} aria-hidden="true"></i>
                                    <i className="fa fa-repeat mr-2" style={{ color: "green" }} aria-hidden="true"></i>
                                    <i className="fa fa-minus-circle mr-2" style={{ color: "darkorgange" }} aria-hidden="true"></i>
                                    <i className="fa fa-times-circle-o mr-2" style={{ color: "red" }} aria-hidden="true"></i>

                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-deck">

                                    <div className="card" style={{ backgroundColor: "#73a8e2bd" }}>
                                        <div className="row">
                                            <div className="text-center ml-3" style={{ backgroundColor: "#2263c3", width: "90px", height: "100px" }}>
                                                <i className="fa fa-envelope my-4" style={{ fontSize: "3.5rem" }} aria-hidden="true"></i>
                                            </div>
                                            <div className="col mr-2 " >
                                                <div className="card-block mt-3">
                                                    <h5 className="card-title " >Email Reminder!</h5>
                                                </div>
                                                <div className="row">
                                                    <div className="mx-3 mt-2"><span className="card-text">Sit back and relax while the app send emailList!</span></div>
                                                    <div className="mb-1" >
                                                        <button className="btn btn-light">Send Email</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card" style={{ backgroundColor: "#fed8b1" }}>
                                        <div className="row">

                                            <div className="col ml-3" style={{ backgroundColor: "#fed8b1" }}>
                                                <div className="card-block px-2">
                                                    <h5 className="card-title float-right mt-3">Future Implementations</h5>

                                                    <p className="card-text" style={{ float: "right" }}>This placeholder is used for adding any other actions in future</p>

                                                </div>

                                            </div>
                                            <div className="text-center mr-3" style={{ backgroundColor: "darkorange", width: "90px", height: "100px", fontSize: "3.5em" }}>

                                                <i className="fa fa-lightbulb-o my-4" aria-hidden="true"></i>
                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div> : null}

                    <div className="card">
                        <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                            EVENTS
                        </div>
                        <div className="card-body">
                            <button className="btn text-white mb-2 float-right" style={{ backgroundColor: "#0000a7" }} onClick={this.onDownloadExcel}><i className="fa fa-file-excel-o mr-2"></i>Download Excel</button>
                            <table className="table table-bordered table-responsive " style={{ height: "500px", fontSize: "1vw" }}>
                                <thead>
                                    <tr>
                                        <th rowSpan="2" >Action</th>
                                        <th>Event ID</th>
                                        <th>Month</th>
                                        <th>Base Location</th>
                                        <th>Council Name</th>
                                        <th>Benificiary Name</th>
                                        <th className="w-25"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsList.length ?
                                        eventsList.map(event => (
                                            <React.Fragment key={event.eventId}>
                                                <tr key={event.eventId}>
                                                    <td ><Link className="btn text-white" style={{ backgroundColor: "#0000a7", fontSize: "12px", width: "75px" }}
                                                        to={{
                                                            pathname: "/eventdetail",
                                                            eventId: event.eventId
                                                        }} ><i className="fa fa-eye mr-2" ria-hidden="true"></i>VIEW</Link>
                                                    </td>
                                                    <td>{event.eventId}</td>
                                                    <td>{event.month}</td>
                                                    <td>{event.baseLocation}</td>
                                                    <td>{event.councilName}</td>
                                                    <td>{event.beneficiaryName}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td colSpan="6" className="w-auto">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Event Name</th>
                                                                    <td>{event.eventName}</td>
                                                                </tr><tr>
                                                                    <th>Event Date</th>
                                                                    <td>{event.startDate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>status</th>
                                                                    <td>{event.status}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Venue Address</th>
                                                                    <td>{event.venueAddress}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Volunteers</th>
                                                                    <td>{event.totalVolunteer}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Volunteers Hours</th>
                                                                    <td>{event.totalVolunteerHour}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Travel Hours</th>
                                                                    <td>{event.totalTravelHour}</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>

                                            </React.Fragment>

                                        )) : null}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Events;
