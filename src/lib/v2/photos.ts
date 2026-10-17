// Echte Fotos aus dem Shooting (public/v2/). Alt-Texte beschreiben nur, was zu sehen ist.
export const PHOTOS = {
  portrait: { src: '/v2/dj-raphx-portrait-kaernten.png', width: 1080, height: 1350, alt: 'DJ RAPHX (Raphael Taxer) mit Kopfhörern um den Hals vor schwarzem Hintergrund' },
  about: { src: '/v2/raphael-taxer-dj-feffernitz.png', width: 1874, height: 1874, alt: 'Porträt von DJ Raphael Taxer (RAPHX) aus Feffernitz' },
  arme: { src: '/v2/dj-raphx-arme-verschraenkt.jpg', width: 1024, height: 1534, alt: 'DJ RAPHX lehnt mit verschränkten Armen und Kopfhörern um den Hals an einem Hocker' },
  kopfhoerer: { src: '/v2/dj-raphx-kopfhoerer-portrait.jpg', width: 1024, height: 1536, alt: 'DJ RAPHX hält die Kopfhörer an den Ohren und lächelt in die Kamera' },
  smartphone: { src: '/v2/dj-raphx-logo-smartphone.jpg', width: 1024, height: 1536, alt: 'DJ RAPHX hält ein Smartphone mit dem DJ-RAPHX-Logo in die Kamera' },
  controllerSw: { src: '/v2/dj-raphx-haende-controller-sw.jpg', width: 1024, height: 685, alt: 'Schwarz-Weiß-Aufnahme: Hände am DJ-Controller' },
  regler: { src: '/v2/dj-raphx-hand-regler-nahaufnahme.jpg', width: 1024, height: 1535, alt: 'Nahaufnahme einer tätowierten Hand an den Reglern eines DJ-Controllers' },
  tattooSw: { src: '/v2/dj-raphx-tattoo-haende-sw.jpg', width: 1024, height: 1536, alt: 'Schwarz-Weiß-Aufnahme: beide tätowierten Unterarme über dem DJ-Pult' },
  mixerSw: { src: '/v2/dj-raphx-haende-mixer-sw.jpg', width: 1024, height: 1536, alt: 'Schwarz-Weiß-Aufnahme: Hände am Mixer, Tattoos an beiden Unterarmen' },
  amController: { src: '/v2/dj-raphx-am-controller.jpg', width: 1024, height: 1536, alt: 'DJ RAPHX steht mit Kopfhörer am Ohr hinter dem DJ-Controller' },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export const GALLERY_KEYS: PhotoKey[] = ['kopfhoerer', 'controllerSw', 'arme', 'regler', 'smartphone', 'mixerSw', 'amController', 'tattooSw'];
