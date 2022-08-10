import Image from 'next/image'
import Link from 'next/link'

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
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
          <Link href="/posts" passHref>
            <a>Conteúdos</a>
          </Link>
          <Link href="/sobre" passHref>
            <a>Quem somos?</a>
          </Link>
        </nav>

        <a
          className={styles.btnReady}
          type="button"
          href="https://linkedin.com"
        >
          Começar
        </a>
      </div>
    </header>
  )
}
