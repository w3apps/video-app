import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import {
    Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Provider } from 'react-redux'

import store from './store/store';
import Home from './pages/home';
import MyVideos from './pages/my-videos';

const history = createBrowserHistory();

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: history.location.pathname,
        };
    }

    componentWillMount() {
        injectTapEventPlugin();
    }

    handleTab = (value) => {
        this.setState({
            selectedTab: value,
        });
        history.push(value);
    }

    render () {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <Router history={history}>
                        <div>
                            <Tabs value={this.state.selectedTab} onChange={this.handleTab}>
                                <Tab value='/' label="Search Videos" >
                                    <Route exact path="/" component={Home}/>
                                </Tab>
                                <Tab value='/my-videos' label="My Videos" >
                                    <Route path="/my-videos" component={MyVideos}/>
                                </Tab>
                            </Tabs>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        )
    }
}
