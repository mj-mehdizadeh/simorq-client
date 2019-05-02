import {getMessageIdByRandId} from '../../selector/messages';
import {getStoreState} from '../../redux/configureStore';
import {getRoomByChatId} from '../../selector/rooms';
import {putMessages} from './dispatcher';
import {fetchRoom} from '../rooms';

export async function onNewMessage(message) {
  const messageId = getMessageIdByRandId(getStoreState(), message.randomId);
  if (messageId && messageId !== message.id) {
    return;
  }
  if (!getRoomByChatId(getStoreState(), message.chatId)) {
    await fetchRoom({chatId: message.chatId});
  }
  putMessages([message]);
}
