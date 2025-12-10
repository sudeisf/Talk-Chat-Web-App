'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Optional third-party libraries
import $ from 'jquery';
import _ from 'lodash';
import noUiSlider from 'nouislider';
import 'datatables.net';
import 'dropzone/dist/dropzone-min.js';
import * as VanillaCalendarPro from 'vanilla-calendar-pro';

// Guard all window globals for safety
if (typeof window !== 'undefined') {
  // Expose libs to Preline/other scripts
  (window as any)._ = _;
  (window as any).$ = $;
  (window as any).jQuery = $;
  (window as any).DataTable = ($ as any).fn.dataTable;
  (window as any).noUiSlider = noUiSlider;
  (window as any).VanillaCalendarPro = VanillaCalendarPro;

  // Preline sometimes expects this collection; ensure it's at least an array
  if (!(window as any).$hsOverlayCollection) {
    (window as any).$hsOverlayCollection = [];
  }
}

// Preline UI
async function loadPreline() {
  // Ensure the expected global collection exists before Preline runs
  if (typeof window !== 'undefined') {
    (window as any).$hsOverlayCollection = (window as any).$hsOverlayCollection || [];
  }

  return import('preline/dist/index.js');
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();
    };

    initPreline();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === 'function'
      ) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, [path]);

  return null;
}
