// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {FlatList, ImageBackground, View, PanResponder} from 'react-native';
import {Body, Button, Footer, Header, Icon, Input, Left, Right, Subtitle, Thumbnail, Title} from 'native-base';
import styles from './styles';
import RoomMessageContainer from '../../containers/RoomMessageContainer';

export default class RoomHistory extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: this.props.onPanResponderMove,
      onPanResponderRelease: this.props.onPanResponderRelease,
    });
  }

  _keyExtractor = (item, index) => item.id + '-' + index;
  _renderItem = ({item}) => (<RoomMessageContainer message={item}/>);

  render() {
    return <ImageBackground
      source={require('../../../assets/images/bg1.jpg')}
      style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={this.props.close}>
            <Icon name="arrow-back"/>
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Thumbnail style={styles.headerThumb} source={{uri: 'https://avatars3.githubusercontent.com/u/2753?s=128&v=64'}}/>
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
        {...this._panResponder.panHandlers}
        style={styles.content}
        data={this.props.history}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
      <Footer style={styles.footer}>
        <Body>
          <Button style={styles.footerBtn} small transparent>
            <Icon style={styles.footerIcon} name="sticker-emoji" type="MaterialCommunityIcons"/>
          </Button>
          <Input placeholder="Message" placeholderTextColor="#a1aab3" selectionColor="#a1aab3"/>
          <Button style={styles.footerBtn} small transparent>
            <Icon style={styles.footerIcon} name="camera" type="MaterialCommunityIcons"/>
          </Button>
          <Button style={styles.footerBtn} small transparent>
            <Icon style={styles.footerIcon} name="paperclip" type="MaterialCommunityIcons"/>
          </Button>
          <Button style={styles.footerBtn} small transparent>
            <Icon style={styles.footerIcon} name="microphone-outline" type="MaterialCommunityIcons"/>
          </Button>
        </Body>
      </Footer>
    </ImageBackground>;
  }
}

RoomHistory.propTypes = {
  history: PropTypes.array.isRequired,
};
