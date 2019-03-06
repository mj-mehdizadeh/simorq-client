import * as React from 'react';
import PropTypes from 'prop-types';
import {Body, Button, Container, Content, Header, Icon, Left, ListItem, Right, Separator, Text, Title} from 'native-base';
import styles from './styles';
import NewRoomForm from './NewRoomForm';
import * as Animatable from 'react-native-animatable';
import {PanResponder} from 'react-native';
import {transitionIn, transitionMove, transitionOut, transitionRelease} from '../../services/transition';

export default class NewRoom extends React.PureComponent {
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

  handleViewRef = ref => this.view = ref;

  newFormIn = () => transitionIn(this.view);
  newFormOut = () => transitionOut(this.view);

  render() {
    const {goNewGroup, goNewChannel} = this.props;
    return <Container style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Title bold>New Message</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="magnify" type={'MaterialCommunityIcons'}/>
          </Button>
          <Button transparent>
            <Icon name="account-plus" type={'MaterialCommunityIcons'}/>
          </Button>
        </Right>
      </Header>
      <Content>
        <ListItem icon onPress={this.newFormIn}>
          <Left>
            <Icon name="account-multiple" type={'MaterialCommunityIcons'}/>
          </Left>
          <Body>
            <Text>New Group</Text>
          </Body>
        </ListItem>
        <ListItem icon last onPress={this.newFormIn}>
          <Left>
            <Icon name="bullhorn" type={'FontAwesome'}/>
          </Left>
          <Body>
            <Text>New Channel</Text>
          </Body>
        </ListItem>
        <Separator bordered>
          <Text>Sorted by last seen time</Text>
        </Separator>
      </Content>
      <Animatable.View
        duration={500}
        useNativeDriver={true}
        style={styles.newFormWrap}
        ref={this.handleViewRef}>
        <NewRoomForm />
      </Animatable.View>
    </Container>;
  }
}

NewRoom.propTypes = {
};
