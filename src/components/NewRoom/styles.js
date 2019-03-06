import {StyleSheet} from 'react-native';
import variable from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    zIndex: 10,
  },
  header: {
    borderBottomColor: variable.listBorderColor,
    borderBottomWidth: variable.borderWidth,
  },
  newFormWrap: {
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
});
