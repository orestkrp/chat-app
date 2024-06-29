import clsx from "clsx";
import { FC } from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

interface NavLinkProps {
  label: string;
  href: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
}

export const NavLink: FC<NavLinkProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleCLick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li>
      <Link
        to={href}
        onClick={handleCLick}
        className={clsx(
          `flex justify-center p-4 font-semibold leading-6 text-gray-600 hover:bg-gray-100 hover:text-black`,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="h-6 w-6" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
