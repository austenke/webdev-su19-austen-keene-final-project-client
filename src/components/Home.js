import React from 'react'

export default class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wrapper bg-primary">
                <div className="gradient">
                </div>
                <div className="main-jumbo jumbotron text-center">
                    <h1 className="display-4">Smoke</h1>
                    <p className="lead">Find new music faster</p>
                    <hr class="my-4"/>
                        <p>Smoke allows you to find playlist curators that match your interests. Instead of
                            following artists, you can explore the world of playlist creation and listen to
                            new music every day!</p>
                        <button className="btn" onClick={() => this.el.scrollIntoView({ behavior: 'smooth' })}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                </div>
                <video muted loop autoplay="autoplay" src={window.location.origin + '/anim.mp4'}></video>
                <div className="container text-center mt-5" ref={el => { this.el = el; }}>
                    <h1 className="display-4 text-white">Trending</h1>
                    <div className="card mt-4 mb-3">
                        <iframe
                            src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWX7rdRjOECPW"
                            width="300" height="380" frameborder="0" allowtransparency="true"
                            allow="encrypted-media" className="w-100 playlist"></iframe>
                    </div>
                </div>
            </div>


        )
    }
}