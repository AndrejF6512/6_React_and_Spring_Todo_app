import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';


class WelcomeComponent extends Component {

    constructor(props) {
        super(props);

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {
            welcomeMessage: '',
            errorMessage: ''
        }
    }
    render() {
        return (
            <div>
                <h1>welcome</h1>

                <div className="container">
                    Welcome {this.props.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>
                </div>

                <div className="container">
                   Click here to get a customised welcome message
                    <button onClick={this.retrieveWelcomeMessage} 
                        className="btn btn-success">Get Welcome Message
                    </button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>

                <div className="container">
                    {this.state.errorMessage}
                </div>

            </div>
        )
    }

    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccessfulResponse(response))

        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))


        HelloWorldService.executeHelloWorlPathVariableService(this.props.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        this.setState({welcomeMessage : response.data.message})
    }

    handleError(error){

        let errorMessage = '';

        if(error.message){
            errorMessage += error.message
        }

        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }

        this.setState({errorMessage : errorMessage})
    }
}

export default WelcomeComponent;