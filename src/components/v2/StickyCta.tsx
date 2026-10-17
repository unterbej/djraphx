import { CONTACT } from '@/lib/v2/site';

// Reines HTML/CSS – nur auf Mobile sichtbar, kein Client-JS.
export default function StickyCta() {
  return (
    <div className="v2-sticky" role="group" aria-label="Schnellkontakt">
      <a className="v2-sticky-wa" href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
      <a className="v2-sticky-tel" href={`tel:${CONTACT.phoneTel}`}>Anrufen</a>
    </div>
  );
}
