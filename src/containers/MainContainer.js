import Main from "../components/Main";
import {connect} from 'react-redux'
import ActionService from '../services/ActionService'
import LoginService from '../services/LoginService'

const actionService = ActionService.getInstance();
const loginService = LoginService.getInstance();

const stateToPropMapper = state => ({
    user: state.user,
    profile: state.profile,
    profileLoaded: state.profileLoaded,
    displayName: state.displayName,
    loggedIn: state.loggedIn,
    loading: state.loading,
    playlists: state.playlists,
    savedPlaylists: state.savedPlaylists
});

const propsToDispatcher = dispatch => ({
    refreshJwt: () => {
        dispatch({ type: "LOADING" });
        loginService
            .refreshJwt()
            .then(user => {
                if (user !== undefined) {
                    dispatch({ type: "LOG_IN", user: user });

                    actionService.getFollows().then(follows => {
                        dispatch({ type: "SET_FOLLOWS", follows: follows });

                        actionService.getPlaylists().then(playlists => {
                            dispatch({ type: "SET_PLAYLISTS", playlists: playlists });
                            dispatch({ type: "LOADING_COMPLETE" });
                        });
                    });

                } else {
                    console.log("Login failed, user is undefined");
                    dispatch({ type: "LOADING_COMPLETE" });
                }
            })
    },
    login: (email, password) => {
        dispatch({ type: "LOADING" });
        loginService
            .login(email, password)
            .then(user => {
                if (user !== undefined) {
                    dispatch({ type: "LOG_IN", user: user });

                    actionService.getFollows().then(follows => {
                        dispatch({ type: "SET_FOLLOWS", follows: follows });

                        actionService.getPlaylists().then(playlists => {
                            dispatch({ type: "SET_PLAYLISTS", playlists: playlists });
                            dispatch({ type: "LOADING_COMPLETE" });
                        });
                    });

                } else {
                    console.log("Login failed, user is undefined");
                    dispatch({ type: "LOADING_COMPLETE" });
                }
            })
    },
    register: (email, displayName, password, role) => {
        dispatch({ type: "LOADING" });
        loginService
            .register(email, displayName, password, role)
            .then(user => {
                if (user !== undefined) {
                    dispatch({ type: "LOG_IN", user: user });

                    actionService.getFollows().then(follows => {
                        dispatch({ type: "SET_FOLLOWS", follows: follows });

                        actionService.getPlaylists().then(playlists => {
                            dispatch({ type: "SET_PLAYLISTS", playlists: playlists });
                            dispatch({ type: "LOADING_COMPLETE" });
                        });
                    });

                } else {
                    console.log("Login failed, user is undefined");
                    dispatch({ type: "LOADING_COMPLETE" });
                }
            })
    },
    updateUser: (userId, email, displayName, password, role) => {
        dispatch({ type: "LOADING" });
        loginService
            .updateUser(userId, email, displayName, password, role)
            .then(user => {
                console.log("RETURNED USER:");
                console.log(user);
                if (user !== undefined) {
                    dispatch({ type: "LOG_IN", user: user });

                    actionService.getFollows().then(follows => {
                        dispatch({ type: "SET_FOLLOWS", follows: follows });

                        actionService.getPlaylists().then(playlists => {
                            dispatch({ type: "SET_PLAYLISTS", playlists: playlists });
                            dispatch({ type: "LOADING_COMPLETE" });
                        });
                    });

                } else {
                    console.log("Login failed, user is undefined");
                    dispatch({ type: "LOADING_COMPLETE" });
                }
            })
    },
    logout: () => {
        dispatch({ type: "LOG_OUT" });
        document.cookie = "jwtToken= ; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    },
    getProfile: userId => {
        dispatch({ type: "HIDE_PROFILE" });
        loginService
            .getProfile(userId)
            .then(profile => {
                dispatch({
                    type: "LOAD_PROFILE",
                    profile: profile
                });
            })
    },
    follow: userId => {
        actionService
            .follow(userId)
            .then(response => {
                if (response) {
                    loginService
                        .getProfile(userId)
                        .then(profile => {
                            dispatch({
                                type: "LOAD_PROFILE",
                                profile: profile
                            });
                        })

                    actionService
                        .getFollows()
                        .then(follows => {
                            dispatch({
                                type: "SET_FOLLOWS",
                                follows: follows
                            });
                        })
                } else {
                    console.log("Follow failed");
                }
            })
    },
    unfollow: userId => {
        actionService
            .unfollow(userId)
            .then(response => {
                if (response) {
                    loginService
                        .getProfile(userId)
                        .then(profile => {
                            dispatch({
                                type: "LOAD_PROFILE",
                                profile: profile
                            });
                        })

                    actionService
                        .getFollows()
                        .then(follows => {
                            dispatch({
                                type: "SET_FOLLOWS",
                                follows: follows
                            });
                        })
                } else {
                    console.log("Unfollow failed");
                }
            })
    },
    searchPlaylists: query => {
        actionService
            .search(query)
            .then(response => {
                dispatch({
                    type: "SEARCH_PLAYLISTS",
                    playlists: response
                });
            })
    },
    addPlaylist: playlistId => {
        actionService
            .addPlaylist(playlistId)
            .then(response => {
                if (response) {
                    actionService
                        .getPlaylists()
                        .then(playlists => {
                            dispatch({
                                type: "SET_PLAYLISTS",
                                playlists: playlists
                            });
                        })
                } else {
                    console.log("addPlaylist failed");
                }
            })
    },
    deletePlaylist: playlistId => {
        actionService
            .deletePlaylist(playlistId)
            .then(response => {
                if (response) {
                    actionService
                        .getPlaylists()
                        .then(playlists => {
                            dispatch({
                                type: "SET_PLAYLISTS",
                                playlists: playlists
                            });
                        })
                } else {
                    console.log("deletePlaylist failed");
                }
            })
    }
});

const MainContainer = connect(
    stateToPropMapper, propsToDispatcher
)(Main);

export default MainContainer