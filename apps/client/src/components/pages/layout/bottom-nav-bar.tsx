import { useNavLinks } from "@/hooks/use-nav-links";
import { NavLink } from "./nav-link";

export const BottomNavBar = () => {
  const navLinks = useNavLinks();

  return (
    <nav>
      <ul>
        {navLinks.map((props) => (
          <NavLink key={props.label} {...props} />
        ))}
      </ul>
    </nav>
  );
};
