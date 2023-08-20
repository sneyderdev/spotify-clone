import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: Array<ClassValue>) => twMerge(clsx(...classes));
