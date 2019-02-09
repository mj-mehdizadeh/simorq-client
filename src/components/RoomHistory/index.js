// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Subtitle, Title} from 'native-base';
import MessageContainer from '../../containers/MessageContainer';
import AvatarContainer from '../../containers/room/AvatarContainer';
import styles from './styles';

export default class RoomHistory extends React.Component {

  _keyExtractor = (item, index) => item.id + '-' + index;
  _renderItem = ({item}) => (<MessageContainer message={item}/>);

  render() {
    const {roomId, panHandlers} = this.props;
    return <View style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={this.props.close}>
            <Icon name="arrow-back"/>
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <AvatarContainer roomId={roomId}/>
          <View style={styles.headerTitleWrap}>
            <Title style={styles.headerTitle} bold>Title</Title>
            <Subtitle style={styles.headerSubTitle}>Subtitle</Subtitle>
          </View>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="more-vert"/>
          </Button>
        </Right>
      </Header>
      <FlatList
        {...panHandlers}
        style={styles.content}
        data={this.props.history}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    </View>;
  }
}

RoomHistory.propTypes = {
  history: PropTypes.array.isRequired,
};
