// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Badge, Body, Icon, Left, ListItem, Text, Thumbnail, View} from 'native-base';
import styles from '../RoomList/styles';

export default class RoomCard extends React.PureComponent {
  render() {
    const {room, lastMessage} = this.props;
    return (<View style={room.id === 2 ? styles.itemDivider : styles.item}>
      <ListItem thumbnail noBorder={room.id === 2} onPress={this.historyIn}>
        <Left>
          <Thumbnail
            source={{uri: room.avatar}}/>
        </Left>
        <Body style={styles.body}>
          <View style={styles.titleWrap}>
            <Text style={styles.title} bold>{room.title}</Text>
            {(lastMessage.out && room.subscribe.lastPeerRead < lastMessage.createdAt) && (
              <Icon style={styles.iconDeliver} name="check" type="MaterialCommunityIcons"/>
            )}
            {(lastMessage.out && room.subscribe.lastPeerRead >= lastMessage.createdAt) && (
              <Icon style={styles.iconSeen} name="check-all" type="MaterialCommunityIcons"/>
            )}
            <Text style={styles.time} note>{lastMessage.message}</Text>
          </View>
          <View style={styles.noteWrap}>
            <Text style={styles.note} note numberOfLines={1}>{room.last_message}</Text>
            {room.subscribe.unreadCount > 0 && (<Badge primary small>
              <Text>{room.subscribe.unreadCount}</Text>
            </Badge>)}
          </View>
        </Body>
      </ListItem>
    </View>);
  }
}

RoomCard.propTypes = {
  room: PropTypes.object,
  lastMessage: PropTypes.object,
};
