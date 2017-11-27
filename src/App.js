import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Root from './Root';
import MemberList from './containers/MemberList';
import Member from './containers/Member';

import './styles/main.less';

const routes = [
    {
        component: Root,
        routes: [
            {
                path: '/',
                exact: true,
                component: MemberList
            },
            {
                path: '/:id',
                component: Member
            }
        ]
    }
];

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='appWrapper'>
                    {renderRoutes(routes)}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
