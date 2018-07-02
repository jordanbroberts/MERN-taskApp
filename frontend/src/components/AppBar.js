import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddItem from "./AddItem";
import Button from "@material-ui/core/Button";

import "./style.css";

const styles = {
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: 20,
        marginRight: 10
    }
};

class ButtonAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        localStorage.removeItem("jwtToken");
        window.location.reload();
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            aria-owns={open ? "menu-appbar" : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>

                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            <Button
                                className="button"
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                                component={Link}
                                to="/"
                            >
                                Tasks
                            </Button>
                        </Typography>

                        <Button
                            className="button"
                            style={{ textDecoration: "none", color: "white" }}
                            component={Link}
                            to="/overdue"
                        >
                            Overdue
                        </Button>

                        <Button
                            className="button"
                            style={{ textDecoration: "none", color: "white" }}
                            component={Link}
                            to="/deadline"
                        >
                            Closest Deadline
                        </Button>

                        <Button
                            className="button"
                            style={{ textDecoration: "none", color: "white" }}
                            component={Link}
                            to="/complete"
                        >
                            Complete
                        </Button>

                        <Button
                            className="button"
                            style={{ textDecoration: "none", color: "white" }}
                            component={Link}
                            to="/uncomplete"
                        >
                            Uncomplete
                        </Button>

                        <AddItem />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
