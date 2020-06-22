import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class NotParticipated extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackQuestionList: [],
            isClicked: false,
            answerClicked:"",
            pageRedirect:false
        }
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onReset=this.onReset.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidMount() {

        Axios.get("http://localhost:8080/question/feedback/not participated").then(res => {
            console.log(res.data)
            this.setState({
                feedbackQuestionList: res.data
            })

        })
    }

    onButtonClick(e) {
        console.log(e.target.value);
        const answerSelected=e.target.value;
        console.log(this.state.isClicked);
        this.setState({
            isClicked: true,
            answerClicked:answerSelected
        })
    }

    onReset(){
        this.setState({
            isClicked: true,
            answerClicked:""
        })
    }

    onSubmit(){
        console.log("submit"+ this.state.answerClicked);
        const responseList=[{
            "questionId":this.state.feedbackQuestionList[0].questionId,
            "answer":this.state.answerClicked,
            "feedbackType":"unregistered",
            "eventId":"EVNT00047261",
            "employeeId":"456789"
        }]
        Axios.post("http://localhost:8080/feedbackresponse",responseList).then(res=>{
        this.setState({
            pageRedirect:true
        })
    }).catch((error)=>{
console.log(error.response.status)
        if(error.response.status==409)
        alert('You have already submitted the response');
    })
    }

    render() {
        const feedbackQuestionList = this.state.feedbackQuestionList;
        console.log(this.state.answerClicked);
        console.log(this.state.isClicked);
        console.log(feedbackQuestionList)
        if (this.state.pageRedirect) {
            return <Redirect to="/thanksscreen" />
        }
        return (
            <>
                <div className="container-fluid">
                    <div className="card my-2">
                        <div className="card-body">
                            <p className="card-text text-success text-center">Feedback Request for event</p>
                        </div>
                    </div>
                    {feedbackQuestionList.length ?
                        feedbackQuestionList.map(feedback => (
                            <div className="card" key={feedback.questionId}>
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                    {feedback.questionName}
                                </div>
                                <div className="card-body">
                                    <div className="card-deck">
                                        {feedback.answers.length ? feedback.answers.map(answer => (
                                            <button className=" card text-white justify-content-center" style={{ backgroundColor: (this.state.isClicked && this.state.answerClicked== answer.answerName )? "#620d87" : "black" }} value={answer.answerName} onClick={this.onButtonClick} key={answer.answerId}>
                                                {answer.answerName}
                                            </button>
                                        )) : null}
                                    </div>
                                </div>

                            </div>
                        )) : null}

                        <div className="row float-right my-2">
                            <button className="btn btn-danger mr-1" onClick={this.onReset}>RESET</button>
                            
                            <button className="btn btn-success mr-3" onClick={this.onSubmit}>SUBMIT</button>
                        </div>
                </div>

            </>
        )
    }

}

export default NotParticipated;