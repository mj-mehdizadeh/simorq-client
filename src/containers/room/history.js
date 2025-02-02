// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import RoomHistory from '../../components/RoomHistory/index';
import {connect} from 'react-redux';
import {getRoomMessages} from '../../selector/messages';
import {head} from 'lodash';
import {fetchHistory} from '../../services/messages/api';
import {getRoomProp} from '../../selector/rooms';

class HistoryContainer extends React.PureComponent {

  state = {
    loading: 'initial',
  };

  _scrollFlag = {
    up: false,
    down: false,
  };

  async componentDidMount() {
    await this.loadMore();
  }

  onScroll = async (event, offsetX, offsetY) => {
    const {height} = event.nativeEvent.contentSize;
    if (!this._scrollFlag.down && height - offsetY <= 2 * height) {
      this._scrollFlag.down = true;
    } else if (!this._scrollFlag.up && offsetY < 300) {
      this._scrollFlag.up = true;
      await this.loadMore();
      this._scrollFlag.up = false;
    }
  };

  loadMore = async () => {
    const {history, roomId} = this.props;
    const from = head(history);
    console.log('loadMore', from);
    await fetchHistory(roomId, from);
    this.setState({loading: false});
  };

  render() {
    const {loading} = this.state;
    const {roomId, roomType, history, panHandlers, changeBg} = this.props;
    return <RoomHistory
      loading={loading}
      roomId={roomId}
      roomType={roomType}
      history={history}
      onScroll={this.onScroll}
      changeBg={changeBg}
      panHandlers={panHandlers}
    />;
  }
}

HistoryContainer.propTypes = {
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  history: getRoomMessages(state, props),
  roomType: getRoomProp(state, {roomId: props.roomId, key: 'type'}),
});

export default connect(mapStateToProps)(HistoryContainer);
