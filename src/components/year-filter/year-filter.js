import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { applyYearFilter } from '../../store/action-creators';

import './year-filter.scss';

class YearFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.calcYears(this.props.videos);
    }

    componentWillReceiveProps(nextProps) {
        this.calcYears(nextProps.videos);
    }

    calcYears = (videos) => {
        if (videos) {
            const yearList = videos.map((video) => {
                const date = new Date(video.snippet.publishedAt);
                return date.getFullYear();
            });
            const uniqueYearList = [];
            yearList.forEach((year) => {
                if (uniqueYearList.indexOf(year) === -1) {
                    uniqueYearList.push(year);
                }
            });
            uniqueYearList.sort();

            const minYear = uniqueYearList[0];
            const maxYear = uniqueYearList[uniqueYearList.length - 1];
            this.setState({
                minYear,
                maxYear,
                selectedYear: this.state.selectedYear ? this.state.selectedYear : maxYear,
            });
        }
    }

    handleYearChange = (e, newValue) => {
        this.setState({ selectedYear: newValue });
        this.props.applyYearFilter({
            startYear: this.state.minYear,
            endYear: newValue,
        });
    }

    render () {

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
