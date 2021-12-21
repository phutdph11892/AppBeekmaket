import {format, register} from 'timeago.js';
import localeFunc from './formatTime';
register('my-locale', localeFunc);

export const formatTimeAgo = value => {
  return format(value, 'my-locale');
};
