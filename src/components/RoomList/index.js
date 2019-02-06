import * as React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Body, Button, Container, Header, Icon, Right, Title} from 'native-base';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import RoomHistoryScreen from '../../screens/RoomHistoryScreen';
import RoomCardContainer from '../../containers/RoomCardContainer';
import {transitionIn, transitionMove, transitionOut, transitionRelease} from '../../services/transition';

export default class RoomList extends React.Component {

  _keyExtractor = (item, index) => item.id + '-' + index;
  _renderItem = ({item, index}) => <RoomCardContainer
    onPress={this.historyIn}
    roomId={item}
    index={index}
  />;

  handleViewRef = ref => this.view = ref;
  historyIn = () => transitionIn(this.view);
  historyOut = () => transitionOut(this.view);

  _onPanResponderMove = (evt, gesture) => transitionMove(this.view, evt, gesture);
  _onPanResponderRelease = (evt, gesture) => transitionRelease(this.view, evt, gesture);

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
  rooms: PropTypes.arrayOf(PropTypes.string),
};
