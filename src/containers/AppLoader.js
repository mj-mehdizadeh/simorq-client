import React, {Component} from 'react';
import {navigate} from '../services/navigator';
import {APP_NAVIGATOR, AUTH_NAVIGATOR} from '../constant/navigator';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {loadUserLang, setT} from '../services/i18n';
import OAuth from '../services/oauth';
import LoadingPage from '../components/LoadingPage';
import {loadMe} from '../services/client';

class AppLoader extends Component {

  async componentDidMount() {
    await Promise.all([
      loadMe(),
      loadUserLang(),
      OAuth.retrieveToken(),
    ]);
    setT(this.props.t);
    if (OAuth.getToken()) {
      return navigate(APP_NAVIGATOR);
    }
    navigate(AUTH_NAVIGATOR);
  }

  render() {
    return <LoadingPage/>;
  }
}

AppLoader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(AppLoader);
