import React, { ReactNode } from 'react'
import { Link } from '../../index'
import NextLink from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
}

const Nav: React.FC<{ LinkComponent: typeof Link | typeof NextLink }> = ({ LinkComponent }) => {
  const { locale, pathname, query } = useRouter()
  const newLocale = locale === 'en' ? 'fr' : 'en'

  return (
    <nav>
      <LinkComponent href="/">
        <a>Home</a>
      </LinkComponent>{' '}
      |{' '}
      <LinkComponent href="/about">
        <a>About</a>
      </LinkComponent>{' '}
      |{' '}
      <LinkComponent href="/rewrites">
        <a>Rewrites</a>
      </LinkComponent>{' '}
      |{' '}
      <LinkComponent href="/docs">
        <a>Docs</a>
      </LinkComponent>{' '}
      |{' '}
      <LinkComponent href="/users">
        <a>Users List</a>
      </LinkComponent>{' '}
      |{' '}
      <LinkComponent href={{ pathname, query }} locale={newLocale}>
        <a>{newLocale}</a>
      </LinkComponent>
    </nav>
  )
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { locale, asPath, pathname, query } = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <h3>With next-translate-routes Link</h3>
        <Nav LinkComponent={Link} />
        <h3>With next/link Link</h3>
        <Nav LinkComponent={NextLink} />
      </header>
      {children}
      <footer>
        <hr />
        <blockquote>{`locale: ${locale}, asPath: ${asPath}, pathname: ${pathname}, query: ${JSON.stringify(
          query,
        )}`}</blockquote>
      </footer>
    </div>
  )
}

export default Layout