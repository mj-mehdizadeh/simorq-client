import {getMessageIdByRandId} from '../../selector/messages';
import {getStoreState} from '../../redux/configureStore';
import {getRoomByChatId} from '../../selector/rooms';
import {putMessages} from './dispatcher';

export async function onNewMessage(message) {
  const messageId = getMessageIdByRandId(getStoreState(), message.randomId);
  if (messageId && messageId !== message.id) {
    return;
  }
  const room = getRoomByChatId(getStoreState(), message.chatId);
  if (!room) {
    // todo getRoom by chatId
    // await fetchRoomByChatId
  }
  putMessages([message]);
}
