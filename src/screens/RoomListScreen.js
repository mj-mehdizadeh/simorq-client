import * as React from 'react';
import {connect} from 'react-redux';
import RoomList from '../components/RoomList/index';
import {getRoomList} from '../selector/rooms';
import {initEvents} from '../services/socket_events';

class RoomListScreen extends React.PureComponent {

  componentDidMount() {
    const {dispatch} = this.props;
    initEvents(dispatch);
  }

  render() {
    return <RoomList
      rooms={this.props.rooms}/>;
  }
}

function bindAction(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = state => ({
  rooms: getRoomList(state),
});

export default connect(mapStateToProps, bindAction)(RoomListScreen);
