import {getStoreState, storeDispatch} from '../../redux/configureStore';
import Creators from '../../redux/messages';
import {forIn, groupBy, keyBy, map, uniq} from 'lodash';
import {getMe} from '../../utils/client';
import {getRoom} from '../../selector/rooms';
import {fetchRoomByIds} from '../rooms';
import {textHeights} from './helper';

export async function putMessages(messages, check = true) {
  const messagesList = normalizeMessages(messages);
  if (check) {
    checkMessagesRoom(messagesList);
    await calculateWidth(messagesList);
  }
  return storeDispatch(
    Creators.appendMessages(messagesList),
  );
}

export function deleteMessage(id, chatId) {
  return storeDispatch(
    Creators.deleteMessage(id, chatId)
  );
}

/* ------------- Normalizer ------------- */

export function normalizeMessages(messages) {
  return keyBy(
    map(messages, normalizeMessage),
    'id',
  );
}

export function normalizeMessage(message) {
  return {
    ...message,
    out: message.roomId === getMe('roomId'),
    box: {
      maxWidth: message.attachment && message.attachment.thumbs.medium ? message.attachment.thumbs.medium.width : 320,
      textHeight: 0,
    },
  };
}

export async function checkMessagesRoom(messages) {
  const roomIds = [];
  forIn(messages, message => {
    if (message.roomId && !getRoom(getStoreState(), message.roomId)) {
      roomIds.push(message.roomId);
    }
  });
  if (roomIds.length) {
    await fetchRoomByIds(uniq(roomIds));
  }
}

export async function calculateWidth(messages) {
  const promises = map(groupBy(messages, 'box.maxWidth'), async (list, maxWidth) => {
    return calcGroupMessage(list, maxWidth);
  });
  await Promise.all(promises);
}

async function calcGroupMessage(list, maxWidth) {
  const heights = await textHeights(map(list, item => item.text || '1'), parseInt(maxWidth, 10));
  heights.forEach((height, index) => {
    list[index].box.textHeight = list[index].text ? height : 0;
  });
}
