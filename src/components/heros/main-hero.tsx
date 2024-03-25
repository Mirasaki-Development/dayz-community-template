'use client';

import React, { useRef } from 'react';
import { config } from '../../../config';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import LinkButton from '../buttons/link-button';
import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';

const MainHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  return (<div className='relative w-full'>
    <div className='absolute inset-0 z-0 bg-gradient-to-b from-[transparent,75%] to-black' />
    <motion.section
      ref={ref}
      className={cn(
        "bg-blend-multiply bg-no-repeat bg-center w-full",
        "flex items-center min-h-[100lvh]",
        'pt-20', // Note: Uses padding because Gutter isn't used for the header in root layout
      )}
      style={{
        // Note: Only has parallax on larger widths due to implementation (cover vs contain)
        backgroundColor: config.hero.background.color,
        backgroundPositionY: y,
        backgroundPositionX: 'center',
        backgroundImage: `url(${config.hero.background.image.url})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='relative py-8 px-4 mx-auto max-w-screen-2xl text-white lg:py-16 z-1'>
        <div className='mb-6 max-w-screen-lg lg:mb-0 flex flex-col items-center text-center'>
          <div className='h-[75px] w-[75px]'>
            <Image
              src='/images/logos/dayz.png'
              alt='Hero Image'
              width={75}
              height={75}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
          <h1 className='my-3 text-xl font-extrabold tracking-tight leading-none md:text-1xl lg:text-2xl' style={{
            color: config.themeColor,
          }}>
            {config.site.title}
          </h1>
          <h2 className='mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl'>
            {config.hero.title}
          </h2>
          <p className='mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl'>
            {config.hero.description}
          </p>
          <LinkButton
            href={config.hero.cta.href}
            className='inline-flex items-center py-3 px-5 font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          >
            <ExternalLinkIcon className='w-5 h-5 pr-1' />
            {config.hero.cta.label}
            <svg
              className='ml-2 -mr-1 w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </LinkButton>
        </div>
      </div>
    </motion.section>
  </div>);
};

export default MainHero;
