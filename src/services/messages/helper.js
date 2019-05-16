import {getMessage} from '../../selector/messages';
import {getStoreState} from '../../redux/configureStore';
import rnTextSize from 'react-native-text-size';
import {floor} from 'lodash';

export function getMessageBoxRules(id, roomType) {
  const message = getMessage(getStoreState(), id);
  return {
    isOutbox: roomType === 'CHANNEL' || !message.out,
    hasBox: message.type !== 'STICKER',
    hasHeader: !!message.forwardFrom || (!message.out && roomType !== 'USER' && (!message.attachment || !!message.replyTo)),
    hasReply: !!message.replyTo,
    hasAttachment: !!message.attachment,
    isMedia: ['PHOTO', 'VIDEO', 'GIF', 'LOCATION'].includes(message.type) && !!message.attachment.thumbs.medium,
    isFile: message.type === 'FILE',
    isAudio: message.type === 'VOICE',
    hasText: !!message.text,
  };
}

export function getMessageType(id, roomType) {
  const style = getMessageBoxRules(id, roomType);
  return [
    style.isOutbox ? 1 : 0,
    style.hasBox ? 1 : 0,
    style.hasHeader ? 1 : 0,
    style.hasReply ? 1 : 0,
    style.isMedia ? 1 : 0,
    style.isFile ? 1 : 0,
    style.isAudio ? 1 : 0,
    style.hasText ? 1 : 0,
  ].join('');
}

export function getMessageBoxSize(id, roomType) {
  const style = getMessageBoxRules(id, roomType);
  const message = getMessage(getStoreState(), id);
  const sizes = {wrap: 5, box: 4, header: 15, reply: 45, media: 1, file: 60, audio: 60, text: 1, footer: 20};
  let height = sizes.wrap;

  height += sizes.box;

  if (style.hasHeader) {
    height += sizes.header;
  }
  if (style.hasReply) {
    height += sizes.reply;
  }
  if (style.isMedia) {
    height += message.attachment.thumbs.medium.height - 4;
  }
  if (style.isFile) {
    height += sizes.file;
  }
  if (style.isAudio) {
    height += sizes.audio;
  }
  if (style.hasText) {
    height += floor(message.box.textHeight);
  }
  if (style.hasText || !style.isMedia) {
    height += sizes.footer;
  }
  return height;
}

export function textHeights(texts, width) {
  return rnTextSize.flatHeights({
    text: texts,
    width,
    fontSize: 14,
  });
}
