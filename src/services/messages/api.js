import Api from '../../utils/api';
import {MESSAGE_NEW, MESSAGES} from '../../constant/methods';
import {HISTORY_PAGINATION} from '../../constant/app';
import {deleteMessage, putMessages} from './dispatcher';

const _END_OF_SCROLL = {};

export async function fetchHistory(roomId, from, direction) {
  if (_END_OF_SCROLL[roomId]) {
    return;
  }
  const messages = await Api.get(MESSAGES, {roomId, from, direction, limit: HISTORY_PAGINATION}, {toastError: true});
  putMessages(messages);
  _END_OF_SCROLL[roomId] = !messages.length;
}

export async function postNewMessage(message, params) {
  putMessages([message], false);
  const response = await Api.post(MESSAGE_NEW, {
    room_id: params.roomId,
    random_id: message.randomId,
    text: message.text,
  }, {toastError: true});
  deleteMessage(message.id, response.chatId);
  putMessages([response]);
}
