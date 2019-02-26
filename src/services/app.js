import {DEFAULT_COLOR, MATERIAL_COLORS} from '../constant/app';
import {API_BASE_URL} from '../constant/config';

export function mkColor(id) {
  let index = parseInt(id.substr(-1), 16);
  index = index >= 8 ? index - 8 : index;
  return index >= 0 ? MATERIAL_COLORS[index] : DEFAULT_COLOR;
}

export function mkInitials(title) {
  const names = title.split(' ');
  let initials = names[0]
    .substring(0, 1)
    .toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1]
      .substring(0, 1)
      .toUpperCase();
  }
  return initials;
}

export function generateFileUri(token) {
  return `${API_BASE_URL}download/${token}`;
}
