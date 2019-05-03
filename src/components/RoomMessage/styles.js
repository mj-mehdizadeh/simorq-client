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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingLeft: 5,
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
    backgroundColor: '#f0f0f0',
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
    paddingLeft: 5,
    paddingRight: 10,
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
  fileWrap: {
    minWidth: 100,
    padding: 7,
  },
  fileBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  fileLeft: {
    width: 50,
  },
  downloadBtn: {
    width: 45,
    height: 45,
    padding: 0,
  },
  downloadBtnIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  fileBody: {
    maxWidth: 240,
  },
  fileName: {
    color: variable.brandPrimary,
    paddingRight: 14,
    fontSize: 15,
    paddingBottom: 3,
  },
  fileInfo: {
    fontSize: 11,
    color: '#838c96',
  },
  textBox: {
    padding: 3,
    paddingRight: 7,
    paddingBottom: 0,
  },
  textBoxSelf: {
    paddingLeft: 3,
    paddingRight: 7,
  },
  text: {
    position: 'relative',
    flexDirection: 'row',
  },
  footer: commonStyle.footer,
  footerSelf: {
    ...commonStyle.footer,
    paddingRight: 5,
    paddingLeft: 10,
  },
  timeWrap: {
    fontSize: 11,
    color: '#838c96',
    textAlign: 'right',
  },
  statusWrap: {
    fontSize: 11,
    color: '#838c96',
    textAlign: 'right',
    marginLeft: 5,
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
