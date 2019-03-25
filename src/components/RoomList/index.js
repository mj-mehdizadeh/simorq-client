import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Body, Button, Container, Header, Icon, Right, Title} from 'native-base';
import RoomCardContainer from '../../containers/room/CardContainer';
import HistoryWrapContainer from '../../containers/room/HistoryWrapContainer';
import styles from './styles';
import {navigate} from '../../services/navigator';
import {NEW_ROOM_SCREEN} from '../../constant/navigator';

export default class RoomList extends React.PureComponent {

  _keyExtractor = (item, index) => item + '-' + index;
  _renderItem = ({item, index}) => <RoomCardContainer
    onPress={this.openRoom}
    roomId={item}
    index={index}
  />;

  openRoom = roomId => {
    this.refs.history.openRoom(roomId);
  };

  onNewPress = () => {
    navigate(NEW_ROOM_SCREEN, {type: 'GROUP'});
  };

  render() {
    return <Container style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Title bold>SimorQ</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search"/>
          </Button>
          <Button transparent>
            <Icon name="apps"/>
          </Button>
        </Right>
      </Header>
      <FlatList
        style={styles.content}
        data={this.props.rooms}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
      <HistoryWrapContainer
        ref={'history'}/>
      <Button style={styles.fab} round primary bottomRight onPress={this.onNewPress}>
        <Icon name="add"/>
      </Button>
    </Container>;
  }
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string),
};
