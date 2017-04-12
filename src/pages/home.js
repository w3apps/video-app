import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from '../components/search/search'
import VideoList from "../components/video-list/video-list";

class Home extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('home', nextProps.searchedVideos);
    }

    render () {
        return (
            <section>
                <Search />

                <VideoList videos={this.props.searchedVideos} />
            </section>
        )
    }
}

export default connect(
    (state) => ({
        searchedVideos: state.searchedVideos,
    }),
)(Home);