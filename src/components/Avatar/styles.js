import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  'x-small': {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  'small': {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  'medium': {
    width: 50,
    height: 50,
    borderRadius: 27.5,
  },

  'text-x-small': {
    color: '#fff',
  },
  'text-small': {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  'text-medium': {
    color: '#fff',
    fontSize: 18,
    lineHeight: 30,
  },
});
