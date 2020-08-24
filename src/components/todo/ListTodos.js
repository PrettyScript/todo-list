import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "../todo/AuthenticationService";
import moment from "moment";

class ListToDosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // {
                //     id: 1,
                //     description: "Learn Spring Boot",
                //     done: false,
                //     targetDate: new Date()
                // },
                // {
                //     id: 2,
                //     description: "Become an Expert at React",
                //     done: false,
                //     targetDate: new Date()
                // },
                // {
                //     id: 3,
                //     description: "Go outside",
                //     done: false,
                //     targetDate: new Date()
                // }
            ],
            message: null
        };
    }

    componentDidMount() {
        this.refreshTodos();
        console.log(this.state, "state", this.state.todos, "todos");
    }

    deleteTodoClicked = id => {
        let username = AuthenticationService.getLoggedInUser();
        // console.log(id, username);
        TodoDataService.deleteTodo(username, id)
            .then(res => {
                this.setState({ message: `Delete of todo ${id} Successful` });
                this.refreshTodos();
            })
            .catch();
    };

    updateTodoClicked = id => {
        console.log("update", id);
        this.props.history.push(`/todos/${id}`);
        // let username = AuthenticationService.getLoggedInUser();
        // // console.log(id, username);
        // TodoDataService.deleteTodo(username, id)
        //     .then(res => {
        //         this.setState({ message: `Delete of todo ${id} Successful` });
        //         this.refreshTodos();
        //     })
        //     .catch();
    };

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveAllTodos(username).then(response => {
            console.log(response);
            this.setState({ todos: response.data });
        });
        // .catch(error => {});}
    };

    addTodoClicked = () => {
        console.log("added");
        this.props.history.push(`/todos/-1`);
    };

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && (
                    <div className="alert alert-success">
                        {this.state.message}
                    </div>
                )}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>
                                        {moment(todo.targetDate).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                this.updateTodoClicked(todo.id)
                                            }
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                this.deleteTodoClicked(todo.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row">
                        <button
                            className="btn btn-success"
                            onClick={this.addTodoClicked}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListToDosComponent;
