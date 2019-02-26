// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {Body, Button, Header, Icon, Left, Right, Subtitle, Text, Title, View} from 'native-base';
import AvatarContainer from '../../containers/room/AvatarContainer';
import styles from './styles';
import RecycleContainer from '../../containers/room/RecycleContainer';

class RoomHistory extends React.PureComponent {

  recycleRef = () => {

  };

  render() {
    const {t, roomId, history, onScroll, changeBg} = this.props;
    return <View style={styles.container}>
      <View style={styles.header}>
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
            <Button transparent onPress={changeBg}>
              <Icon name="more-vert"/>
            </Button>
          </Right>
        </Header>
      </View>
      {this.props.loading === 'initial' && (<View style={styles.loadingWrap}>
        <Text style={styles.loading}>{t('history.loading')}</Text>
      </View>)}
      <View
        style={styles.content}>
        {history.length && (
          <RecycleContainer
            history={history}
            onScroll={onScroll}
            recycleRef={this.recycleRef}
          />)}
      </View>
    </View>;
  }
}

RoomHistory.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.array,
  onScroll: PropTypes.func.isRequired,
};

export default translate()(RoomHistory);
