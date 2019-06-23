class ActionService {
    static myInstance = null;

    static getInstance() {
        if (ActionService.myInstance == null) {
            ActionService.myInstance =
                new ActionService();
        }
        return this.myInstance;
    }

    search = query => {
        return fetch(`http://localhost:8080/api/actions/search/${query}`, {
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got search error response code " + response.status);
                return [];
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };

    getFollows = () => {
        return fetch(`http://localhost:8080/api/actions/follows`, {
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got getFollows error response code " + response.status);
                return [];
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };

    follow = userId => {
        return fetch(`http://localhost:8080/api/actions/follow/${userId}`, {
            method: 'POST',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return true;
            } else {
                console.log("Got follow error response code " + response.status);
                return false;
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };

    unfollow = userId => {
        return fetch(`http://localhost:8080/api/actions/unfollow/${userId}`, {
            method: 'POST',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return true;
            } else {
                console.log("Got follow error response code " + response.status);
                return false;
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };

    getPlaylists = () => {
        return fetch(`http://localhost:8080/api/actions/playlists`, {
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Got getPlaylists error response code " + response.status);
                return [];
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };

    addPlaylist = playlistId => {
        return fetch(`http://localhost:8080/api/actions/playlists/${playlistId}`, {
            method: 'POST',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return true;
            } else {
                console.log("Got addPlaylist error response code " + response.status);
                return false;
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };

    deletePlaylist = playlistId => {
        return fetch(`http://localhost:8080/api/actions/playlists/${playlistId}/delete`, {
            method: 'POST',
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return true;
            } else {
                console.log("Got deletePlaylist error response code " + response.status);
                return false;
            }
        }, err => {
            console.log("Got error");
            console.log(err);
        });
    };
}
export default ActionService