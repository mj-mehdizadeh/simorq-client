import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  history: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#f7f7f7',
    zIndex: 1000,
    elevation: 3,
    transform: [
      {
        translateX: 360,
      },
    ],
  },
  hide: {
    zIndex: 0,
    display: 'none',
  },
});
