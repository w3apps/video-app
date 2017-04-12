import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { applyYearFilter } from '../../store/action-creators';

import './year-filter.scss';

/**
 * Component that renders a slider for selecting a year rage. It's used for applying a year range filter.
 */
class YearFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {}; // avoid state checks later in the code
    }

    componentWillMount() {
        // if there are videos onMount calculate the year range (usually happens for my-videos from localStorage)
        if (this.props.videos) {
            this.calcYears(this.props.videos);
        }
    }

    componentWillReceiveProps(nextProps) {
        // if we get new videos, re-calculate the year range
        if (nextProps.videos.length > 0) {
            this.calcYears(nextProps.videos);
        }
    }

    /**
     * Method used to get the Min and Max years for the current videos.
     * @param videos
     */
    calcYears = (videos) => {
        if (videos) {
            // get the year from the publishedAt date field
            const yearList = videos.map((video) => {
                const date = new Date(video.snippet.publishedAt);
                return date.getFullYear();
            });

            // keep only the unique years
            const uniqueYearList = [];
            yearList.forEach((year) => {
                if (uniqueYearList.indexOf(year) === -1) {
                    uniqueYearList.push(year);
                }
            });

            // sort the years in ASC order
            uniqueYearList.sort();

            const minYear = uniqueYearList[0];
            const maxYear = uniqueYearList[uniqueYearList.length - 1];

            // if minYear === maxYear, return null as the Slider component will complain if the min and max values are the same
            this.setState({
                minYear: (minYear === maxYear) ? null : minYear,
                maxYear: (minYear === maxYear) ? null : maxYear,
                // set the selected year as the max year to show all videos by default
                selectedYear: this.state.selectedYear ? this.state.selectedYear : maxYear,
            });
        }
    }

    /**
     * Method triggered when the slider range changes.
     * It sets the local state to the new selected year and calls the applyYearFilter action creater to update the store.
     * @param e
     * @param newValue
     */
    handleYearChange = (e, newValue) => {
        this.setState({ selectedYear: newValue });
        this.props.applyYearFilter({
            startYear: this.state.minYear,
            endYear: newValue,
        });
    }

    render () {

        // if there's no year range, don't show the component
        if (!this.state.minYear || ! this.state.maxYear) {
            return null;
        }

        return (
            <div className="YearFilter">
                <span className="YearFilterLabel">{this.state.minYear}</span>
                <div className="SliderContainer">
                    <Slider
                        min={this.state.minYear}
                        max={this.state.maxYear}
                        step={1}
                        value={this.state.selectedYear}
                        onChange={this.handleYearChange}
                    />
                </div>
                <span className="YearFilterLabel">{this.state.selectedYear}</span>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        searchedVideos: state.searchedVideos,
        filters: state.filters,
    }),
    (dispatch) => bindActionCreators({
        applyYearFilter,
    }, dispatch),
)(YearFilter);
