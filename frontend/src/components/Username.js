import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ButtonAppBar from "./AppBar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    title: {
        fontSize: "30pt"
    }
});
class Username extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        axios.get("/api/items/username").then(res => {
            this.setState({ user: res.data });
        });
    }

    userName() {
        const { classes } = this.props;
        if (this.state.user && this.state.user.length == 0) {
            return;
        } else if (this.state.user) {
            return (
                <Typography className={classes.title}>
                    Welcome {this.state.user.username} !
                </Typography>
            );
        }
    }

    render() {
        const { classes } = this.props;

        return <div>{this.userName()}</div>;
    }
}

Username.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Username);
