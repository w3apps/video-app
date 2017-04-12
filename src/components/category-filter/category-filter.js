import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { applyCategoryFilter, getVideoCategories } from '../../store/action-creators';

/**
 * Component that displays a dropDownMenu with the available categories for the current videos.
 */
class CategoryFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 0,
        }
    }

    componentWillMount() {

        // if there are videos, fetch the categories from the API (usually happens for local saved videos)
        if (this.props.videos.length > 0) {
            this.props.getVideoCategories(this.props.videos);
        }

    }

    componentWillReceiveProps(nextProps) {

        // if there are no categories yet, fetch them from the API
        if (nextProps.videosCategories.length === 0 && nextProps.videos.length > 0) {
            this.props.getVideoCategories(nextProps.videos);
        }

        // if the categoryId is changed, update the local state
        if (nextProps.filters.categoryId !== this.state.selectedCategory) {
            this.setState({ selectedCategory: nextProps.filters.categoryId });
        }

    }

    /**
     * Method triggered on dropDownMenu change to apply the selected category filter.
     * @param event
     * @param index
     * @param value
     */
    handleCategoryChange = (event, index, value) => {
        this.props.applyCategoryFilter(value);
    }

    render () {

        // don't show the dropDown if there are no categories
        if (!this.props.videosCategories.length > 0) {
            return null;
        }

        return (
            <div className="CategoryFilter">
                <DropDownMenu maxHeight={300} value={this.state.selectedCategory} onChange={this.handleCategoryChange}>
                    <MenuItem value={0} primaryText="Category" />
                    {
                        this.props.videosCategories.map((category, i) => {
                            return (
                                <MenuItem value={category.id} key={category.id} primaryText={category.snippet.title} />
                            )
                        })
                    }
                </DropDownMenu>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        videosCategories: state.videosCategories,
        filters: state.filters,
    }),
    (dispatch) => bindActionCreators({
        applyCategoryFilter,
        getVideoCategories,
    }, dispatch),
)(CategoryFilter);
