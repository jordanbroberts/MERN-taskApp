import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import IndexItem from "./components/IndexItem";
import EditItem from "./components/EditItem";
import UnComplete from "./components/UnComplete";
import CompleteItem from "./components/Complete";
import Overdue from "./components/Overdue";
import Deadline from "./components/Deadline";
import Username from "./components/Username";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="box">
                <div className="username">
                    <Username />
                </div>

                <Router>
                    <div>
                        <Route exact path="/" component={IndexItem} />
                        <Route exact path="/api/:id" component={EditItem} />
                        <Route
                            exact
                            path="/uncomplete"
                            component={UnComplete}
                        />
                        <Route
                            exact
                            path="/complete"
                            component={CompleteItem}
                        />
                        <Route exact path="/deadline" component={Deadline} />
                        <Route exact path="/overdue" component={Overdue} />

                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
