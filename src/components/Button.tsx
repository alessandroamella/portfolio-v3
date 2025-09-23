import classNames from 'classnames';
import Link from 'next/link';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
} from 'react';

type ButtonAndHrefProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends ButtonAndHrefProps {
  color?: 'red' | 'blue' | 'green' | 'light' | 'purple' | 'dark';
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  href,
  className,
  color,
  ...rest
}) => {
  const _className = classNames(
    'p-2 border-none outline-none transition-colors duration-75',
    {
      'text-white bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300':
        color === 'red',
      'text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300':
        color === 'blue',
      'text-white bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-300':
        color === 'green',
      'text-black border hover:border-gray-600 active:border-gray-700 disabled:border-gray-300':
        color === 'light',
      'text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 disabled:bg-purple-300':
        color === 'purple',
      'text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-500':
        !color || color === 'dark', // default/dark
    },
    className,
  );

  // Check if href is internal (starts with / or relative) or external
  const isInternal = href && (href.startsWith('/') || href.startsWith('.'));

  return href ? (
    isInternal ? (
      <Link href={href} className={_className} {...rest}>
        {children}
      </Link>
    ) : (
      <a href={href} className={_className} {...rest}>
        {children}
      </a>
    )
  ) : (
    <button className={_className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
