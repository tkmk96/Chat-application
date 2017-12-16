import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        authToken: PropTypes.string
    };

    render() {
        const {component: Component, ...rest} = this.props;
        const authed = this.props.authToken !== null;
        return (
            <Route
                {...rest}
                render={(props) => authed === true
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
            />
        );
    }
}

function mapStateToProps({authToken}) {
    return {authToken};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));