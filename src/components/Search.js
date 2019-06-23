import React from 'react'
import Playlist from './Playlist'

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            preview: false
        }
    }

    queryChanged = (event) => {
        this.setState({
            query: event.target.value
        })
    };

    previewPlaylist = (userId, playlistName, playlistId) => {
        const id = userId + "-" + playlistId;
        console.log("Playlist id is " + id);
        this.setState({
            preview: true,
            playlistName: playlistName,
            url: `https://open.spotify.com/embed/user/${userId}/playlist/${playlistId}`,
            playlistId: id
        })
    };

    back = () => {
        this.setState({
            preview: false,
            playlistName: "",
            url: "",
            playlistId: "",
        })
    };

    render() {
        return(
            <ul className="list-group">
                {
                    !this.state.preview &&
                    <li key="main" className="list-group-item mt-2">
                        <div>
                            <div className="text-center">
                                <h2>Search for playlists</h2>
                            </div>
                            <div className="input-group">
                                <input
                                    id="search" type="text" className="form-control"
                                    placeholder="Enter names or keywords"
                                    value={this.state.query}
                                    onChange={this.queryChanged}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => this.props.searchPlaylists(this.state.query)}>Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                }
                {
                    this.state.preview &&
                    <li key="main" className="list-group-item">
                        <div className="row">
                            <button className="btn btn-primary float-left"
                                    onClick={this.back}>
                                <i className="fa fa-arrow-left"></i>
                            </button>
                            <div className="text-center col-11 mt-2">
                                <h2>{this.state.playlistName}</h2>
                            </div>
                            {
                                !this.props.savedPlaylists.includes(this.state.playlistId) &&
                                <button className="btn btn-primary float-right"
                                        onClick={() => this.props.addPlaylist(this.state.playlistId)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            }
                            {
                                this.props.savedPlaylists.includes(this.state.playlistId) &&
                                <button className="btn btn-primary float-right"
                                        onClick={() => this.props.deletePlaylist(this.state.playlistId)}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            }
                        </div>
                    </li>
                }
                {
                    !this.state.preview && this.props.playlists && this.props.playlists.length > 0 &&
                    <div className="row mt-3" align="center">
                        {
                            this.props.playlists.map(playlist =>
                                <div key={playlist.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                                    <Playlist playlist={playlist} previewPlaylist={this.previewPlaylist}/>
                                </div>
                            )
                        }
                    </div>
                }
                {
                    this.state.preview &&
                    <div className="row mt-3" align="center">
                        <div className="card w-100 h-100">
                            <iframe src={this.state.url} width="300" height="550" frameborder="0" allowtransparency="true" allow="encrypted-media" className="w-100 playlist"></iframe>
                        </div>
                    </div>
                }
            </ul>
        )
    }

}