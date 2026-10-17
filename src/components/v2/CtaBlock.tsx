import { Suspense } from 'react';
import { CONTACT } from '@/lib/v2/site';
import InquiryForm from './InquiryForm';

export default function CtaBlock({ eventType, ort, heading }: { eventType: string; ort: string; heading: string }) {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Hallo Raphael, ich möchte dich${eventType ? ` für ${eventType}` : ''}${ort ? ` in ${ort}` : ''} anfragen.`)}`;
  return (
    <section id="anfrage" className="v2-section v2-cta" aria-labelledby="cta-h">
      <div className="v2-wrap v2-cta-grid">
        <div>
          <h2 id="cta-h">{heading}</h2>
          <p>Schick mir deinen Wunschtermin – ich melde mich innerhalb von 24 Stunden persönlich zurück. Die Anfrage ist unverbindlich.</p>
          <p className="v2-cta-btns">
            <a className="btn btn-wa" href={wa} target="_blank" rel="noopener">Per WhatsApp schreiben</a>
            <a className="btn btn-ghost" href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
          </p>
          <p className="v2-small">Telefonisch erreichbar: {CONTACT.hours}<br />E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </div>
        <Suspense fallback={<div className="v2-form" style={{ minHeight: 560 }} aria-busy="true" />}>
          <InquiryForm eventType={eventType} ort={ort} />
        </Suspense>
      </div>
    </section>
  );
}
