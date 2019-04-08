import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Body, Button, Container, Header, Icon, Right, Title} from 'native-base';
import RoomCardContainer from '../../containers/room/CardContainer';
import HistoryWrapContainer from '../../containers/room/HistoryWrapContainer';
import styles from './styles';
import {navigate} from '../../services/navigator';
import {NEW_ROOM_SCREEN} from '../../constant/navigator';
import {translate} from 'react-i18next';

class RoomList extends React.PureComponent {

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
    const {t, appState} = this.props;
    return <Container style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Title bold>
            {appState === 'CONNECTING' && t('app.state.connecting')}
            {appState === 'UPDATING' && t('app.state.updating')}
            {appState === 'CONNECTED' && t('app.name')}
          </Title>
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

export default translate()(RoomList);

RoomList.propTypes = {
  t: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.string),
  appState: PropTypes.oneOf(['CONNECTING', 'UPDATING', 'CONNECTED']),
};
