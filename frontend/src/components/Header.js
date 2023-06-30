import { useState } from "react";
function Header({ children, isWrappable }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenu = () => {
    setIsMenuOpened((state) => !state);
  };
  return (
    <header className={"header" + (isWrappable ? " header_wrappable" : "")}>
      <div className="header__logo"></div>
      {isWrappable && (
        <button
          type="button"
          className={
            "header__menu-button" +
            (isMenuOpened ? " header__menu-button_opened" : "")
          }
          aria-label="Открыть меню"
          onClick={handleMenu}
        ></button>
      )}
      {children && (
        <nav
          className={
            "header__menu" + (isMenuOpened ? " header__menu_opened" : "")
          }
        >
          <ul className="header__menu-list">
            {(children.length > 1 ? children : [children]).map((item, pos) => (
              <li className="header__menu-item" key={pos}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
