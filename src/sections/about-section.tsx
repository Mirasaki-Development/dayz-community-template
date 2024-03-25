'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { config } from '../../config';
import SpotlightBackgroundContent from '@/components/spotlight/spotlight-bg-content';
import AboutRow from '@/components/about/about-row';
import { TracingBeam } from '@/components/spotlight/tracing-beam';

const AboutSection = () => {
  return (
    <SpotlightBackgroundContent
      wrapperClassName='w-full'
      className='w-full'
    >
      <section
        className={cn(
          'py-8 md:py-16 lg:py-28 px-1 sm:px-2 md:px-4 border-t border-b w-full',
          'relative z-10 overflow-hidden',
        )}
        id='about'
      >
        <h2 className='mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center'>
          {config.pages.home.sections.about.title}
        </h2>

        <p className='mb-6 text-lg font-normal text-gray-700 dark:text-gray-400 text-center max-w-xl mx-auto'>
          {config.pages.home.sections.about.description}
        </p>

        <TracingBeam beamClassName='hidden lg:block'>
          <div className='w-full overflow-hidden'>
            <AboutRow
              title={config.pages.home.sections.about.rows[1].title}
              description={config.pages.home.sections.about.rows[1].description}
              imageURL={config.pages.home.sections.about.rows[1].image.url}
              imageAlt={config.pages.home.sections.about.rows[1].image.alt}
            />
            <AboutRow
              title={config.pages.home.sections.about.rows[2].title}
              description={config.pages.home.sections.about.rows[2].description}
              imageURL={config.pages.home.sections.about.rows[2].image.url}
              imageAlt={config.pages.home.sections.about.rows[2].image.alt}
              className='md:flex-row-reverse'
              contentClassName='md:text-end md:items-end'
            />
            <AboutRow
              title={config.pages.home.sections.about.rows[3].title}
              description={config.pages.home.sections.about.rows[3].description}
              imageURL={config.pages.home.sections.about.rows[3].image.url}
              imageAlt={config.pages.home.sections.about.rows[3].image.alt}
            />
          </div>
        </TracingBeam>
      </section>
    </SpotlightBackgroundContent>
  );
};

export default AboutSection;
