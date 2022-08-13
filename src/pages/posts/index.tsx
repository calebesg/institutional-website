import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import {
  FiChevronRight,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronsLeft,
} from 'react-icons/fi'

import { getPrismicClient } from '../../libs/prismic'

import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string
  description: string
  cover: {
    url: string
    alt: string
  }
  updateAt: string
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <Image
                  src={post.cover.url}
                  alt={post.cover.alt}
                  quality={100}
                  width={720}
                  height={410}
                />

                <strong>{post.title}</strong>
                <time>{post.updateAt}</time>

                <p>{post.description}</p>
              </a>
            </Link>
          ))}

          <div className={styles.pagination}>
            <div>
              <button>
                <FiChevronsLeft />
              </button>
              <button>
                <FiChevronLeft />
              </button>
            </div>

            <div>
              <button>
                <FiChevronRight />
              </button>
              <button>
                <FiChevronsRight />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      orderings: '[document.last_publication_date desc]',
      fetch: ['post.title', 'post.content', 'post.cover'],
      pageSize: 3,
    }
  )

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:
        post.data.content.find((item: any) => item.type === 'paragraph')
          ?.text ?? '',
      cover: {
        url: post.data.cover.url,
        alt: post.data.cover.alt,
      },
      updateAt: new Date(
        post.last_publication_date as string
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return {
    props: {
      posts,
    },
  }
}
