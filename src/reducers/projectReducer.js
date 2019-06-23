const projectReducer = (state={
    user: {}, profile: {}, profileLoaded: false, displayName: "", loggedIn: false, loading: true,
    playlists: [], savedPlaylists: []}, action) => {
    switch (action.type) {
        case 'LOADING_COMPLETE':
            console.log("Loading complete");
            return {
                ...state,
                loading: false
            };
        case 'LOADING':
            console.log("Loading");
            return {
                ...state,
                loading: true
            };
        case 'LOG_IN':
            console.log("Logging in user");
            console.log(action.user);
            return {
                ...state,
                loggedIn: true,
                user: action.user,
                displayName: action.user.displayName
            };
        case 'LOG_OUT':
            console.log("Logging out");
            return {
                ...state,
                loggedIn: false,
                user: {},
                displayName: ""
            };
        case 'SET_FOLLOWS':
            console.log("Setting follows");
            console.log(action.follows);
            return {
                ...state,
                user: {
                    ...state.user,
                    follows: action.follows
                }
            };
        case 'HIDE_PROFILE':
            console.log("Hiding profile");
            return {
                ...state,
                profileLoaded: false
            };
        case 'LOAD_PROFILE':
            console.log("Loading profile");
            console.log(action.profile);
            return {
                ...state,
                profile: action.profile,
                profileLoaded: true
            };
        case 'SEARCH_PLAYLISTS':
            console.log("Searching playlists");
            console.log(action.playlists);
            return {
                ...state,
                playlists: action.playlists.playlists.items
            };
        case 'SET_PLAYLISTS':
            console.log("Getting playlists");
            console.log(action.playlists);
            return {
                ...state,
                savedPlaylists: action.playlists
            };
        default:
            return state;
    }
};

export default projectReducer