import s from "./navbar.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import MenuIcon from "../Icons/MenuIcon";

export default function Navbar() {
  return (
    <nav className={s.nav}>
      <div className={s.var}>
        <span className={`${s.menu} ${s.zoom}`}>
          <MenuIcon />
        </span>
        <span>
          <ToggleTheme />
        </span>
      </div>
    </nav>
  );
}
