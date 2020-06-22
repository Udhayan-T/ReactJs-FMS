import React, { Component } from 'react';

class Header extends Component {

    logout = (e) => {
        localStorage.clear();

    }

    render() {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('currentUser');
        const roletype = localStorage.getItem('roletype');
        console.log(localStorage.getItem('username'));

        return (
            <>
                {token ?
                    <div className="container" style={{ marginBottom: "80px" }}>
                        <nav className="navbar navbar-expand-md navbar-dark fixed-top nav-bar-custom text-white" style={{ backgroundColor: "#0000a7" }}>
                            <a className="navbar-brand" href="#">
                                <i className="fa fa-cubes nav-logo" aria-hidden="true"></i><b>Outreach </b>
                                <span className="label-FMS">FMS</span></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="navbarCollapse">
                                <ul className="navbar-nav mr-auto navbar-custom ">
                                    <li className="nav-item active ">
                                        <div className="row">
                                            <i className="fa fa-th-large icon-nav mt-3 ml-4" aria-hidden="true"></i>
                                            <a className="nav-link nav-link-custom text-white mt-1 mr-4" href="/dashboard">Dashboard</a>
                                        </div>
                                    </li>
                                    <li className="nav-item active">
                                        <div className="row">
                                            <i className="fa fa-rocket icon-nav mt-3 ml-4" aria-hidden="true"></i>
                                            <a className="nav-link nav-link-custom text-white mt-1 mr-4" href="/events">Events</a>
                                        </div>
                                    </li>
                                    <li className="nav-item active">
                                        <div className="row">
                                            <i className="fa fa-tachometer icon-nav mt-3 ml-4" aria-hidden="true"></i>
                                            <a className="nav-link nav-link-custom text-white mt-1 mr-4" href="/reports">Reports</a>
                                        </div>
                                    </li>
                                    {roletype == "admin" ? <li className="nav-item dropdown">
                                        <div className="row">
                                            <i className="fa fa-gear icon-nav mt-3 ml-4" aria-hidden="true"></i>

                                            <a className="nav-link dropdown-toggle text-white mt-1 mr-4" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Configuration</a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="/roles">Roles</a>
                                                <a className="dropdown-item" href="/questioninfo">Feedback</a>
                                            </div>
                                        </div>
                                    </li> : null}
                                </ul>
                                <ul className="navbar-nav ml-auto navbar-custom ">
                                    <li className="nav-item dropdown justify-content-end ">
                                        <div className="row">
                                            <i className="fa fa-user-circle-o icon-nav-user mt-3  " aria-hidden="true"></i>
                                            <a className="nav-link dropdown-toggle text-white mt-1 mr-2" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {roletype}</a>
                                            <div className="dropdown-menu mr-1" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="#">{username}</a>
                                                <a className="dropdown-item" onClick={this.logout} href="/">Logout</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </div> : null}
            </>
        )
    }
}

export default Header;
