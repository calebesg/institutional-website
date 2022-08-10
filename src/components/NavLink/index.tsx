import { cloneElement, ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

export function NavLink({ children, activeClassName, ...rest }: NavLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''

  return <Link {...rest}>{cloneElement(children, { className })}</Link>
}
