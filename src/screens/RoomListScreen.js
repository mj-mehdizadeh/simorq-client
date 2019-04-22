import * as React from 'react';
import {connect} from 'react-redux';
import RoomList from '../components/RoomList/index';
import {getRoomList} from '../selector/rooms';
import Socket from '../utils/socket';
import AppCreators from '../redux/appRedux';
import {importAllContacts} from '../utils/contacts';
import {onNewMessage} from '../services/messages/events';
import {fetchSubscribes} from '../services/rooms';

class RoomListScreen extends React.PureComponent {

  async componentDidMount() {
    Socket.init([
      ['connect', this.onConnect],
      ['disconnect', this.onDisconnect],
      ['new-message', onNewMessage],
    ]);
    await importAllContacts();
  }

  onConnect = async () => {
    await fetchSubscribes(true);
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
  };
}

const mapStateToProps = state => ({
  appState: state.app.state,
  rooms: getRoomList(state),
});

export default connect(mapStateToProps, bindAction)(RoomListScreen);
