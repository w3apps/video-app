import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from '../components/search/search'
import VideoList from "../components/video-list/video-list";
import CategoryFilter from '../components/category-filter/category-filter';
import YearFilter from '../components/year-filter/year-filter';
import { getVisibleVideos } from '../selectors/selectors';

class Home extends Component {

    render () {
        return (
            <section>
                <Search />

                <div className="FiltersContainer">
                    <CategoryFilter videos={this.props.searchedVideos} />
                    <YearFilter videos={this.props.searchedVideos} />
                </div>

                <VideoList videos={this.props.visibleVideos} />
            </section>
        )
    }
}

export default connect(
    (state) => ({
        searchedVideos: state.searchedVideos,
        visibleVideos: getVisibleVideos(state, 'searchedVideos')
    }),
)(Home);