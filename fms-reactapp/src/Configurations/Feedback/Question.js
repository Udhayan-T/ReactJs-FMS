import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from '../../Common/header';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionList: []
        };
        this.handleButton = this.handleButton.bind(this);
    }


    handleButton = (e) => {
        console.log(e.target.value);
    }
    componentDidMount() {
        axios.get("http://localhost:8080/question").then((res) => {

            console.log(res.data);
            //on success
            this.setState({

                questionList: res.data
            });
            console.log("hi");
        }).catch((error) => {

            alert("There is an error in API call.");
        });

    }
    render() {
        console.log("hello");
        const { questionList = [] } = this.state;
        return (
            <>
          
                <div className="container-fluid">
                <Header />
                    <div className="card">
                        <div className="card-header text-white" style={{backgroundColor:"#0000a7"}}>FEEDBACK QUESTIONS</div>
                        <div className="w-30 mt-3"><Link to={"/addquestion"} className="btn btn-success float-right mr-3">+Add Question</Link></div>
                        <div className="card-body">
                            <table className="table" >
                                <thead>
                                    <tr className="row">
                                        <th className="col">Questions</th>
                                        <th className="col">Answers</th>
                                        <th className="col">FeedbackType</th>
                                        <th className="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionList.length ?
                                        questionList.map(questionList => (
                                            <tr className="row" key={questionList.questionId}>
                                                <td className="col">{questionList.questionName}</td>
                                                <td className="col">{questionList.answers.length}</td>
                                                <td className="col">{questionList.feedbackType.feedbackType}</td>
                                                <td className="col"><Link className="btn text-white " style={{backgroundColor:"#0000a7"}}
                                                 to={{pathname:"/editquestion",
                                                    questionId:questionList.questionId}} >Edit</Link></td>

                                            </tr>)) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Question;
