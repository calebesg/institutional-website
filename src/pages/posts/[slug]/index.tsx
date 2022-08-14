import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../../libs/prismic'

import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string
  content: string
  cover: {
    url: string
    alt: string
  }
  updatedAt: string
}

interface PostProps {
  post: Post
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            quality={100}
            width={720}
            height={410}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU1NC8DQACUwFXtx0ewwAAAABJRU5ErkJggg=="
          />

          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const slug = params?.slug as string
  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('post', slug, {})

  if (!response) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false,
      },
    }
  }

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    cover: {
      url: response.data.cover.url,
      alt: response.data.cover.alt,
    },
    updatedAt: new Date(
      response.last_publication_date as string
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
    },
  }
}
