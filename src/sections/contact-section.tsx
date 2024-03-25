'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { config } from '../../config';
import LinkButton from '@/components/buttons/link-button';

const ContactSection = () => {
  return (
    <section
      className={cn(
        'py-8 md:py-16 lg:py-28 px-1 sm:px-2 md:px-4 w-full bg-[#050505]',
        'relative z-10 overflow-hidden',
        'flex flex-col'
      )}
      id='contact'
    >
      <h2 className='mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center'>
        {config.pages.home.sections.contact.title}
      </h2>

      <p className='mb-6 text-lg font-normal text-gray-700 dark:text-gray-400 text-center max-w-xl mx-auto'>
        {config.pages.home.sections.contact.description}
      </p>

      <div className='flex flex-wrap gap-2 mx-auto'>
        {
          Object.entries(config.pages.home.sections.contact.links).map(([key, value]) => (
            <LinkButton
              key={key}
              href={value}
            >
              {key}
            </LinkButton>
          ))
        }
      </div>
    </section>
  );
};

export default ContactSection;
