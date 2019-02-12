// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomHistory from '../../components/RoomHistory/index';
import MessageCreators from '../../redux/messages';
import {connect} from 'react-redux';
import {getRoomMessages} from '../../selector/messages';

class HistoryContainer extends React.PureComponent {

  async componentDidMount() {
    const {loadHistory, roomId} = this.props;
    await loadHistory(roomId);
  }

  render() {
    return <RoomHistory
      roomId={this.props.roomId}
      history={this.props.history}
      panHandlers={this.props.panHandlers}/>;
  }
}

HistoryContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
};

function bindAction(dispatch) {
  return {
    loadHistory: (roomId) => dispatch(MessageCreators.fetchHistory(roomId)),
  };
}

const mapStateToProps = (state, props) => ({
  history: getRoomMessages(state, props),
});

export default connect(mapStateToProps, bindAction)(HistoryContainer);
