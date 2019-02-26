import {StyleSheet} from 'react-native';
import variable from '../../theme/variables/material';

const styles = StyleSheet.create({
  wrap: {
    transform: [{scaleY: -1}],
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2.5,
    paddingLeft: 10,
  },
  wrapSelf: {
    transform: [{scaleY: -1}],
    justifyContent: 'flex-end',
    paddingLeft: 2.5,
    paddingRight: 10,
  },
  box: {
    padding: 9,
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
  boxSelf: {
    backgroundColor: '#ebebeb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 9,
  },
  image: {
    width: 276,
    height: 276,
    margin: -8,
    marginBottom: 6,
    borderRadius: 9,
    borderTopRightRadius: 20,
  },
  imageSelf: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 9,
  },
  content: {
    // backgroundColor: 'yellow',
  },
  text: {
    position: 'relative',
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
  footer: {
    fontSize: 11,
    color: '#838c96',
    textAlign: 'right',
    marginBottom: -4,
    paddingRight: 8,
  },
  footerSelf: {
    paddingRight: 0,
  },
  statusIconDeliver: {
    width: 10,
    fontSize: 15,
    color: '#838c96',
  },
  statusIconSeen: {
    width: 10,
    fontSize: 15,
    color: variable.brandPrimary,
  },
});

export default styles;

export const wrapSelf = StyleSheet.flatten([styles.wrap, styles.wrapSelf]);
export const boxSelf = StyleSheet.flatten([styles.box, styles.boxSelf]);
export const imageSelf = StyleSheet.flatten([styles.image, styles.imageSelf]);
export const footerSelf = StyleSheet.flatten([styles.footer, styles.footerSelf]);
export const timeSelf = StyleSheet.flatten([styles.time, styles.timeSelf]);
