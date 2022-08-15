import Head from 'next/head'
import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'

import { getPrismicClient } from '../../libs/prismic'

import styles from './styles.module.scss'

interface AboutProps {
  data: {
    title: string
    content: string
    cover: {
      url: string
      alt: string
    }
    linkedin: string
    facebook: string
    youtube: string
    instagram: string
  }
}

export default function About({ data }: AboutProps) {
  return (
    <>
      <Head>
        <title>Quem Somos? Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <section className={styles.contentSection}>
            <h1>{data.title}</h1>
            <p>{data.content}</p>

            <a href={data.instagram}>
              <FaInstagram size={40} color={'white'} />
            </a>
            <a href={data.youtube}>
              <FaYoutube size={40} color={'white'} />
            </a>
            <a href={data.facebook}>
              <FaFacebook size={40} color={'white'} />
            </a>
            <a href={data.linkedin}>
              <FaLinkedin size={40} color={'white'} />
            </a>
          </section>

          <img src={data.cover.url} alt={data.cover.alt} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'about'),
  ])

  const result = response.results[0].data

  const data = {
    title: RichText.asText(result.title),
    content: RichText.asText(result.content),
    cover: {
      url: result.cover.url,
      alt: result.cover.alt,
    },
    linkedin: result.linkedin.url,
    youtube: result.youtube.url,
    instagram: result.instagram.url,
    facebook: result.facebook.url,
  }

  return {
    props: {
      data,
    },
  }
}
