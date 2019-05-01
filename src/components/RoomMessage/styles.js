import {StyleSheet} from 'react-native';
import variable from '../../theme/variables/material';

const commonStyle = {
  wrap: {
    transform: [{scaleY: -1}],
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2.5,
    paddingLeft: 10,
  },
  box: {
    padding: 2,
    maxWidth: 290,
    backgroundColor: '#fff',
    shadowColor: '#d9d9d9',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 1,
    borderRadius: 20,
    borderTopLeftRadius: 9,
  },
  image: {
    width: 276,
    height: 276,
    margin: -8,
    marginBottom: 6,
    borderRadius: 9,
    borderTopRightRadius: 20,
  },
  footer: {
    fontSize: 11,
    color: '#838c96',
    textAlign: 'right',
    marginBottom: -4,
    paddingRight: 8,
  },
  statusIcon: {
    width: 10,
    fontSize: 15,
  },
};
const styles = StyleSheet.create({
  wrap: commonStyle.wrap,
  wrapSelf: {
    ...commonStyle.wrap,
    justifyContent: 'flex-end',
    paddingLeft: 2.5,
    paddingRight: 10,
  },
  box: commonStyle.box,
  boxSelf: {
    ...commonStyle.box,
    backgroundColor: '#ebebeb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 9,
  },
  noBox: {
    padding: 9,
    maxWidth: 290,
  },
  header: {
    flexDirection: 'row',
    height: 15,
  },
  headerTitle: {
    color: variable.brandPrimary,
    fontSize: 12,
  },
  replyToTouch: {
    height: 45,
  },
  replyToWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  replyImage: {
    width: 35,
    height: 35,
    borderRadius: 4,
  },
  replyToTitle: {
    color: variable.brandPrimary,
    fontSize: 12,
  },
  replyToMessage: {
    fontSize: 12,
  },
  attachmentBox: {},
  mediaWrap: {},
  imageRound: commonStyle.image,
  imageRoundSelf: {
    ...commonStyle.image,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 9,
  },
  imageRoundTop: {
    ...commonStyle.image,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  imageRoundTopSelf: {
    ...commonStyle.image,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 9,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  imageRoundBottom: {
    ...commonStyle.image,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  imageFlat: {
    borderRadius: 4,
  },
  fileWrap: {},
  fileBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 7,
  },
  fileName: {
    color: variable.brandPrimary,
    fontSize: 13,
  },
  fileInfo: {
    fontSize: 11,
    color: '#838c96',
  },
  textBox: {

  },
  text: {
    position: 'relative',
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
  footer: commonStyle.footer,
  footerSelf: {
    ...commonStyle.footer,
    paddingRight: 0,
  },
  statusIconDeliver: {
    ...commonStyle.statusIcon,
    color: '#838c96',
  },
  statusIconSeen: {
    ...commonStyle.statusIcon,
    color: variable.brandPrimary,
  },
  statusIconFailed: {
    ...commonStyle.statusIcon,
    color: variable.brandDanger,
  },
});

export default styles;

export const wrapSelf = StyleSheet.flatten([styles.wrap, styles.wrapSelf]);
export const boxSelf = StyleSheet.flatten([styles.box, styles.boxSelf]);
export const imageSelf = StyleSheet.flatten([styles.image, styles.imageSelf]);
export const footerSelf = StyleSheet.flatten([styles.footer, styles.footerSelf]);
export const timeSelf = StyleSheet.flatten([styles.time, styles.timeSelf]);
