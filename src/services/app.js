import {DEFAULT_COLOR, MATERIAL_COLORS} from '../constant/app';

export function mkColor(id) {
  const index = parseInt(id.substr(-1), 16);
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