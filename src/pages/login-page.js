import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            user: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

   
  


    createUser() {
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        return user;
    }

   

    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleSubmit(event) {
        event.preventDefault()
        axios.post('https://js-backend-capstone.herokuapp.com/login', this.createUser())
        .then((response) => {

            if (response.data.token) {
                this.setState({
                    user: response.data.token
                })
            } 

        }).catch((error) => {
            console.log(error);
        });
    }

  
    render() {
        return (
            <div>
                <h1>Personal Todo List login</h1>

                <div>{this.state.errorText}</div>

                <form className="margin" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input 
                        type="username"
                        name="username"
                        placeholder="Your username"
                        onChange={this.handleChange}
                        // defaultvalue={this.state.username}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                        type="password"
                        name="password"
                        placeholder="Your password"
                        onChange={this.handleChange}
                        // defaultvalue={this.state.password}
                        />
                    </div>
                        <button className="btn"  type="submit">
                            Login
                        </button>
                </form>
                {this.state.user && <Navigate to='/main' replace={true} />}
            </div>
        )
    }
}

export default Login;