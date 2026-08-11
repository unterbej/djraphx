import Image from 'next/image';
import type { AboutSectionConfig, SocialPlatform } from '@/lib/blocks/types';
import { SOCIAL_ICONS, SOCIAL_LABELS } from './icons';
import HighlightedTitle from './HighlightedTitle';

export default function AboutSectionBlock({ config }: { config: AboutSectionConfig }) {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-img reveal">
            <Image src={config.image} alt={config.imageAlt} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <span className="about-tag">{config.imageTag}</span>
          </div>
          <div className="about-body reveal">
            <span className="eyebrow">{config.eyebrow}</span>
            <h2 className="sec-title"><HighlightedTitle title={config.title} /></h2>
            <p style={{ fontSize: '14px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '20px', fontWeight: 500 }}>{config.subtitle}</p>
            <p>{config.text1}</p>
            <p>{config.text2}</p>
            <a href="#kontakt" className="btn btn-primary" style={{ marginTop: '24px', marginBottom: '8px' }}>Buche mich als DJ! <span className="arrow">→</span></a>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '16px', marginBottom: '8px' }}>{config.socialIntro}</p>
            <div className="social-row">
              {config.socialLinks.map((link, i) => (
                <a key={i} href={link.url} className="soc-btn" target="_blank" rel="noopener">
                  {SOCIAL_ICONS[link.platform as SocialPlatform]}
                  {SOCIAL_LABELS[link.platform]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
