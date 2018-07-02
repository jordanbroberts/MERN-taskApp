import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/ModeEdit";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import moment from "moment";

import axios from "axios";

import "./style.css";

const styles = theme => ({
    tablec: {
        fontSize: "8pt",
        color: "black"
    }
});

class TableContent extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        axios
            .put("api/items/iscomplete/" + this.props.obj._id)
            .then()
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });

        window.location.reload();
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        axios
            .delete("api/items/delete/" + this.props.obj._id)
            .then()
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });

        window.location.reload();
    }

    render() {
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell className="name" style={{ fontSize: "8pt" }}>
                    {this.props.obj.name}
                </TableCell>
                <TableCell className="rightcont" style={{ fontSize: "8pt" }}>
                    {this.props.obj.task}
                </TableCell>

                <TableCell className="rightcont" style={{ fontSize: "8pt" }}>
                    {moment(this.props.obj.duedate).calendar()}
                </TableCell>

                <TableCell className={classes.padding}>
                    <Button
                        variant="fab"
                        type="submit"
                        className="button"
                        style={{ textDecoration: "none" }}
                        component={Link}
                        to={"/api/" + this.props.obj._id}
                    >
                        <EditIcon />
                    </Button>
                </TableCell>

                <TableCell className={classes.padding}>
                    <form onSubmit={this.handleSubmit}>
                        <Button variant="fab" type="submit">
                            <DeleteIcon />
                        </Button>
                    </form>
                </TableCell>

                <TableCell className={classes.padding}>
                    <div className="complete">{this.props.obj.complete}</div>

                    <br />

                    <form onSubmit={this.onSubmit}>
                        <Button size="small" type="submit">
                            Mark as Complete
                        </Button>
                    </form>
                </TableCell>
            </TableRow>
        );
    }
}

TableContent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableContent);
