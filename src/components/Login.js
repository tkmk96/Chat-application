import React, {Component} from 'react';

import LoginForm from './LoginForm';

class Login extends Component {
    render(){
        return (
            <div>
                <h1 className='text-center'>The Chanelling!</h1>
                <LoginForm/>
            </div>
        );
    }
}

export default Login;