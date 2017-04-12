import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAutoCompleteSuggestions, searchVideos } from '../../store/action-creators';

import './search.scss';

let autoCompleteTimer = null;
const buttonStyle = {
    marginLeft: '20px',
    marginBottom: '10px',
};

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
