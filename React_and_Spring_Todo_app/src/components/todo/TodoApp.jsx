import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import withNavigation from "./WithNavigation";
import withParams from "./withParams";
import AuthenticationService from "./AuthenticationService.js"
import AuthenticatedRoute from "./AuthenticatedRoute"
import LoginComponent from "./LoginComponent";
import ListToDoComponent from "./ListToDoComponent";
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent";
import WelcomeComponent from "./WelcomeComponent";
import LogoutComponent from "./LogoutComponent";
import ErrorComponent from "./ErrorComponent";
import TodoComponent from "./TodoComponent";



class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListToDoComponent);
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));

        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />

                        {/* <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} /> */}

                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                                <WelcomeComponentWithParams />
                            </AuthenticatedRoute>
                        } />

                        <Route path="/todos/:id" element={ 
			            	<AuthenticatedRoute>
			            		<TodoComponentWithParamsAndNavigation />
			            	</AuthenticatedRoute>
			            } />
                        
                        {/* <Route path="/todos" element={<ListToDoComponent />} /> */}

                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <ListToDoComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path="/todos/" element={
                            <AuthenticatedRoute>
                                <ListTodosComponentWithNavigation />
                            </AuthenticatedRoute>
                        } />


                        {/* <Route path="/logout" element={<LogoutComponent />} /> */}

                        <Route path="/logout" element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />


                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </Router>

                {/* <LoginComponent/>
                <WelcomeComponent/> */}
            </div>
        );
    }
}



export default TodoApp;
