import React from 'react'

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import Nav from './Nav'
import Search from './Search'
import Home from './Home'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.props.refreshJwt();
    }

    render() {
        return (
            <div className="bg-primary contentContainer h-100">
                {
                    !this.props.loading &&
                    <Router>
                        <Nav {...this.props} />
                        <Route
                            exact path="/"
                            render={() => <Home {...this.props} />}/>

                        <div className="container mt-2">
                            <div className="container">
                                <Route
                                    exact path="/profile/:profileId"
                                    render={() => <Profile {...this.props} />}/>
                                {
                                    this.props.loggedIn &&
                                    <Route
                                        exact path="/profile"
                                        render={() => <Profile {...this.props} />}/>
                                }
                                {
                                    !this.props.loggedIn &&
                                    <Route
                                        exact path="/profile"
                                        render={() => <Redirect to="/" />}/>
                                }
                                <Route
                                    exact path="/login"
                                    render={() => <Login {...this.props} />}/>
                                <Route
                                    exact path="/search"
                                    render={() => <Search {...this.props} />}/>
                            </div>
                        </div>
                    </Router>
                }
            </div>
        )
    }
}

