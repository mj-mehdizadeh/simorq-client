// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomHistory from '../../components/RoomHistory/index';
import MessageCreators from '../../redux/messages';
import {connect} from 'react-redux';
import {getRoomMessages} from '../../selector/messages';
import {last} from 'lodash';

class HistoryContainer extends React.PureComponent {

  state = {
    loading: 'initial',
  };

  async componentDidMount() {
    const {history, loadHistory, roomId} = this.props;
    await loadHistory(roomId, last(history));
    this.setState({loading: false});
  }

  render() {
    return <RoomHistory
      loading={this.state.loading}
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
