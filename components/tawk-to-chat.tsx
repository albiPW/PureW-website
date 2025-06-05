'use client';

import { useEffect } from 'react';
import { tawkToConfig } from '@/config/tawk-to';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkToChat() {
  useEffect(() => {
    // Inizializza le variabili globali di Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Configura le opzioni di Tawk.to
    window.Tawk_API.onLoad = function() {
      console.log('Tawk.to loaded successfully');
    };

    window.Tawk_API.onError = function(error: any) {
      console.error('Tawk.to error:', error);
    };

    // Funzione di inizializzazione
    (function() {
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];
      
      s1.async = true;
      s1.src = `https://embed.tawk.to/${tawkToConfig.propertyId}/${tawkToConfig.widgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      s1.onload = () => {
        console.log('Tawk.to script loaded successfully');
      };
      
      s1.onerror = (error) => {
        console.error('Error loading Tawk.to script:', error);
      };
      
      if (s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      }
    })();

    // Cleanup
    return () => {
      const script = document.querySelector(`script[src*="tawk.to"]`);
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
} 