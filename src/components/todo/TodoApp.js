import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./Login";
import ListToDosComponent from "./ListTodos";
import Welcome from "./Welcome";
import Footer from "./Footer";
import Logout from "./Logout";
import ErrorComponent from "./Error";
import TodoComponent from "./TodoComponent";

export default class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute
                            path="/welcome/:name"
                            component={Welcome}
                        />
                        <AuthenticatedRoute
                            path="/todos/:id"
                            component={TodoComponent}
                        />
                        <AuthenticatedRoute
                            path="/todos"
                            component={ListToDosComponent}
                        />
                        <AuthenticatedRoute path="/logout" component={Logout} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}
