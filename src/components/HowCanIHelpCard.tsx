import type { FunctionComponent } from 'react';

interface HowCanIHelpCardProps {
  name: string;
  description: string;
  hasHr?: boolean;
}

const HowCanIHelpCard: FunctionComponent<HowCanIHelpCardProps> = ({
  name,
  description,
  hasHr,
}) => {
  return (
    <div className='pt-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
      <h4 className='text-gray-700 dark:text-gray-50 text-xl font-bold tracking-tight'>
        {name}
      </h4>
      <p className='mt-2 mb-4 text-gray-600 dark:text-gray-400'>
        {description}
      </p>
      {hasHr && <hr />}
    </div>
  );
};

export default HowCanIHelpCard;
