import React, {Component} from 'react';
import RegistrationForm from './RegistrationForm';

class Registration extends Component {
    render() {
        return (
            <div>
                <h1 className='text-center'>The Chanelling!</h1>
                <RegistrationForm/>
            </div>
        );
    }
}

export default Registration;