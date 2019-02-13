import {StyleSheet} from 'react-native';
import variable from '../../theme/variables/material';

const styles = StyleSheet.create({
  wrap: {
    transform: [{scaleY: -1}],
    flex: 1,
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
    padding: 10,
    maxWidth: 290,
    backgroundColor: '#fff',
    shadowColor: '#d9d9d9',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 1,
    borderRadius: 19,
    borderTopLeftRadius: 8,
  },
  boxSelf: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 8,
  },
  image: {
    width: 276,
    height: 276,
    margin: -8,
    marginBottom: 6,
    borderRadius: 6,
    borderTopRightRadius: 15,
  },
  imageSelf: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 6,
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
  },
  footerSelf: {
    color: '#be8081',
  },
  statusIcon: {
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
