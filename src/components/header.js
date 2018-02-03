import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Header = () => (
    <header>
        <div>
            <div>
                <Link to='/'>
                    <h1>Home</h1>
                </Link>
                <Link to='/addblog'>
                    <p>Add Blog</p>
                </Link>
            </div>
        </div>
    </header>
)


export default Header;