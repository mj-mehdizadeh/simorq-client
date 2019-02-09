// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, PanResponder, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SendBoxContainer from '../../containers/sendBox/SendBoxContainer';
import {transitionIn, transitionMove, transitionOut, transitionRelease} from '../../services/transition';
import HistoryContainer from '../../containers/room/HistoryContainer';
import styles from './styles';

export default class RoomHistoryWrap extends React.PureComponent {
  constructor(props) {
    super(props);
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
        source={require('../../../assets/images/bg1.jpg')}
        style={styles.container}>
        {this.props.rooms.map(roomId =>
          <View
            key={roomId}
            style={roomId === this.props.roomId ? styles.container : styles.hide}>
            <HistoryContainer
              roomId={roomId}
              panHandlers={this._panResponder.panHandlers}
            />
          </View>,
        )}
      </ImageBackground>
      <SendBoxContainer/>
    </Animatable.View>;
  }
}

RoomHistoryWrap.propTypes = {
  roomId: PropTypes.string,
  rooms: PropTypes.array.isRequired,
};
