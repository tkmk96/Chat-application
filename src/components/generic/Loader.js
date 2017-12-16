import React from 'react';
import AdvancedLoader from 'react-loader-advanced';
import {SavingSpinner} from './SavingSpinner';
import PropTypes from 'prop-types';

const Loader = ({children, show}) => {
    return (
        <AdvancedLoader
            show={show || false}
            message={<SavingSpinner/>}
            contentBlur={2}
            backgroundStyle={{background: 'transparent'}}
        >
            {children}
        </AdvancedLoader>
    );
};

export default Loader;

Loader.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.any
};