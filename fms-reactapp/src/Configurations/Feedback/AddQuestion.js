import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../Common/header';



class AddQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbackTypeList: [],
            selectedType: 0,
            questionName: "",
            pageRedirect: false
        };
        this.questionRef = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    }



    componentDidMount() {
        this.getFeedbackTypes();
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
            selectedType: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const question = {
            questionName: this.questionRef.current.value,
            feedbackId: this.state.selectedType
        }
        console.log(this.questionRef.current.value);
        axios.post("http://localhost:8080/question", question).then((res) => {
            console.log(res.data);
            this.setState({
                pageRedirect: true
            })
        });
    }

    render() {
        const { feedbackTypeList = [] } = this.state;
        if (this.state.pageRedirect) {
            return <Redirect to="/questioninfo" />
        }

        return (
            <>
            <Header />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header text-white" style={{backgroundColor:"#0000a7"}}>Add question</div>
                        <div className="card-body">

                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col">Feedback Type</div>

                                    {feedbackTypeList ? feedbackTypeList.map(feedbackTypeList => (
                                        <div className="col" key={feedbackTypeList.feedbackId}>
                                            <label>
                                                <input type="radio" value={feedbackTypeList.feedbackId}
                                                    checked={this.state.selectedType == feedbackTypeList.feedbackId}
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
                                        <input type="text" placeholder="Description(required)" ref={this.questionRef} className="ml-3 border-primary" style={{ width: "400px" }} />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-3"></div>
                                    <div className="col-3">
                                        <input type="submit" value="Save" className="btn w-5 text-white mt-3" style={{backgroundColor:"#0000a7"}} />
                                    </div>
                                    <div className="col">
                                        <Link to={"/questioninfo"} className="btn btn-secondary mt-3">Cancel</Link>
                                    </div>
                                </div>

                            </form>


                        </div>

                    </div>
                </div>
            </>)
    }
}

export default AddQuestion;