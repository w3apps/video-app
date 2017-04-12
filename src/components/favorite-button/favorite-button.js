import React, { Component } from 'react';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveVideoToFavorites, removeVideoFromFavorites } from '../../store/action-creators';

class FavoriteButton extends Component {

    isVideoFavorite = (video) => {
        // TODO: map the videos in an object with the videoId as the key to avoid looping
        return this.props.favoriteVideos.some((item) => {
            return (item.id.videoId === video.id.videoId);
        });
    }

    handleSave = (video) => {
        console.log('nice', video);
        if (this.isVideoFavorite(video)) {
            this.props.removeVideoFromFavorites(video);
        }
        else {
            this.props.saveVideoToFavorites(video);
        }
    }


    render () {
        console.log('in render', this.isVideoFavorite(this.props.video));
        return (
            <div className={this.props.className} onClick={() => this.handleSave(this.props.video)}>
                {
                    this.isVideoFavorite(this.props.video) ? <ActionFavorite  /> : <ActionFavoriteBorder  />
                }
            </div>
        )
    }
}


export default connect(
    (state) => ({
        favoriteVideos: state.favoriteVideos,
    }),
    (dispatch) => bindActionCreators({
        saveVideoToFavorites,
        removeVideoFromFavorites,
    }, dispatch),
)(FavoriteButton);
