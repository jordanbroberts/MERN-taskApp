import React, { Component } from "react";
import axios from "axios";
import TableContent from "./TableContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ButtonAppBar from "./AppBar";
import Typography from "@material-ui/core/Typography";

import "./style.css";

const styles = theme => ({
    root: {
        width: "100%",
        overflowX: "fixed"
    },

    table: {
        display: "grid"
    },

    tablec: {
        fontSize: "18pt",
        color: "black"
    },

    title: {
        fontSize: "23pt",
        color: "black",
        margin: 20
    },

    null: {
        fontSize: "13pt",
        color: "black",
        margin: 20
    }
});

class Incomplete extends Component {
    constructor(props) {
        super(props);
        this.state = { item: "" };
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        axios
            .get("/api/items/incomplete")
            .then(res => {
                this.setState({ item: res.data });
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }

    tabRow() {
        const { classes } = this.props;
        if (this.state.item && this.state.item.length == 0) {
            return (
                <Typography className={classes.null}>
                    Nothing to Display
                </Typography>
            );
        } else if (this.state.item) {
            return this.state.item.map(function(object, i) {
                return <TableContent obj={object} key={i} />;
            });
        }
    }
    // code that will execute if condition is false

    render() {
        const { classes } = this.props;

        return (
            <div className="container">
                <ButtonAppBar />

                <Typography variant="title" className={classes.title}>
                    Incomplete
                </Typography>
                <hr />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <tr>
                            <TableCell className={classes.tablec}>
                                Name
                            </TableCell>
                            <TableCell className={classes.tablec} numeric>
                                Description
                            </TableCell>

                            <TableCell
                                className="right"
                                numeric
                                style={{ fontSize: "18pt" }}
                            >
                                DueDate
                            </TableCell>
                        </tr>

                        <TableBody>{this.tabRow()}</TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

Incomplete.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Incomplete);
