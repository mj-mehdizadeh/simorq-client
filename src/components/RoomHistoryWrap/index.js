// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, PanResponder, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SendBoxContainer from '../../containers/sendBox/SendBoxContainer';
import {transitionIn, transitionMove, transitionOut, transitionRelease} from '../../services/transition';
import HistoryContainer from '../../containers/room/HistoryContainer';
import styles from './styles';
import {BACKGROUND_IMAGES} from '../../constant/app';
import {generateFileUri} from '../../services/app';

export default class RoomHistoryWrap extends React.PureComponent {

  state = {idx: 0, backgroundSource: {uri: generateFileUri(BACKGROUND_IMAGES[0])}};

  constructor(props) {
    super(props);
    // todo [transition] - move to message container and pass the `this.view` ref. move-right: reply, move-left: back
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gesture) => transitionMove(this.view, evt, gesture),
      onPanResponderRelease: (evt, gesture) => transitionRelease(this.view, evt, gesture),
    });
  }

  changeBackground = () => {
    this.setState(prev => ({backgroundSource: {uri: generateFileUri(BACKGROUND_IMAGES[prev.idx + 1])}, idx: prev.idx + 1}));
  };

  handleViewRef = ref => this.view = ref;

  historyIn = () => transitionIn(this.view);
  historyOut = () => transitionOut(this.view);

  render() {
    return <Animatable.View
      duration={500}
      useNativeDriver={true}
      style={styles.history}
      ref={this.handleViewRef}>
      <ImageBackground
        source={this.state.backgroundSource}
        style={styles.container}>
        {this.props.rooms.map(roomId =>
          <View
            key={roomId}
            style={roomId === this.props.roomId ? styles.container : styles.hide}>
            <HistoryContainer
              roomId={roomId}
              changeBg={this.changeBackground}
              panHandlers={this._panResponder.panHandlers}
            />
          </View>,
        )}
      </ImageBackground>
      <SendBoxContainer roomId={this.props.roomId}/>
    </Animatable.View>;
  }
}

RoomHistoryWrap.propTypes = {
  roomId: PropTypes.string,
  rooms: PropTypes.array.isRequired,
};
