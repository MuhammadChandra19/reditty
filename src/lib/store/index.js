import { create } from 'zustand';

/** @typedef { "Card" | "Compact" | "Classic" } CardType */

/**
 * @typedef { Object } Actions
 * @property { (type: CardType) => void } setCardType
 */

/**
 * @typedef { Object } State
 * @property { CardType } cardType
 */

/** @type { import("zustand").UseBoundStore<import("zustand").StoreApi<State & Actions>} */
export const useStore = create((set) => ({
  cardType: 'Card',
  setCardType: (type) => set(() => ({ cardType: type })),
}));
