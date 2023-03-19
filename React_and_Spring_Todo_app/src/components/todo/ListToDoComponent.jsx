import React, { Component } from 'react';
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js"
import TodoComponent from "./TodoComponent"
import moment from 'moment';

class ListToDoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null,
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount(){
      this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodo(username)
        .then(
            response => {
                console.log(response.data)
                this.setState({
                    todos: response.data
                })
            }
        )
    }

    addTodoClicked(){
        this.props.navigate('/todos/-1')
    }

    updateTodoClicked(id){
        this.props.navigate(`/todos/${id}`)
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message : `Deleted todo id ${id} successfully`})
                this.refreshTodos();
            }
        )
    }


    render() {
        return (
            <div>
                <h1>List Todo</h1>
                {
                    this.state.message && <div className="alert alert-success">
                    {this.state.message}
                </div>
                }
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target date</th>
                                <th>Is Completed</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todos =>
                                        <tr key={todos.id}>
                                            <td>{todos.description}</td>
                                            <td>{moment(todos.targetDate).format('DD-MM-YYYY')}</td>
                                            <td>{todos.done.toString()}</td>
                                            <td>
                                                <button className="btn btn-success"onClick={() => this.updateTodoClicked(todos.id)}>Update</button>
                                            </td>

                                            <td>
                                                <button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todos.id)}>Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListToDoComponent;

