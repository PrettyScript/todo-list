import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    loginClicked = () => {
        // if (
        //     this.state.username === "Jessica" &&
        //     this.state.password === "test"
        // ) {
        //     AuthenticationService.registerSuccessfulLogin(
        //         this.state.username,
        //         this.state.password
        //     );
        //     this.props.history.push(`/welcome/${this.state.username}`);
        //     // this.setState({ showSuccessMessage: true });
        //     // this.setState({ hasLoginFailed: false });
        // } else {
        //     console.log("failed");
        //     this.setState({ hasLoginFailed: true });
        //     this.setState({ showSuccessMessage: false });
        // }

        AuthenticationService.executeBasicAuthenticationService(
            this.state.username,
            this.state.password
        )
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(
                    this.state.username,
                    this.state.password
                );
                this.props.history.push(`/welcome/${this.state.username}`);
            })
            .catch(() => {
                console.log("failed");
                this.setState({ hasLoginFailed: true });
                this.setState({ showSuccessMessage: false });
            });
    };

    // handleUsernameChange(e) {
    //     console.log(e.target.value);
    //     this.setState({ [e.target.name]: e.target.value });
    // }

    // handlePassword(e) {
    //     console.log(e.target.value);
    //     this.setState({ password: e.target.value });
    // }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && (
                        <div className="alert alert-warning">
                            Invalid Credentials
                        </div>
                    )}
                    {this.state.showSuccessMessage && (
                        <div>Login Successful</div>
                    )}
                    User Name:{" "}
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    Password:{" "}
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button className="btn btn" onClick={this.loginClicked}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
