import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import postImage from '../../../public/images/thumb.png'
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href="/">
            <a>
              <Image
                src={postImage}
                alt="sujeito programador"
                quality={100}
                width={720}
                height={410}
              />

              <strong>Criando meu primeiro aplicativo</strong>
              <time>14 JUN 2021</time>

              <p>
                Hoje vamos criar o controle de mostrar a senha no input, uma
                opção para os nossos formulários de cadastro e login. Mas chega
                de conversa e bora pro código junto comigo que o vídeo está show
                de bola!
              </p>
            </a>
          </Link>

          <Link href="/">
            <a>
              <Image
                src={postImage}
                alt="sujeito programador"
                quality={100}
                width={720}
                height={410}
              />

              <strong>Criando meu primeiro aplicativo</strong>
              <time>14 JUN 2021</time>

              <p>
                Hoje vamos criar o controle de mostrar a senha no input, uma
                opção para os nossos formulários de cadastro e login. Mas chega
                de conversa e bora pro código junto comigo que o vídeo está show
                de bola!
              </p>
            </a>
          </Link>
        </div>
      </main>
    </>
  )
}
