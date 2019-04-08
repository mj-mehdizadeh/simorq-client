import * as React from 'react';
import {connect} from 'react-redux';
import RoomList from '../components/RoomList/index';
import {getRoomList} from '../selector/rooms';
import Socket from '../services/socket';
import {onNewMessage} from '../sagas/messages';
import AppCreators from '../redux/appRedux';
import RoomsCreators from '../redux/rooms';

class RoomListScreen extends React.PureComponent {

  async componentDidMount() {
    Socket.init([
      ['connect', this.onConnect],
      ['disconnect', this.onDisconnect],
      ['new-message', onNewMessage],
    ]);
  }

  onConnect = async () => {
    const {fetchRooms} = this.props;
    await fetchRooms(true);
  };
  onDisconnect = async (reason) => {
    const {changeAppState} = this.props;
    changeAppState('CONNECTING');
  };

  render() {
    const {appState} = this.props;
    return <RoomList
      appState={appState}
      rooms={this.props.rooms}/>;
  }
}

function bindAction(dispatch) {
  return {
    changeAppState: (state) => dispatch(AppCreators.setState(state)),
    fetchRooms: (changeState) => dispatch(RoomsCreators.fetchRooms(changeState)),
  };
}

const mapStateToProps = state => ({
  appState: state.app.state,
  rooms: getRoomList(state),
});

export default connect(mapStateToProps, bindAction)(RoomListScreen);
