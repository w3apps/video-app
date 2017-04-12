import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import FavoriteButton from '../favorite-button/favorite-button';

import './video-list.scss';

/**
 * Render a grid with videos. It takes a 'video' prop which makes this component reusable for both
 * the search page and my-videos page.
 * The video item has: thumbnail, title (with link to YouTube), channel/user, viewCount, upVotes
 * and Save to Favorites button.
 */
export default class VideoList extends Component {
    render () {
        return (
            <div className="VideoList">
                {
                    this.props.videos.map((video) => {
                        return (
                            <Paper className="VideoContainer" key={video.id.videoId} zDepth={2}>
                                <FavoriteButton className="VideoFavBtn" video={video} />
                                <img className="VideoThumbnail" src={video.snippet.thumbnails.medium.url} />
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                    target="_blank"
                                    className="VideoTitle"
                                >
                                    {video.snippet.title}
                                </a>
                                <h4 className="VideoChannel">{video.snippet.channelTitle}</h4>
                                {/*Initially the statistics object is not available as it's fetched from a different API call*/}
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
                            </Paper>
                        );
                    })
                }
            </div>
        )
    }
}
