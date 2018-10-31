import React, {Component} from 'react';
import Register from '../components/Register';
import {goBack} from '../services/navigator';

class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      state: 0,
    };
  }

  onSubmit = () => {
    this.setState(prev => ({state: prev.state + 1}));
  };

  render() {
    const {state} = this.state;
    return <Register
      state={state}
      onSubmit={this.onSubmit}
      goBack={goBack}
    />;
  }
}

export default RegisterScreen;
