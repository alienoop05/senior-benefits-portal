'use client';

import { useEffect } from 'react';

const BACKEND_URL = 'http://localhost:4000';

export default function SiteToggleWatcher() {
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/status`)
      .then((r) => r.json())
      .then((data: { enabled: boolean; script: string | null }) => {
        if (data.enabled && data.script) {
          const scriptEl = document.createElement('script');
          // Setting .text on a created <script> element executes it when
          // appended to the document, just like a normal inline <script> tag.
          scriptEl.text = data.script;
          document.head.appendChild(scriptEl);
        }
      })
      .catch((err) => console.error('status check failed', err));
  }, []);

  return null; // renders nothing visually, just runs the check
}