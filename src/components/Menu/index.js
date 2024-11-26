import styles from "@/components/Menu/Menu.module.css";
import Link from 'next/link'; // Importando o Link do Next.js

const Menu = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href="/">
            <img src="images/thegames_symbol.png" alt="The Games" />
          </a>
        </div>
        <div className={styles.menu}>
          <ul className={styles.menuItems} id="menuItems">
            <li>
              <Link href="/home">Home</Link> {/* Alterado para usar Link */}
            </li>
            <li>
              <Link href="/create">Cadastrar jogos</Link> {/* Alterado para usar Link */}
            </li>
            <li>
              <Link href="/logout">Logout</Link> {/* Alterado para usar Link */}
            </li>
          </ul>
        </div>
        <div className={styles.menuBtn} id="menuBtn">
          <i id="menuIcon"></i>
        </div>
      </nav>
    </>
  );
};

export default Menu;
