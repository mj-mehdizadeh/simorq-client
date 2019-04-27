import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerWrap: {
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    position: 'absolute',
    zIndex: 15,
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  headerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  headerTitleWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  headerThumb: {
    width: 35,
    height: 24,
  },
  headerTitle: {
    color: '#202020',
    fontSize: 16,
    paddingLeft: 0,
  },
  headerSubTitle: {
    color: '#565656',
    fontSize: 12,
    textAlign: 'left',
  },
  headerIcon: {
    color: '#202020',
  },
})
;
