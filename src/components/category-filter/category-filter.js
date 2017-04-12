import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { applyCategoryFilter } from '../../store/action-creators';

class CategoryFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filters.categoryId) {
            this.setState({selectedCategory: nextProps.filters.categoryId});
        }
    }

    handleCategoryChange = (event, index, value) => {
        this.props.applyCategoryFilter(value);
    }

    render () {
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
    }, dispatch),
)(CategoryFilter);
