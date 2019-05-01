// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Body, Button, Header, Icon, Left, Right, Subtitle, Title, View} from 'native-base';
import AvatarContainer from '../../containers/room/AvatarContainer';
import styles from './styles';

export class RoomHeader extends React.PureComponent {
  render() {
    const {roomId, title} = this.props;
    return (<View style={styles.headerWrap}>
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={this.props.close}>
            <Icon style={styles.headerIcon} name="arrow-back"/>
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <AvatarContainer size={'small'} roomId={roomId}/>
          <View style={styles.headerTitleWrap}>
            <Title style={styles.headerTitle} bold>{title}</Title>
            <Subtitle style={styles.headerSubTitle}>Subtitle</Subtitle>
          </View>
        </Body>
        <Right>
          <Button transparent>
            <Icon style={styles.headerIcon} name="more-vert"/>
          </Button>
        </Right>
      </Header>
    </View>);
  }
}

RoomHeader.propTypes = {
  roomId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
