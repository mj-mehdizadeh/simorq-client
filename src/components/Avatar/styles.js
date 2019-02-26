import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  'small': {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  'medium': {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  'text-small': {},
  'text-medium': {
    fontSize: 20,
    height: 35,
    lineHeight: 33,
  },
});
