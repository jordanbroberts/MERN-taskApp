import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./style.css";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

class Create extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
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
            .post("/api/auth/register", { username, password })
            .then(result => {
                this.props.history.push("/login");
            });
    };

    render() {
        const { username, password } = this.state;
        const enabled = username.length > 0 && password.length > 0;
        return (
            <div className="new">
                <div className="title">taskApp.</div>
                <br />
                <br />
                <Paper style={{ width: 300, align: "center" }}>
                    <div className="login">
                        <h3> Create an Account </h3>

                        <TextField
                            autoComplete="off"
                            size="90em"
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
                            Create
                        </Button>

                        <h4>
                            Already have an Account?
                            <Button
                                className="button"
                                style={{ textDecoration: "none" }}
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                        </h4>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Create;
