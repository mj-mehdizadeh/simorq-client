// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomHistory from '../../components/RoomHistory/index';

export default class HistoryContainer extends React.Component {
  state = {
    history: [],
  };

  render() {
    return <RoomHistory
      roomId={this.props.roomId}
      history={this.state.history}
      panHandlers={this.props.panHandlers}/>;
  }
}

HistoryContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
};
