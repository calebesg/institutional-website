import Head from 'next/head'
import Image from 'next/image'

import techsImg from '../../public/images/techs.svg'
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito Programador</title>
      </Head>

      <main>
        <div className={styles.banner}>
          <section>
            <h1>Levando você ao próximo nível!</h1>
            <span>
              Uma plataforma com cursos que vão do zero até o profissional na
              pratica, direto ao ponto aplicando o que usamos no mercado de
              trabalho. 👊
            </span>
            <a type="button" href="/">
              Começar agora!
            </a>
          </section>

          <img
            src="/images/banner-conteudos.png"
            alt="Conteúdos sujeito programador"
          />
        </div>

        <hr className={styles.divider} />

        <div className={styles.wrapper}>
          <section>
            <h2>Aprenda criar aplicativos para Android e iOS</h2>
            <span>
              Você vai descobrir o jeito mais moderno de desenvolver apps
              nativos para iOS e Android, construindo aplicativos do zero até
              aplicativos.
            </span>
          </section>

          <img src="/images/financasApp.png" alt="Aplicativo de finanças" />
        </div>

        <hr className={styles.divider} />

        <div className={styles.wrapper}>
          <img src="/images/webDev.png" alt="Aplicativo web" />

          <section>
            <h2>Aprenda criar sistemas web</h2>
            <span>
              Criar sistemas web, sites usando as tecnologias mais modernas e
              requisitadas pelo mercado.
            </span>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <Image src={techsImg} alt="Techs" />
        <h2>
          Mais de <span>15 mil</span> já levaram sua carreira ao próximo nivel.
        </h2>
        <span>E você vai perder a chance de evoluir de uma vez por todas?</span>

        <a type="button" href="/">
          Acessar Turma
        </a>
      </footer>
    </>
  )
}
