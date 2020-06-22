import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { faAngry, faFrown, faGrinHearts, faMeh, faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Participated extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackQuestionList: [],
            isClicked: false,
            answerClicked: "",
            pageRedirect: false,
            response:[{}]
        }
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {

        Axios.get("http://localhost:8080/question/feedback/participated").then(res => {
            console.log(res.data)
            this.setState({
                feedbackQuestionList: res.data
            })

        })
    }

    handleChange(i, e) {
        console.log(e.currentTarget.getAttribute('index'));
     
         const { name, value } = e.currentTarget;
         
         let response = [...this.state.response];
         response[i] = {...response[i], questionId: e.currentTarget.getAttribute('index'),"answer":value,"feedbackType":"participated","eventId":"EVNT00046385","employeeId":"456789"};
         this.setState({ response });
      }

    onReset() {
        this.setState({
            isClicked: true,
            answerClicked: ""
        })
    }

    onSubmit() {
        console.log("submit" + this.state.answerClicked);
        console.log( JSON.stringify(this.state.response));
        Axios.post("http://localhost:8080/feedbackresponse",this.state.response).then((res)=>{
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
                        feedbackQuestionList.map((feedback,i )=> (
                            <div className="card mb-2" key={feedback.questionId}>
                                <div className="card-header text-white" style={{ backgroundColor: "#0000a7" }}>
                                    {feedback.questionName}
                                </div>
                                <div className="card-body">
                                    <div className="card-deck">
                                        {feedback.answers.length ? 
                                        <>
                                            <button  className=" card" value='1' index={feedback.questionId} onClick={this.handleChange.bind(this,i)} style={{ border: "none", color:'#e31b1b', fontSize:"100px" }} >
                                            <FontAwesomeIcon icon={faAngry}/> 
                                                </button>
                                                <button className="card" value='2' index={feedback.questionId} onClick={this.handleChange.bind(this,i)} style={{ border: "none", color:'darkorange', fontSize:"100px"  }} >
                                                <FontAwesomeIcon icon={faFrown}/> 
                                                </button>
                                                <button className="card" value='3'index={feedback.questionId}  onClick={this.handleChange.bind(this,i)} style={{ border: "none", color:'#f16444', fontSize:"100px"  }} >
                                                <FontAwesomeIcon icon={faMeh}/> 
                                                </button>
                                                <button className="card" value='4' index={feedback.questionId} onClick={this.handleChange.bind(this,i)} style={{ border: "none" , color:'green', fontSize:"100px" }} >
                                                <FontAwesomeIcon icon={faSmile}/> 
                                                </button>
                                                <button className="card" value='5'index={feedback.questionId}  onClick={this.handleChange.bind(this,i)} style={{ border: "none", color:'darkgreen', fontSize:"100px"  }}>
                                                <FontAwesomeIcon icon={faGrinHearts}/> 
                                                </button>
                                                </>
                                        : <textarea className="border-success form-control" index={feedback.questionId} onChange={this.handleChange.bind(this,i)}  placeholder="Your thougths here..." />}
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

export default Participated;