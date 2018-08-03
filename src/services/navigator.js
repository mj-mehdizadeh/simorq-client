import {NavigationActions, StackActions} from 'react-navigation';
import type {NavigationParams, NavigationRoute} from 'react-navigation';

let _container;

/**
 * set navigation container
 * @param {Object} container
 */
export function setContainer(container) {
  _container = container;
}

/**
 * @param {string} routeName
 * @param {NavigationParams} params
 */
export function resetNavigate(routeName, params) {
  _container.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    }),
  );
}

/**
 * @param {string} routeName
 * @param {NavigationParams} params
 */
export function navigate(routeName, params) {
  _container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    }),
  );
}

/**
 * @param {{routeName: string, params?: NavigationParams}[]} actions
 */
export function navigateDeep(actions) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

/**
 * @returns {NavigationRoute | null}
 */
export function getCurrentRoute() {
  if (!_container || !_container.state.nav) {
    return null;
  }
  return _container.state.nav.routes[_container.state.nav.index] || null;
}

/**
 *
 */
export function goBack() {
  _container.dispatch(
    NavigationActions.back(),
  );
}
