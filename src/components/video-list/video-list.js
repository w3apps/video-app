import React, { Component } from 'react';

import FavoriteButton from '../favorite-button/favorite-button';

import './video-list.scss';

export default class VideoList extends Component {
    render () {
        console.log('hmmmm', this.props.videos);
        return (
            <div className="VideoList">
                {
                    this.props.videos.map((video) => {
                        return (
                            <div className="VideoContainer" key={video.id.videoId}>
                                <FavoriteButton className="VideoFavBtn" video={video} />
                                <img className="VideoThumbnail" src={video.snippet.thumbnails.medium.url} />
                                <h3 className="VideoTitle">{video.snippet.title}</h3>
                                <h4 className="VideoChannel">{video.snippet.channelTitle}</h4>
                                {
                                    video.statistics ?
                                        (
                                            <div className="VideoStatistics">
                                                <div className="VideoCount">{video.statistics.viewCount} views</div>
                                                <div className="VideoLikes">{video.statistics.likeCount} likes</div>
                                            </div>
                                        )
                                    : null
                                }
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}
