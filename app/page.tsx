import { client } from '@/sanity/client';
import {
  FEATURED_ARTICLE_QUERY,
  RECENT_ARTICLES_QUERY,
  REGULATORY_LIST_QUERY,
  RESEARCH_QUERY,
  RECENT_IPO_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/queries';
import Nav               from '@/components/Nav';
import Hero              from '@/components/Hero';
import Ticker            from '@/components/Ticker';
import InsightsSection   from '@/components/InsightsSection';
import RegulatorySection from '@/components/RegulatorySection';
import ResearchSection   from '@/components/ResearchSection';
import IpoSection        from '@/components/IpoSection';
import AboutSection      from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection    from '@/components/ContactSection';
import Footer            from '@/components/Footer';
import ScrollReveal      from '@/components/ScrollReveal';

// Revalidate every 60 seconds (ISR — content stays fresh without full rebuild)
export const revalidate = 60;

export default async function HomePage() {
  const [featured, articles, regulatory, research, ipos, settings] = await Promise.all([
    client.fetch(FEATURED_ARTICLE_QUERY).catch(() => null),
    client.fetch(RECENT_ARTICLES_QUERY).catch(() => []),
    client.fetch(REGULATORY_LIST_QUERY).catch(() => []),
    client.fetch(RESEARCH_QUERY).catch(() => []),
    client.fetch(RECENT_IPO_QUERY).catch(() => []),
    client.fetch(SITE_SETTINGS_QUERY).catch(() => null),
  ]);

  return (
    <>
      <Nav settings={settings} />

      <main>
        <Hero />
        <Ticker />
        <InsightsSection featured={featured} articles={articles} />
        <RegulatorySection items={regulatory} />
        <ResearchSection items={research} />
        {ipos.length > 0 && <IpoSection ipos={ipos} />}
        <AboutSection />
        <NewsletterSection settings={settings} />
        <ContactSection settings={settings} />
      </main>

      <Footer settings={settings} />
      <ScrollReveal />
    </>
  );
}
