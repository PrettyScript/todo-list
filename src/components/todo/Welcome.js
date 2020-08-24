import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage: "",
            beanMessage: ""
        };
    }
    retrieveWelcomeMessage = () => {
        // HelloWorldService.executeHelloWorldService().then(res =>
        //     this.handleSuccessfulResponse(res)
        // );
        // HelloWorldService.executeHelloWorldBeanService().then(res =>
        //     this.handleSuccessfulResponse(res)
        // );
        HelloWorldService.executeHelloWorldPathService(
            this.props.match.params.name
        )
            .then(res => this.handleSuccessfulResponse(res))
            .catch(error => this.handleError(error));
    };

    handleSuccessfulResponse = response => {
        console.log(response);
        this.setState({ welcomeMessage: response.data.message });
    };

    handleError = error => {
        console.log(error.response);
        let errorMessage = "";
        if (error.message) {
            errorMessage += error.message;
        }

        if (error.response && error.response.message) {
            errorMessage += error.response.data.message;
        }

        this.setState({ welcomeMessage: errorMessage });
    };

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    <p>Welcome {this.props.match.params.name}</p>
                    <p>
                        You can manage your todos <Link to="/todos">here</Link>
                    </p>
                </div>
                <div className="container">
                    <p>Click here to get a customized welcome message</p>
                    <button onClick={this.retrieveWelcomeMessage}>
                        Get Welcome Message
                    </button>
                </div>
                <div className="container">{this.state.welcomeMessage}</div>
            </div>
        );
    }
}

export default Welcome;
