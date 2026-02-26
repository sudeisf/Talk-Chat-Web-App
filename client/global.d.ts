import type { IStaticMethods } from 'preline/dist';

declare module '@dnd-kit/core';

declare global {
  interface Window {
    noUiSlider: typeof noUiSlider;
    _: typeof _;
    $: typeof $;
    jQuery: typeof $;
    DataTable: any;
    VanillaCalendarPro: typeof VanillaCalendarPro;
    HSStaticMethods?: {
      autoInit?: () => void;
    };
  }
}

export {};
