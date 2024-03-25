import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from "react";

const AboutRow = ({
  title,
  description,
  imageURL,
  imageAlt,
  className,
  contentClassName,
}: {
  title: string;
  description: string;
  imageURL: string;
  imageAlt: string;
  className?: string;
  contentClassName?: string;
}) => {
  return (
    <div className={cn(
      'gap-8 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 sm:py-16 lg:px-6',
      'flex items-center justify-center flex-col-reverse md:flex-row',
      className
    )}>
      <Image
        className='max-w-[500px] w-full rounded'
        src={imageURL}
        alt={imageAlt}
        height={200}
        width={400}
        onDragStart={(e) => e.preventDefault()}
        priority
        loading='eager'
      />
      <div className={cn(
        'mt-4 md:mt-0 flex flex-col items-center md:items-start text-center md:text-start',
        contentClassName,
      )}>
        <h3 className='mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
          {title}
        </h3>
        <p className='md:mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutRow;
