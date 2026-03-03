import type { IStaticMethods } from 'preline/dist';

declare module '@dnd-kit/core';

declare module '@uiw/react-heat-map' {
  import * as React from 'react';

  export interface HeatMapValue {
    date: string;
    count: number;
  }

  export interface HeatMapProps extends React.SVGProps<SVGSVGElement> {
    value?: HeatMapValue[];
    startDate?: Date;
    endDate?: Date;
    rectSize?: number;
    space?: number;
    rectProps?: React.SVGProps<SVGRectElement>;
    legendCellSize?: number;
    panelColors?: string[] | Record<number, string>;
    weekLabels?: string[];
    monthLabels?: string[];
    monthPlacement?: 'top' | 'bottom';
  }

  const HeatMap: React.FC<HeatMapProps>;
  export default HeatMap;
}

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
