import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Badge, SwipeRow, Body, Button, Container, Header, Icon, Left, ListItem, Right, Text, Thumbnail, Title, View} from 'native-base';
import {random} from 'lodash';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import RoomHistoryScreen from '../../screens/RoomHistoryScreen';

export default class RoomList extends React.Component {

  handleViewRef = ref => this.view = ref;
  historyIn= () => setTimeout(() => this.view.slideInRight(400));
  historyOut  = () => this.view.slideOutRight(400);

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
        animation={{
          0: {
            translateX: 360,
          },
          1: {
            translateX: 360,
          },
        }}
        duration={500}
        useNativeDriver={true}
        style={styles.history}
        ref={this.handleViewRef}>
        <RoomHistoryScreen close={this.historyOut}/>
      </Animatable.View>
    </Container>;
  }
}

RoomList.propTypes = {
  roomList: PropTypes.array,
};
