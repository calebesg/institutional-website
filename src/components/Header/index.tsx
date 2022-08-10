import Image from 'next/image'
import Link from 'next/link'

import { NavLink } from '../NavLink'

import logo from '../../../public/images/logo.svg'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/" passHref>
          <a>
            <Image src={logo} alt="Logo Sujeito Programador" />
          </a>
        </Link>

        <nav>
          <NavLink href="/" activeClassName={styles.active} passHref>
            <a>Home</a>
          </NavLink>
          <NavLink href="/posts" activeClassName={styles.active} passHref>
            <a>Conteúdos</a>
          </NavLink>
          <NavLink href="/sobre" activeClassName={styles.active} passHref>
            <a>Quem somos?</a>
          </NavLink>
        </nav>

        <a
          className={styles.btnReady}
          type="button"
          href="https://linkedin.com"
          rel="noreferrer"
        >
          Começar
        </a>
      </div>
    </header>
  )
}
