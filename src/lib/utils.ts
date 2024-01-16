import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, '__');
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sorterIds = [id1, id2].sort();
  return `${sorterIds[0]}--${sorterIds[1]}`;
}
