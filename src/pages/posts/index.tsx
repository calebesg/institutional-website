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
import { useState } from 'react'

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
  page: number
  totalPages: number
}

export default function Posts({
  posts: apiPosts,
  page,
  totalPages,
}: PostProps) {
  const [posts, setPosts] = useState(apiPosts)
  const [currentPage, setCurrentPage] = useState(page)

  async function fetchPosts(pageNumber: number) {
    const prismic = getPrismicClient()

    const response = await prismic.query(
      [Prismic.Predicates.at('document.type', 'post')],
      {
        orderings: '[document.last_publication_date desc]',
        fetch: ['post.title', 'post.content', 'post.cover'],
        pageSize: 3,
        page: pageNumber,
      }
    )

    return response
  }

  async function navigateToPage(pageNumber: number) {
    const result = await fetchPosts(pageNumber)

    if (result.results.length === 0) return

    const resultPosts = result.results.map(post => {
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

    setPosts(resultPosts as Post[])
    setCurrentPage(pageNumber)
  }

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
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU1NC8DQACUwFXtx0ewwAAAABJRU5ErkJggg=="
                />

                <strong>{post.title}</strong>
                <time>{post.updateAt}</time>

                <p>{post.description}</p>
              </a>
            </Link>
          ))}

          <div className={styles.pagination}>
            {currentPage > 1 && (
              <div>
                <button onClick={() => navigateToPage(1)}>
                  <FiChevronsLeft />
                </button>
                <button onClick={() => navigateToPage(currentPage - 1)}>
                  <FiChevronLeft />
                </button>
              </div>
            )}

            {currentPage < totalPages && (
              <div>
                <button onClick={() => navigateToPage(currentPage + 1)}>
                  <FiChevronRight />
                </button>
                <button onClick={() => navigateToPage(totalPages)}>
                  <FiChevronsRight />
                </button>
              </div>
            )}
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
      page: response.page,
      totalPages: response.total_pages,
    },
  }
}
