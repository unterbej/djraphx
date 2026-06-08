const s = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const IcoPlus = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const IcoEdit = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export const IcoTrash = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

export const IcoSave = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

export const IcoClose = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const IcoCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const IcoChevronDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export const IcoChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export const IcoDrag = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
    <rect x="3" y="2" width="2" height="2" rx="1"/>
    <rect x="9" y="2" width="2" height="2" rx="1"/>
    <rect x="3" y="6" width="2" height="2" rx="1"/>
    <rect x="9" y="6" width="2" height="2" rx="1"/>
    <rect x="3" y="10" width="2" height="2" rx="1"/>
    <rect x="9" y="10" width="2" height="2" rx="1"/>
  </svg>
);

export const IcoUser = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export const IcoImage = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

export const IcoRefresh = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...s}>
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
