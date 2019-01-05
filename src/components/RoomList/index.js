import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Badge, Body, Button, Container, Header, Icon, Left, ListItem, Right, Text, Thumbnail, Title, View} from 'native-base';
import {random} from 'lodash';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import RoomHistoryScreen from '../../screens/RoomHistoryScreen';

export default class RoomList extends React.Component {

  handleViewRef = ref => this.view = ref;
  historyIn = () => this.view.transitionTo({
    transform: [
      {
        translateX: 0,
      },
    ],
  }, 400);
  historyOut = () => this.view.transitionTo({
    transform: [
      {
        translateX: 360,
      },
    ],
  }, 400);

  _keyExtractor = (item, index) => item.id + '-' + index;
  _renderItem = ({item}) => (
    <View style={item.id === 2 ? styles.itemDivider : styles.item}>
      <ListItem thumbnail noBorder={item.id === 2} onPress={this.historyIn}>
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

  _onPanResponderMove = (evt, gesture) => {
    if (gesture.moveX > 50 && gesture.dx > 10) {
      this.view.setNativeProps({
        style: {
          transform: [
            {
              translateX: gesture.dx,
            },
          ],
        },
      });
    }
  };
  _onPanResponderRelease = (evt, gesture) => {
    if (gesture.dx > 250 || (gesture.dx > 20 && gesture.vx > 0.5)) {
      this.view.transition({
        transform: [
          {
            translateX: gesture.dx,
          },
        ],
      }, {
        transform: [
          {
            translateX: 360,
          },
        ],
      }, 200);
    } else if (gesture.dx > 0) {
      this.view.transition({
        transform: [
          {
            translateX: gesture.dx,
          },
        ],
      }, {
        transform: [
          {
            translateX: 0,
          },
        ],
      }, 100);
    }
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
        data={this.props.roomList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
      <Animatable.View
        duration={500}
        useNativeDriver={true}
        style={styles.history}
        ref={this.handleViewRef}>
        <RoomHistoryScreen
          onPanResponderMove={this._onPanResponderMove}
          onPanResponderRelease={this._onPanResponderRelease}
          close={this.historyOut}/>
      </Animatable.View>
    </Container>;
  }
}

RoomList.propTypes = {
  roomList: PropTypes.array,
};
