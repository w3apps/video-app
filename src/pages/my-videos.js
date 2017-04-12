import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from '../components/search/search'
import VideoList from "../components/video-list/video-list";
import CategoryFilter from '../components/category-filter/category-filter';
import YearFilter from '../components/year-filter/year-filter';
import { getVisibleVideos } from '../selectors/selectors';

class MyVideos extends Component {

    render () {
        return (
            <section>
                <Search />

                <div className="FiltersContainer">
                    <CategoryFilter />
                    <YearFilter videos={this.props.favoriteVideos} />
                </div>

                <VideoList videos={this.props.visibleVideos} />
            </section>
        )
    }
}

export default connect(
    (state) => ({
        favoriteVideos: state.favoriteVideos,
        visibleVideos: getVisibleVideos(state, 'favoriteVideos')
    }),
)(MyVideos);