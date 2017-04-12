import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoList from "../components/video-list/video-list";
import CategoryFilter from '../components/category-filter/category-filter';
import YearFilter from '../components/year-filter/year-filter';
import { getVisibleVideos } from '../selectors/selectors';

class MyVideos extends Component {

    render () {
        return (
            <section>
                <div className="FiltersContainer">
                    <CategoryFilter videos={this.props.favoriteVideos} />
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
