import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Body, Button, Container, Header, Icon, Right, Title} from 'native-base';
import RoomCardContainer from '../../containers/room/CardContainer';
import HistoryWrapContainer from '../../containers/room/HistoryWrapContainer';
import styles from './styles';

export default class RoomList extends React.Component {

  _keyExtractor = (item, index) => item + '-' + index;
  _renderItem = ({item, index}) => <RoomCardContainer
    onPress={this.openRoom}
    roomId={item}
    index={index}
  />;

  openRoom = roomId => {
    this.refs.history.openRoom(roomId);
  };

  render() {
    return <Container style={styles.container}>
      <Header>
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
    </Container>;
  }
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string),
};
