// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {Text, View} from 'native-base';
import styles from './styles';
import RecycleContainer from '../../containers/room/RecycleContainer';

class RoomHistory extends React.PureComponent {

  recycleRef = () => {

  };

  render() {
    const {t, history, onScroll} = this.props;
    return <View style={styles.container}>
      {this.props.loading === 'initial' && (<View style={styles.loadingWrap}>
        <Text style={styles.loading}>{t('history.loading')}</Text>
      </View>)}
      <View
        style={styles.content}>
        {!!history.length && (
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
