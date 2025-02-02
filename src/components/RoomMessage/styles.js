import {StyleSheet} from 'react-native';
import variable from '../../theme/variables/material';

const commonStyle = {
  wrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2.5,
    paddingLeft: 10,
    width: 360,
  },
  box: {
    padding: 2,
    maxWidth: 320,
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
    borderRadius: 20,
    borderTopLeftRadius: 9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
    paddingLeft: 5,
    alignSelf: 'flex-end',
    borderRadius: 7,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 9,
  },
  imageFlatTop: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  imageFlatBottom: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
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
    fontSize: 14,
  },
  footer: commonStyle.footer,
  footerMedia: {
    ...commonStyle.footer,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  timeWrap: {
    fontSize: 11,
    color: '#4e525a',
    textAlign: 'right',
  },
  timeWrapMedia: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'right',
  },
  statusWrap: {
    fontSize: 11,
    color: '#838c96',
    textAlign: 'right',
    marginLeft: 5,
  },
  statusWrapMedia: {
    fontSize: 11,
    color: '#fff',
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
  mediaFooterWrap: {
    marginTop: -18,
    paddingBottom: 3,
    paddingRight: 7,
  },
});

export default styles;
