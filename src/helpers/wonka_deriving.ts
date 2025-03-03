import { __ as block } from 'bs-platform/lib/es6/block';
import { talkbackPlaceholder } from './wonka_helpers.bs';
import * as types from '../wonka_types.gen';

type talkbackCb = (tb: types.talkbackT) => void;

export const pull = (0 as any as types.talkbackT);
export const close = (1 as any as types.talkbackT);

export const start = <a>(tb: talkbackCb): types.signalT<a> => block(0, [tb]) as any;
export const push = <a>(x: a): types.signalT<a> => block(1, [x]) as any;
export const end = <a>(): types.signalT<a> => 0 as any;

export const isStart = <a>(s: types.signalT<a>) =>
  typeof s !== 'number' && (s as any).tag === 0;
export const isPush = <a>(s: types.signalT<a>) =>
  typeof s !== 'number' && (s as any).tag === 1;
export const isEnd = <a>(s: types.signalT<a>) =>
  typeof s === 'number' && (s as any) === 0;

export const unboxPush = <a>(s: types.signalT<a>): a | null =>
  isPush(s) ? (s as any)[0] : null;
export const unboxStart = <a>(s: types.signalT<a>): talkbackCb =>
  isStart(s) ? (s as any)[0] : (talkbackPlaceholder as any);
