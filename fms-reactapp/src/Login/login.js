import React, { Component } from "react";
import Axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();

        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
        this.onsubmit = this.onsubmit.bind(this);
    }
    onsubmit(e) {
        e.preventDefault();

        const user = {
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value
        }

        Axios.post("http://localhost:8082/api/userservice/login", user)
            .then(res => {
                console.log(res);
                localStorage.setItem('currentUser', res.data.token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('roletype', res.data.roletype);
                localStorage.setItem('employeeId', res.data.employeeId);

                this.props.history.push("/dashboard");
            })

    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="card mt-5 col-6 " style={{ border: "none" }}>
                            <div className="card-body">
                                <div className="card-text">
                                    <p className="row no-gutters" style={{ fontSize: "20px" }}> <strong style={{ color: "#0000a7" }}>Cognizant </strong> &nbsp; <p className="text-success">Outreach</p></p>

                                </div>
                                <form onSubmit={this.onsubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" ref={this.usernameRef} placeholder="Username" name="email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg" ref={this.passwordRef} placeholder="Password" name="password" />
                                    </div>
                                    <input type="submit" value="SIGN ME IN" className="btn btn-success btn-block mt-4" />
                                </form>
                            </div>

                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </>
        )
    }
}
export default Login;