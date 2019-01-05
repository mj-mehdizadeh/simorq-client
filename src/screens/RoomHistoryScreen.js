// @flow
import * as React from 'react';
import RoomHistory from '../components/RoomHistory';

export default class RoomHistoryScreen extends React.Component {
  state = {
    history: [],
  };

  componentDidMount() {
    this.setState({
      history: require('../../data/roomHistory'),
    });
  }

  render() {
    return <RoomHistory
      onPanResponderMove={this.props.onPanResponderMove}
      onPanResponderRelease={this.props.onPanResponderRelease}
      close={this.props.close} history={this.state.history}/>;
  }
}
