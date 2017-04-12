import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAutoCompleteSuggestions, searchVideos } from '../store/action-creators';

let autoCompleteTimer = null;

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            searchText: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.autoCompleteSuggestions) {
            console.log('hmmmm', nextProps.autoCompleteSuggestions);
            this.setState({ dataSource: nextProps.autoCompleteSuggestions });
        }
    }

    handleChange = (value) => {
        this.setState({ searchText: value});

        // get autocomplete suggestions with debounce if the search string has at least 2 characters
        clearTimeout(autoCompleteTimer);
        if (value.length > 1) {
            autoCompleteTimer = setTimeout(() => {
                this.props.getAutoCompleteSuggestions(value);
            }, 300);
        }

    }

    handleSearch = (e) => {
        if (e.charCode === 13) {
            searchVideos(this.state.searchText);
        }
    }

    render () {
        return (
            <AutoComplete
                dataSource={this.state.dataSource}
                floatingLabelText="Search videos"
                fullWidth={true}
                onUpdateInput={this.handleChange}
                value={this.state.searchText}
                onKeyPress={this.handleSearch}
            />
        )
    }
}

export default connect(
    (state) => ({
        autoCompleteSuggestions: state.autoCompleteSuggestions,
    }),
    (dispatch) => bindActionCreators({
        getAutoCompleteSuggestions,
        searchVideos,
    }, dispatch),
)(Search);
