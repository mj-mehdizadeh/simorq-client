// @flow
import * as React from 'react';
import RoomMessage from '../components/RoomMessage';
import PropTypes from 'prop-types';

export default class RoomMessageContainer extends React.Component {
  render() {
    return <RoomMessage
      message={this.props.message}/>;
  }
}


RoomMessageContainer.propTypes = {
  message: PropTypes.object.isRequired,
};
