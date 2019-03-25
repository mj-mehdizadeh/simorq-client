// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Badge, Body, Icon, Left, ListItem, Text, View} from 'native-base';
import styles from './styles';
import AvatarContainer from '../../containers/room/AvatarContainer';
import {translate} from 'react-i18next';
import {unreadCount} from '../../services/core';

class RoomCard extends React.PureComponent {
  render() {
    const {room, lastMessage, onPress, t} = this.props;
    return (<View style={room.id === 2 ? styles.itemDivider : styles.item}>
      <ListItem thumbnail noBorder={room.id === 2} onPress={onPress}>
        <Left>
          <AvatarContainer roomId={room.id}/>
        </Left>
        <Body style={styles.body}>
        <View style={styles.titleWrap}>
          <Text style={styles.title} bold>{room.title}</Text>
          {(lastMessage && lastMessage.out && room.subscribe.readHistoryMaxId < lastMessage.id) && (
            <Icon style={styles.iconDeliver} name="check" type="MaterialCommunityIcons"/>
          )}
          {(lastMessage && lastMessage.out && room.subscribe.readHistoryMaxId >= lastMessage.id) && (
            <Icon style={styles.iconSeen} name="check-all" type="MaterialCommunityIcons"/>
          )}
          <Text style={styles.time} note>{!!lastMessage && t('date.msgTime', {date: lastMessage.createdAt})}</Text>
        </View>
        <View style={styles.noteWrap}>
          <Text style={styles.note} note numberOfLines={1}>{!!lastMessage && lastMessage.text}</Text>
          {room.subscribe.unreadCount > 0 && (<Badge primary small>
            <Text>{unreadCount(room.subscribe.unreadCount)}</Text>
          </Badge>)}
        </View>
        </Body>
      </ListItem>
    </View>);
  }
}

export default translate()(RoomCard);

RoomCard.propTypes = {
  t: PropTypes.func.isRequired,
  room: PropTypes.object,
  lastMessage: PropTypes.object,
};
