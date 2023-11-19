import Link from 'next/link';

const NavLink = ({ linkText, ...linkProps }) => {
  return (
    <Link
      className={
        'text-gray-300 h-11 mt-2 hover:bg-gray-700 hover:text-white rounded-md p-3 text-sm font-medium'
      }
      {...linkProps}
    >
      <li>{linkText}</li>
    </Link>
  );
};

export default NavLink;
