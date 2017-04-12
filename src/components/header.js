import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render () {
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Search Videos</Link></li>
                        <li><Link to="/my-videos">My Videos</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
