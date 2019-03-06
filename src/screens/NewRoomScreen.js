import React, {Component} from 'react';
import NewRoom from '../components/NewRoom';

class NewRoomScreen extends Component {
  state = {
    page: null,
    type: null,
    name: null,
    description: null,
  };
  goNewChannel = () => {
    this.setState({type: 'CHANNEL', page: 'n'})
  };
  render() {
    return (
      <NewRoom goNewChannel={this.goNewChannel} />
    );
  }
}

export default NewRoomScreen;
