import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../Common/header';
import _ from 'lodash';

class EventDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event: {},
            eventId: props.location.eventId,
            pocDetails: [],
            feedbackResponses: [],
            pageRedirect: false
        }
    }


    componentDidMount() {
        axios.get("http://localhost:8083/getEvents/" + this.state.eventId).then((res) => {
            console.log(res.data);
            this.setState({
                event: res.data.event,
                pocDetails: res.data.eventEmployeeList,
                feedbackResponses: res.data.feedbackResponses
            })
            //on success


        }).catch((error) => {

            this.setState({
                pageRedirect: true
            })
        });

    }



    render() {
        const event = this.state.event;
        const pocDetails = this.state.pocDetails;
        const feedbackResponses = this.state.feedbackResponses;
        const responseLength = _.groupBy(feedbackResponses, 'employeeId');
        const filteredResponse = _.filter(feedbackResponses, (response) => {
            return response.feedbackType == "participated"
        })
        const feedbackResponseGroup = _.groupBy(filteredResponse, 'employeeId');

        const average = _.filter(feedbackResponses, (response) => { return response.questionId == 1 });
        const averageInt = average.length?_.each(average, item => item.answer = parseInt(item.answer, 10)):0;

        if (this.state.pageRedirect || this.state.eventId == null) {
            return <Redirect to="/events" />
        }

        return (
            <>
                <Header />
                <div className="container-fluid col-sm-12" >
                    {this.roletype == 'ADMIN' ?
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
                                                        <button class="btn btn-light">Send Email</button>
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
                            EVENT & BENIFICIARY DETAILS
                        </div>
                        <div className="card-deck my-3 mx-2">
                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                    <div className="row text-center">
                                        <div className="col">
                                            <p className="card-text ">ID : {event.eventId} </p>
                                        </div>
                                        <div className="col">
                                            <p className="card-text">Date : {event.startDate} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{event.eventName}</h5>
                                    <p className="card-text">{event.description}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="row text-center">
                                        <div className="col">
                                            <span className="card-text"> Status:</span>
                                            <p className="btn btn-success card-text ml-1">{event.status} </p>
                                        </div>
                                        <div className="col">
                                            <p className="card-text">Category: {event.category} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                    <div className="row text-center">
                                        <div className="col">
                                            <p>Location: {event.baseLocation} </p>
                                        </div>
                                        <div className="col">
                                            <p >Council: {event.councilName} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{event.beneficiaryName}</h5>
                                    <p className="card-text">{event.venueAddress}</p>
                                </div>
                                <div className="card-footer text-center ">
                                    <div className="row text-center">
                                        <div className="col">
                                            Feedbacks: <p className="btn w-15 card-text text-white" style={{ backgroundColor: "darkorange" }}>{Object.keys(responseLength).length} </p>
                                        </div>
                                        <div className="col">
                                            <span className="card-text">Average Rating: </span>
                                            <p className="btn w-15 text-white ml-1 card-text" style={{ backgroundColor: "#0000a7" }}>{averageInt.length?Math.floor(_.meanBy(averageInt, 'answer')):0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-deck">
                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>PARTICIPATED</div>
                                {Object.keys(feedbackResponseGroup).map(objkey => <React.Fragment key={objkey}>

                                    <div className="card border-success my-3">
                                        <ul className="list-group list-group-flush" >
                                            {feedbackResponseGroup[objkey].map((response, i) =>

                                                <li className="list-group-item" key={i}>{response.answer}</li>

                                            )}
                                        </ul>
                                    </div>
                                </React.Fragment>)
                                }



                            </div>
                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>NOT PARTICIPATED</div>
                                <div className="card-body">

                                    {feedbackResponses.length ? feedbackResponses.filter(data => (data.feedbackType == "not participated")).map(data => (
                                        <div className="card border-success my-3" key={data.questionId}>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{data.answer}</li>
                                            </ul>
                                        </div>)) : null}

                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>UNREGISTERED</div>
                                <div className="card-body">

                                    {feedbackResponses.length ? feedbackResponses.filter(data => (data.feedbackType == "unregistered")).map((data, i) => (
                                        <div className="card border-success my-3" key={i}>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{data.answer}</li>

                                            </ul>
                                        </div>
                                    )) : null}

                                </div>
                            </div>
                        </div>
                        <div className="card-deck my-3 mx-2">
                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                    STATISTICS
                                </div>
                                <div className="card-body text-center">
                                    <table className="table table-responsive">
                                        <thead>
                                            <tr>
                                                <th>AVERAGE RATING</th>
                                                <th>VOLUNTEERS</th>
                                                <th>VOLUNTEERING HOURS</th>
                                                <th>OVERALL HOURS</th>
                                                <th>TRAVEL HOURS</th>
                                                <th>LIVES IMPACTED</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{averageInt.length?Math.floor(_.meanBy(averageInt, 'answer')):0}</td>
                                                <td>{event.totalVolunteer}</td>
                                                <td>{event.totalVolunteerHour}</td>
                                                <td>{event.overallVolunteerHour}</td>
                                                <td>{event.totalTravelHour}</td>
                                                <td>{event.livesImpacted}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                    POC DETAILS
                                </div>
                                <div className="card-body text-center">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>EMPLOYEE ID</th>
                                                <th>NAME</th>
                                                <th>CONTACT NUMBER</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pocDetails.length ?
                                                pocDetails.map(pocDetail => (
                                                    <tr key={pocDetail.id}>
                                                        <td>1</td>
                                                        <td>{pocDetail.employeeId}</td>
                                                        <td>{pocDetail.employeeName}</td>
                                                        <td>{pocDetail.contactNumber}</td>
                                                    </tr>)) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            </>
        )
    }
}

export default EventDetail;
