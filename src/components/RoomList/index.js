import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Badge, Body, Button, Container, Header, Icon, Left, ListItem, Right, Text, Thumbnail, Title, View} from 'native-base';
import {random} from 'lodash';
import styles from './styles';

export default class RoomList extends React.Component {

  onPress = () => {
  };

  _keyExtractor = (item, index) => item.id + '-' + index;
  _renderItem = ({item}) => (
    <View style={item.id === 2 ? styles.itemDivider : styles.item}>
      <ListItem thumbnail noBorder={item.id === 2} onPress={this.onPress}>
        <Left>
          <Thumbnail
            source={{uri: item.avatar}}/>
        </Left>
        <Body style={styles.body}>
          <View style={styles.titleWrap}>
            <Text style={styles.title} bold>{item.title}</Text>
            {item.last_message_status === 1 && (<Icon style={styles.iconDeliver} name="check" type="MaterialCommunityIcons"/>)}
            {item.last_message_status === 2 && (<Icon style={styles.iconSeen} name="check-all" type="MaterialCommunityIcons"/>)}
            <Text style={styles.time} note>{item.last_message_time}</Text>
          </View>
          <View style={styles.noteWrap}>
            <Text style={styles.note} note numberOfLines={1}>{item.last_message}</Text>
            {item.last_message_status === 0 && (<Badge primary small>
              <Text>{random(1, 20)}</Text>
            </Badge>)}
          </View>
        </Body>
      </ListItem>
    </View>
  );

  render() {
    return <Container>
      <Header>
        <Body>
          <Title bold>iGap+</Title>
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
        data={this.props.roomList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    </Container>;
  }
}

RoomList.propTypes = {
  roomList: PropTypes.array,
};
