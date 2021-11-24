import get from 'lodash/get'
import locale from '../locales'

export type LocaleType = 'enUS' | 'thTH'
export type AllLocaleCode = keyof typeof locale.enUS
export type LocaleCode = {
  [key in LocaleType]: LocaleType
}
export type TranslationType = 'DEFAULT' | 'PLURAL'

interface TranslationOptions {
  type?: TranslationType
  plural?: boolean
}

export const localeCode: LocaleCode = {
  enUS: 'enUS',
  thTH: 'thTH',
}

const localeEn: any = locale.enUS
const localeTh: any = locale.thTH

export const keyWithPlural = (key: string, type: TranslationType = 'DEFAULT', plural?: boolean) => {
  if (type === 'PLURAL') {
    if (plural) {
      return key + '.plural'
    }

    return key + '.regular'
  }

  return key
}

export const translation = (key: string, lang: LocaleType = 'thTH', options?: TranslationOptions) => {
  const localeIsEn = lang === localeCode.enUS
  const withPlural = keyWithPlural(key, options?.type, options?.plural)

  if (localeIsEn) {
    return get(localeEn, withPlural)
  }

  return get(localeTh, withPlural)
}
