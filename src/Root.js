import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

class Root extends React.PureComponent {
    static propTypes = {
        route: PropTypes.shape({
            routes: PropTypes.array.isRequired
        })
    };

    render(){
        return (
            <div>
                {/* child routes won't render without this */}
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

export default Root;