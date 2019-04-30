import {getMessage} from '../../selector/messages';
import {getStoreState} from '../../redux/configureStore';

export function getMessageBoxRules(id, roomType) {
  const message = getMessage(getStoreState(), id);
  return {
    isOutbox: roomType === 'CHANNEL' || !message.out,
    hasBox: message.type !== 'STICKER',
    hasHeader: !!message.forwardFrom || (!message.out && roomType !== 'USER' && (!message.attachment || !!message.replyTo)),
    hasReply: !!message.replyTo,
    hasAttachment: !!message.attachment,
    isMedia: ['PHOTO', 'VIDEO', 'GIF', 'LOCATION'].includes(message.type),
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
  const sizes = {wrap: 0, box: 4, header: 20, reply: 40, media: 1, file: 40, audio: 40, text: 1, footer: 20};
  let height = 0;

  height += sizes.box;

  if (style.hasHeader) {
    height += sizes.header;
  }
  if (style.hasReply) {
    height += sizes.reply;
  }
  if (style.isMedia) {
    height += message.attachment.thumbs.medium.height;
  }
  if (style.isFile) {
    height += sizes.file;
  }
  if (style.isAudio) {
    height += sizes.audio;
  }
  if (style.hasText) {
    // todo height += calculate text;
  }
  if (style.hasText || !style.isMedia) {
    height += sizes.footer;
  }
  return height;
}
