import * as React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {Icon, Text, View} from 'native-base';
import styles from './styles';

class Footer extends React.PureComponent {

  render() {
    const {t, media, createdAt, failed, sending, seen, isOutbox} = this.props;
    return (<View style={media ? styles.mediaFooterWrap : styles.footerWrap}>
      <View style={isOutbox ? styles.footerSelf : styles.footer}>
        <Text style={styles.timeWrap}>
          {t('date.msgTime', {date: createdAt})}
        </Text>
        <Text style={styles.statusWrap}>
          {failed ? (<Icon style={styles.statusIconFailed} name="info"/>) : (
            sending ? (<Icon style={styles.statusIconDeliver} name="schedule"/>) : (
              seen ? (<Icon style={styles.statusIconSeen} name="check-all" type="MaterialCommunityIcons"/>) : (
                isOutbox && (<Icon style={styles.statusIconDeliver} name="check" type="MaterialCommunityIcons"/>)
              )
            )
          )}
        </Text>
        {/*Channel Views and else...*/}
      </View>
    </View>);
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  media: PropTypes.bool,
  createdAt: PropTypes.string,
  failed: PropTypes.bool,
  sending: PropTypes.bool,
  seen: PropTypes.bool,
  isOutbox: PropTypes.bool,
};

export default translate()(Footer);
