import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./style.css";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: ""
        };
    }
    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = e => {
        e.preventDefault();

        const { username, password } = this.state;

        axios
            .post("/api/auth/login", { username, password })
            .then(result => {
                localStorage.setItem("jwtToken", result.data.token);
                this.setState({ message: "" });

                window.location.reload();
                this.props.history.push("/");
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.setState({
                        message:
                            "Login failed. Username and password do not match"
                    });
                }
            });
    };

    render() {
        const { username, password, message } = this.state;
        const enabled = username.length > 0 && password.length > 0;
        return (
            <div className="new">
                <div className="title">taskApp.</div>
                <br />
                <br />
                <Paper style={{ width: 300, align: "center" }}>
                    <div className="login">
                        <h3> Login </h3>

                        {message !== "" && <div role="alert">{message}</div>}

                        <TextField
                            autoComplete="off"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                        />

                        <br />
                        <br />

                        <TextField
                            autoComplete="off"
                            type="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                        />

                        <br />
                        <br />
                        <Button
                            disabled={!enabled}
                            onClick={this.onSubmit}
                            color="primary"
                        >
                            Login
                        </Button>

                        <h4>
                            Dont have an Account?
                            <Button
                                className="button"
                                style={{ textDecoration: "none" }}
                                component={Link}
                                to="/register"
                            >
                                Register Here
                            </Button>
                        </h4>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Login;
