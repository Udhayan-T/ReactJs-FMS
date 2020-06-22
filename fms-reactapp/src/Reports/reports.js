import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Common/header';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
        };

        this.emailRef = React.createRef();


        this.roletype = localStorage.getItem('roletype');

        this.pocId = localStorage.getItem('employeeId');
    }

    componentDidMount() {
        if (this.roletype != "pmo") {
            axios.get("http://localhost:8083/getEvents").then((res) => {
                console.log(res.data);
                this.setState({
                    eventsList: res.data
                })
                //on success


            }).catch((error) => {

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
            });
        }
    }

    onDownloadExcel = (e) => {
        e.preventDefault();

        if (this.roletype != "admin") {

            axios.get("http://localhost:8083/downloadExcel",
                {
                    headers:
                        {
                            'Content-Disposition': "attachment; filename=EventReport.xlsx",
                            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        },
                    responseType: 'arraybuffer',
                }
            ).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'EventReport.xlsx');
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
                            'Content-Disposition': "attachment; filename=POCEventReport.xlsx",
                            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        },
                    responseType: 'arraybuffer',
                }
            ).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'POCEventReport.xlsx');
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
                <div className="container-fluid col-sm-12">
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

                                    <div className="card" style={{ backgroundColor: "#99eae4" }}>
                                        <div className="row">
                                            <div className="text-center ml-3" style={{ backgroundColor: "#19B9AD", width: "90px", height: "100px" }}>
                                                <i className="fa fa-file-excel-o my-4" style={{ fontSize: "3.5rem" }} aria-hidden="true"></i>
                                            </div>
                                            <div className="col mr-2 " >
                                                <div className="card-block mt-3">
                                                    <h5 className="card-title " >Email Report</h5>
                                                </div>
                                                <div className="row">
                                                    <div className="mx-3 mt-2"><span className="card-text">Employee ID</span></div>
                                                    <div className="mt-1 mr-2"><input type="email" placeholder="Enter email address" ref={this.emailRef} /></div>
                                                    <div className="mb-1" >
                                                        <button className="btn btn-secondary">Send Email</button>
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
                            EVENTS REPORT
                        </div>
                        <div className="card-body">
                            <button className="btn text-white mb-2 float-right" style={{ backgroundColor: "#0000a7" }} onClick={this.onDownloadExcel}>
                                <i className="fa fa-file-excel-o mr-2"></i>Download Excel</button>

                            <table className="table table-sm table-bordered table-responsive" style={{ height: "500px" }}>
                                <thead >
                                    <tr>
                                        <th >Event ID</th>
                                        <th>Month</th>
                                        <th>Benificiary Name</th>
                                        <th>Base Location</th>
                                        <th>Council Name</th>
                                        <th>Project</th>
                                        <th>category</th>
                                        <th>Event Name</th>
                                        <th>Event Description</th>
                                        <th>Event Date</th>
                                        <th>Total Volunteers</th>
                                        <th>Total Volunteer Hours</th>
                                        <th>Total Travel Hours</th>
                                        <th>Overall Volunteering Hours</th>
                                        <th>Lives Impacted</th>
                                        <th>Status</th>
                                        <th>Activity Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsList.length ?
                                        eventsList.map(event => (
                                            <tr key={event.eventId}>
                                                <td>{event.eventId}</td>
                                                <td>{event.month}</td>
                                                <td>{event.beneficiaryName}</td>
                                                <td>{event.baseLocation}</td>
                                                <td>{event.councilName}</td>
                                                <td>{event.projectName}</td>
                                                <td>{event.category}</td>
                                                <td>{event.eventName}</td>
                                                <td>{event.description}</td>
                                                <td>{event.startDate}</td>
                                                <td>{event.totalVolunteer}</td>
                                                <td>{event.totalVolunteerHour}</td>
                                                <td>{event.totalTravelHour}</td>
                                                <td>{event.overallVolunteerHour}</td>
                                                <td>{event.livesImpacted}</td>
                                                <td>{event.status}</td>
                                                <td>{event.activityType}</td>

                                            </tr>

                                        )) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Reports;