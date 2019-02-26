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
});
