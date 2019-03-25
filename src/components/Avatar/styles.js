import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  'small': {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  'medium': {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  'text-small': {},
  'text-medium': {
    fontSize: 23,
    height: 35,
    lineHeight: 33,
  },
});
