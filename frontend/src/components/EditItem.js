import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ButtonAppBar from "./AppBar";
import "./style.css";
import Paper from "@material-ui/core/Paper";

class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            name: "",
            task: "",
            duedate: ""
        };
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        axios
            .get("/api/items/find/" + this.props.match.params.id)
            .then(response => {
                this.setState({ item: response.data });
                this.setState({
                    name: this.state.item.name,
                    task: this.state.item.task,
                    duedate: this.state.item.duedate
                });
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }

    onChange = e => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        this.setState({ [e.target.name]: e.target.value });
    };

    onCancel = e => {
        this.props.history.push("/");
    };

    onSubmit = e => {
        e.preventDefault();
        // get our form data out of state
        const { name, task, duedate } = this.state;

        axios
            .put("items/update/" + this.props.match.params.id, {
                name,
                task,
                duedate
            })
            .then()
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });

        setTimeout(
            function() {
                this.props.history.push("/");
            }.bind(this),
            1000
        );
    };

    render() {
        const { name, task, duedate } = this.state;

        return (
            <div>
                <ButtonAppBar />
                <br />

                <div className="new">
                    <Paper style={{ width: 300 }}>
                        <div className="edit">
                            <h3> Edit Task </h3>

                            <TextField
                                name="name"
                                label="Task Name"
                                onChange={this.onChange}
                                value={name}
                                fullWidth
                            />

                            <br />
                            <br />

                            <TextField
                                fullWidth
                                label="Task Description"
                                name="task"
                                onChange={this.onChange}
                                value={task}
                                multiline
                                rows={3}
                            />

                            <br />
                            <br />
                            <TextField
                                name="duedate"
                                value={duedate}
                                onChange={this.onChange}
                                type="date"
                            />

                            <br />
                            <br />
                            <Button onClick={this.onSubmit} color="primary">
                                Save Changes
                            </Button>
                            <Button onClick={this.onCancel} color="primary">
                                Cancel
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default EditItem;
