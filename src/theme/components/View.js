import variable from './../variables/platform';

export default (variables = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding,
    },
    '.br': {
      height: 5,
    },
    '.divider': {
      shadowColor: '#c6c6c6',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 0.5,
      elevation: 1,
      marginVertical: 5,
      marginHorizontal: 0,
    },
  };

  return viewTheme;
};
