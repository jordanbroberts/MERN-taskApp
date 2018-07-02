import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./style.css";

class AddItem extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            task: "",
            duedate: ""
        };
    }

    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange = e => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        window.location.reload();
        // get our form data out of state
        const { name, task, duedate } = this.state;

        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        axios
            .post("/api/items/add/post", { name, task, duedate })
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    };

    render() {
        const { name, task, duedate } = this.state;
        const enabled =
            name.length > 0 && task.length > 0 && duedate.length > 0;

        return (
            <div>
                <Button variant="fab" onClick={this.handleClickOpen}>
                    <AddIcon />
                </Button>

                <Dialog
                    fullWidth={true}
                    maxWidth={"xs"}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Add Task</DialogTitle>

                    <DialogContent>
                        <TextField
                            autoComplete="off"
                            fullWidth
                            label="Name"
                            name="name"
                            value={name}
                            onChange={this.onChange}
                            autoFocus
                            placeholder="e.g. Learn Python"
                        />
                        <br />
                        <br />

                        <TextField
                            fullWidth
                            label="Description"
                            name="task"
                            value={task}
                            onChange={this.onChange}
                            multiline
                            rows={3}
                            placeholder="e.g. Python Components and Seleium"
                        />

                        <br />
                        <br />

                        <TextField
                            id="Due Date"
                            name="duedate"
                            value={duedate}
                            onChange={this.onChange}
                            type="date"
                        />

                        <br />
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                        <Button
                            onClick={this.onSubmit}
                            disabled={!enabled}
                            color="primary"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddItem;
