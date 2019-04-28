// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Badge, Body, Icon, Left, ListItem, Text, View} from 'native-base';
import styles from './styles';
import AvatarContainer from '../../containers/room/AvatarContainer';
import {translate} from 'react-i18next';
import {unreadCount} from '../../utils/core';

class RoomCard extends React.PureComponent {
  render() {
    const {room, type, onPress} = this.props;
    return (<View style={room.id === 2 ? styles.itemDivider : styles.item}>
      <ListItem thumbnail noBorder={room.id === 2} onPress={onPress}>
        <Left>
          <AvatarContainer roomId={room.id} size={type === 'room' ? 'medium' : 'small'}/>
        </Left>
        <Body style={styles.body}>
          <View style={styles.titleWrap}>
            <View style={styles.titleView}>
              <Text style={type === 'room' ? styles.roomTitle : styles.title} bold>
                {room.title}
              </Text>
            </View>
            {type === 'room' && this.renderStatus()}
            {type === 'room' && this.renderTime()}
          </View>
          {type === 'room' && (this.renderRoomBody())}
          {type === 'contact' && (this.renderContactBody())}
        </Body>
      </ListItem>
    </View>);
  }

  renderStatus() {
    const {room, lastMessage} = this.props;
    if (!lastMessage || !lastMessage.out) {
      return null;
    }
    if (room.subscribe.readHistoryMaxId < lastMessage.id) {
      return <Icon style={styles.iconDeliver} name="check" type="MaterialCommunityIcons"/>;
    }
    if (room.subscribe.readHistoryMaxId >= lastMessage.id) {
      return <Icon style={styles.iconSeen} name="check-all" type="MaterialCommunityIcons"/>;
    }
  }

  renderTime() {
    const {t, lastMessage} = this.props;
    if (!lastMessage) {
      return null;
    }
    return <Text style={styles.time} note>{t('date.msgTime', {date: lastMessage.createdAt})}</Text>;
  }

  renderRoomBody() {
    const {t, room, lastMessage} = this.props;
    return (<View style={styles.noteWrap}>
      <View style={styles.titleView}>
        {!!lastMessage && (<Text style={styles.note} note numberOfLines={1}>{lastMessage.text}</Text>)}
        {!lastMessage && (<Text style={styles.emptyNote} note numberOfLines={1}>{t('roomCard.noMessage')}</Text>)}
      </View>
      {room.subscribe.unreadCount > 0 && (<Badge primary small>
        <Text>{unreadCount(room.subscribe.unreadCount)}</Text>
      </Badge>)}
    </View>);
  }

  renderContactBody() {
    const {room} = this.props;
    return <Text style={styles.note} note numberOfLines={1}>{room.lastSeen}</Text>;
  }
}

export default translate()(RoomCard);

RoomCard.propTypes = {
  t: PropTypes.func.isRequired,
  room: PropTypes.object,
  lastMessage: PropTypes.object,
  type: PropTypes.oneOf(['room', 'contact', 'search']),
};
