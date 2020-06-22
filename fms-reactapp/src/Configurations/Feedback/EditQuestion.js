import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../Common/header';


class EditQuestion extends Component {

    answerinput = React.createRef;

    constructor(props) {

        super(props);
        console.log(props);

        this.state = {
            feedbackTypeList: [],
            values: [{ value: null }],
            question: {},
            questionId: props.location.questionId,
            isAddAnswer: false,
            values: [],
            pageRedirect: false,
            answerCount: 0,
            feedbackId: 0
        };

        this.answerRef = React.createRef();

        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
        this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
        this.onSubmitAnswers = this.onSubmitAnswers.bind(this);
    }



    componentDidMount() {
        console.log("inside component did mount");
        this.getQuestionByQuestionId();
        this.getFeedbackTypes();
    }

    getQuestionByQuestionId() {
        axios.get("http://localhost:8080/question/" + this.state.questionId).then((res) => {
            console.log("answerCount" + res.data.answers.length)
            console.log(res.data);
            this.setState({
                question: res.data,
                answerCount: res.data.answers.length,
                feedbackId: res.data.feedbackType.feedbackId,
            })
            //on success

            
        }).catch((error) => {
            
            this.setState({
                pageRedirect: true
            })
        });
    }
    getFeedbackTypes() {
        axios.get("http://localhost:8080/feedbackType").then((res) => {

            console.log(res.data);
            //on success
            this.setState({

                feedbackTypeList: res.data
            });
        }).catch((error) => {

            alert("There is an error in API call.");
        });
    }

    handleRadioButtonChange = (e) => {
        console.log(e.target.value)
        this.setState({
            feedbackId: e.target.value
        })
    }



    onDeleteAnswer(e) {
        e.preventDefault();
        console.log(e.target.value);
        const answerId = e.target.value;

        console.log(this.state.question);
        this.setState({
            question: this.state.question.answers.filter(answer =>
                answer.answerId != answerId
            ),
            answerCount: this.state.question.answers.length - 1
        });
        axios.delete("http://localhost:8080/answer/" + answerId).then(res=>{
            console.log(this.state.question);
        this.getQuestionByQuestionId();
        });
        
    }

    onDeleteQuestion(e) {
        e.preventDefault();
        axios.delete("http://localhost:8080/question/" + this.state.questionId).then(() =>{
            this.setState({
                pageRedirect: true
            })
        });

    }



    handleChange(i, event) {
        let values = [...this.state.values];
        values[i].value = event.target.value;
        console.log(values);
        this.setState({ values });
    }


    onSubmitAnswers(e) {
        e.preventDefault();
        const answerlist = {
            answerList: this.state.values.map((answer) => ({
                answerName: answer.value,
                questionId: this.state.questionId
            })),
            feedbackId:this.state.feedbackId
        };
        console.log(answerlist);
        axios.patch("http://localhost:8080/answer/saveall/"+this.state.questionId, answerlist).then((res) => {
            console.log(res.data);
            this.setState({
                pageRedirect: true
            })
        });
    }

    addClick(e) {
        e.preventDefault();
        console.log("a");
        this.setState({
            isAddAnswer: true
        })
        this.setState(prevState => ({

            values: [...prevState.values, { value: null }]
        }));
    }

    render() {
        const { feedbackTypeList = [] } = this.state;
        const { question = {} } = this.state;
        const { isAddAnswer = false } = this.state;
        console.log("inside render answercount" + this.state.answerCount)
        if (this.state.pageRedirect) {
            return <Redirect to="/questioninfo" />
        }

        return (
            <>
            <Header />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header text-white" style={{backgroundColor:"#0000a7"}}>Edit Question: {question.questionName}</div>
                        <div className="card-body">

                            <form onSubmit={(e) => this.onSubmitAnswers(e)}>
                                <div className="row">
                                    <div className="col">Feedback Type</div>

                                    {feedbackTypeList ? feedbackTypeList.map(feedbackTypeList => (
                                        <div className="col" key={feedbackTypeList.feedbackId}>
                                            <label>
                                                <input type="radio" value={feedbackTypeList.feedbackId}
                                                    checked={feedbackTypeList.feedbackId == this.state.feedbackId }
                                                    onChange={this.handleRadioButtonChange} />
                                                {feedbackTypeList.feedbackType}

                                            </label>
                                        </div>

                                    ))

                                        : null
                                    }

                                </div>

                                <div className="row">
                                    <div className="col-3"> Question</div>
                                    <div>
                                        <input type="text" value={question.questionName || ''} style={{ width: "400px" }} readOnly />
                                    </div>

                                </div>

                                {
                                    question.answers ? question.answers.map((answer, i) =>

                                        <div className="row" key={answer.answerId}>
                                            <div className="col-3 my-2"> Answer {i + 1}</div>
                                            <div>
                                                <input type="text" className="my-2" value={answer.answerName || ''} style={{ width: "400px" }} readOnly />
                                            </div>
                                            <button className="btn btn-success ml-3 my-2" value={answer.answerId} onClick={this.onDeleteAnswer}>Delete Answer</button>

                                        </div>
                                    ) : null
                                }

                                {isAddAnswer ? this.state.values.map((el, i) => (

                                    <div className="row" key={this.state.answerCount + (i + 1)}>
                                        <div className="col-3 my-2"> Answer {this.state.answerCount + (i + 1)}</div>
                                        <div>
                                            <input type="text" className="my-2 border-primary" placeholder="Description (Required)" value={el.value || ""}
                                                onChange={e => this.handleChange(i, e)} style={{ width: "400px" }} />
                                        </div>
                                    </div>
                                )) : null}



                                <button className="btn btn-success" onClick={e => this.addClick(e)}>Add Answer</button>


                                <div className="row">
                                    <div className="col-3"></div>
                                    <div className="col-">
                                        <input type="submit" value="Save" className="btn w-5 text-white" style={{backgroundColor:"#0000a7"}} />
                                    </div>
                                    <div className="col">
                                        <Link to={"/questioninfo"} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-success" onClick={this.onDeleteQuestion}>Delete</button>
                                    </div>
                                </div>

                            </form>


                        </div>

                    </div>
                </div>
            </>)
    }
}

export default EditQuestion;