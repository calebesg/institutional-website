import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../libs/prismic'

import techsImg from '../../public/images/techs.svg'
import styles from '../styles/home.module.scss'

type Content = {
  title: string
  subTitle: string
  linkAction: string
  mobile: string
  mobileContent: string
  mobileBanner: {
    alt: string
    url: string
  }
  web: string
  webContent: string
  webBanner: {
    alt: string
    url: string
  }
}

interface HomeProps {
  content: Content
}

export default function Home({ content }: HomeProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito Programador</title>
      </Head>

      <main>
        <div className={styles.banner}>
          <section>
            <h1>{content.title}</h1>
            <span>{content.subTitle}</span>
            <a type="button" href={content.linkAction}>
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
            <h2>{content.mobile}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <img src={content.mobileBanner.url} alt={content.mobileBanner.alt} />
        </div>

        <hr className={styles.divider} />

        <div className={styles.wrapper}>
          <img src={content.webBanner.url} alt={content.webBanner.alt} />

          <section>
            <h2>{content.web}</h2>
            <span>{content.webContent}</span>
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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home'),
  ])

  const {
    title,
    sub_title,
    link_action,
    mobile,
    mobile_content,
    mobile_banner,
    web,
    web_content,
    web_banner,
  } = response.results[0].data

  const content = {
    title: RichText.asText(title),
    subTitle: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobile: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: {
      alt: mobile_banner.alt,
      url: mobile_banner.url,
    },
    web: RichText.asText(web),
    webContent: RichText.asText(web_content),
    webBanner: {
      alt: web_banner.alt,
      url: web_banner.url,
    },
  }

  return {
    props: {
      content,
    },
    revalidate: 60 * 60,
  }
}
