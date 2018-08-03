import variable from './../variables/platform';

export default (variables = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding,
    },
    '.br': {
      height: 5,
    },
  };

  return viewTheme;
};
