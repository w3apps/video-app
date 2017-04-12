import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
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
                            {/*Each route is loaded inside it's own tab*/}
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
