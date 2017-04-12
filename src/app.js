import React, { Component, PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'

import store from './store/store';
import Header from './components/header/header';
import Home from './pages/home';
import MyVideos from './pages/my-videos';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    componentWillMount() {
        injectTapEventPlugin();
    }

    render () {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <Router>
                        <div>
                            <Header />
                            <Route exact path="/" component={Home}/>
                            <Route path="/my-videos" component={MyVideos}/>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        )
    }
}
