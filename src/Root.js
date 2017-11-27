import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import AppBar from 'material-ui/AppBar';

class Root extends React.PureComponent {
    static propTypes = {
        route: PropTypes.shape({
            routes: PropTypes.array.isRequired
        })
    };

    onLogoClick() {
        this.props.history.push('/');
    }

    render(){
        const logo = <a href='https://interclub.io' rel="noopener noreferrer" target='_blank'>
            <img src='/assets/inv_logo_48x48.png' />
        </a>;

        return (
            <div>
                <AppBar
                    title="interclub.io"
                    iconElementLeft={logo}
                    onTitleTouchTap={::this.onLogoClick}
                />
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

export default Root;