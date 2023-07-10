import { useMemo } from 'react';

import cnpjMask from './cnpj';
import cpfMask from './cpf';
import documentMask from './document';
import moneyMask from './money';
import phoneMask from './phone';
import zipcodeMask from './zipcode';

export interface MaskAdapter {
  apply(value: string | number | undefined | null): string | null | undefined;
  clean(value: string): string | number | null;
}

const buildInMasks = {
  cnpj: cnpjMask,
  cpf: cpfMask,
  document: documentMask,
  money: moneyMask,
  phone: phoneMask,
  zipcode: zipcodeMask
} as const;

export type BuildInMasks = keyof typeof buildInMasks;

export default function useMask(mask: BuildInMasks | MaskAdapter | undefined, value: any) {
  const { apply: maskApply, clean: maskClean } = useMemo<MaskAdapter>(() => {
    const maskFunction = typeof mask === 'string' ? buildInMasks[mask] : mask;
    return maskFunction ?? ({ apply: v => v, clean: v => v } as MaskAdapter);
  }, [mask]);

  const maskedValue = useMemo(() => (maskApply ? maskApply(value) : value), [value, maskApply]);
  const cleanedValue = useMemo(() => (maskClean ? maskClean(value) : value), [value, maskClean]);

  return { maskApply, maskClean, maskedValue, cleanedValue };
}
