import React, { Component } from 'react';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveToStorage } from '../../utils/storage';
import { saveVideoToFavorites, removeVideoFromFavorites } from '../../store/action-creators';

/**
 * Component that renders a Favorite button.
 * When Clicked it save the video to state and localStorage.
 * When Clicked again it removes the video.
 * It shows a different icon for Favorite videos.
 */
class FavoriteButton extends Component {

    componentWillReceiveProps(nextProps) {
        // if favoriteVideos changes, update localStorage
        saveToStorage('favoriteVideos', nextProps.favoriteVideos);
    }

    /**
     * Method used to check if a video is Favorite or not.
     * @param video
     * @returns {boolean}
     */
    isVideoFavorite = (video) => {
        // TODO: map the videos in an object with the videoId as the key in order to avoid looping
        return this.props.favoriteVideos.some((item) => {
            return (item.id.videoId === video.id.videoId);
        });
    }

    /**
     * Method triggered when the button is clicked.
     * It the video is already Favorite, it triggers the 'removeVideoFromFavorites' action creator.
     * @param video
     */
    handleSave = (video, isFav) => {
        if (isFav) {
            this.props.removeVideoFromFavorites(video);
        }
        else {
            this.props.saveVideoToFavorites(video);
        }
    }

    render () {
        const isFav = this.isVideoFavorite(this.props.video); // store the favorite status of the button

        return (
            <div className={this.props.className} onClick={() => this.handleSave(this.props.video, isFav)}>
                {
                    isFav ? <ActionFavorite  /> : <ActionFavoriteBorder  />
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
