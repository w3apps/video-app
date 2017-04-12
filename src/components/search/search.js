import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAutoCompleteSuggestions, searchVideos } from '../../store/action-creators';

import './search.scss';

const SUGGESTIONS_DEBOUNCE_TIME = 300; // debounce time between user key strokes
let autoCompleteTimer = null; // used to clear the timeout

// material-ui styling
const buttonStyle = {
    marginLeft: '20px',
    marginBottom: '10px',
};

/**
 * Component that renders a search box with autoComplete capabilities.
 * Pressing enter, selecting an autoComplete option or clicking the search button triggers a call
 * to the YouTube search API.
 */
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            searchText: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        /*
         if there are new suggestions, update the autoComplete dataSource
         user typing could trigger this a few times (there's a debounce to avoid too many calls)
         */
        if (nextProps.autoCompleteSuggestions) {
            this.setState({ dataSource: nextProps.autoCompleteSuggestions });
        }
    }

    /**
     * Method triggered when the user changes the search input.
     * It calls the google suggestions API with a time debounce to avoid making too many calls.
     * @param value
     */
    handleChange = (value) => {
        this.setState({ searchText: value});

        clearTimeout(autoCompleteTimer);
        // get autoComplete suggestions with debounce if the search string has at least 2 characters
        if (value.length > 1) {
            autoCompleteTimer = setTimeout(() => {
                this.props.getAutoCompleteSuggestions(value);
            }, SUGGESTIONS_DEBOUNCE_TIME);
        }

    }

    /**
     * Method triggered when a search is made, either by selecting a suggestion,
     * pressing enter or clicking the search button.
     * @param e
     */
    handleSearch = (e) => {
        // hit the API only if there's text in searchField
        if (this.state.searchText.length > 0) {
            this.props.searchVideos(this.state.searchText);
        }
    }

    render () {
        return (
            <div className="Search">
                <AutoComplete
                    dataSource={this.state.dataSource}
                    floatingLabelText="Search videos"
                    fullWidth={true}
                    onUpdateInput={this.handleChange}
                    onNewRequest={this.handleSearch}
                    value={this.state.searchText}
                />
                <FlatButton style={buttonStyle} icon={<ActionSearch />} onClick={this.handleSearch} />
            </div>
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
