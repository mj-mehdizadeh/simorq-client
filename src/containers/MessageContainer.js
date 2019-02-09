// @flow
import * as React from 'react';
import RoomMessage from '../components/RoomMessage';
import PropTypes from 'prop-types';

export default class MessageContainer extends React.Component {
  render() {
    return <RoomMessage
      message={this.props.message}/>;
  }
}


MessageContainer.propTypes = {
  message: PropTypes.object.isRequired,
};
