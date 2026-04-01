export * from './vowels'
export * from './initials'
export * from './syllables'
export * from './questions'

import { allVowels, vowelCategories } from './vowels'
import { allInitials, initialCategories } from './initials'
import { wholeSyllables, toneNames, toneDescriptions, toneSymbols } from './syllables'

export const pinyinOverview = {
  vowels: {
    total: allVowels.length,
    categories: Object.keys(vowelCategories).length,
  },
  initials: {
    total: allInitials.length,
    categories: Object.keys(initialCategories).length,
  },
  wholeSyllables: {
    total: wholeSyllables.length,
  },
  tones: {
    total: 4,
    names: toneNames,
    descriptions: toneDescriptions,
    symbols: toneSymbols,
  },
}

export const pinyinTable = {
  vowels: allVowels,
  initials: allInitials,
  wholeSyllables,
}
