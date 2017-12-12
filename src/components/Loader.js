import React from 'react';
import AdvancedLoader from 'react-loader-advanced';
import {SavingSpinner} from './SavingSpinner';

export const Loader = ({children, show}) => {
    return (
        <AdvancedLoader
            show={show}
            message={<SavingSpinner/>}
            contentBlur={2}
            backgroundStyle={{background: 'transparent'}}
        >
            {children}
        </AdvancedLoader>
    );
};