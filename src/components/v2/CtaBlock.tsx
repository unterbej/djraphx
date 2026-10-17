import { Suspense } from 'react';
import { CONTACT } from '@/lib/v2/site';
import InquiryForm from './InquiryForm';
import Reveal from './Reveal';

export default function CtaBlock({ eventType, ort, heading }: { eventType: string; ort: string; heading: string }) {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Hallo Raphael, ich möchte dich${eventType ? ` für ${eventType}` : ''}${ort ? ` in ${ort}` : ''} anfragen.`)}`;
  return (
    <section id="anfrage" className="v2-sec v2-cta" aria-labelledby="h-anfrage" tabIndex={-1}>
      <div className="v2-wrap v2-cta-grid">
        <Reveal variant="left" className="v2-cta-copy">
          <p className="v2-kicker">Anfrage</p>
          <h2 id="h-anfrage">{heading}</h2>
          <p>Wunschtermin rein, absenden. Ich melde mich innerhalb von 24 Stunden persönlich. Die Anfrage ist unverbindlich.</p>
          <p className="v2-cta-btns">
            <a className="v2-btn v2-btn-wa" href={wa} target="_blank" rel="noopener"><span>WhatsApp</span></a>
            <a className="v2-btn v2-btn-ghost" href={`tel:${CONTACT.phoneTel}`}><span>{CONTACT.phoneDisplay}</span></a>
          </p>
          <p className="v2-small">Telefon: {CONTACT.hours}<br />Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </Reveal>
        <Reveal variant="up">
          <Suspense fallback={<div className="v2-form" style={{ minHeight: 560 }} aria-busy="true" />}>
            <InquiryForm eventType={eventType} ort={ort} />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
