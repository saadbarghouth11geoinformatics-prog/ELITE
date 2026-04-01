import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildUrl, getSiteUrl, routeSeo, siteConfig } from '@/data/seo'

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = routeSeo[pathname] ?? routeSeo['/']
    const title = meta?.title ?? siteConfig.name
    const description = meta?.description ?? siteConfig.description
    const keywords = meta?.keywords ?? siteConfig.keywords
    const canonical = buildUrl(pathname)
    const imagePath = meta?.image ?? siteConfig.defaultImage
    const siteUrl = getSiteUrl()
    const imageUrl = siteUrl ? buildUrl(imagePath) : imagePath

    const setMetaTag = (attr: 'name' | 'property', key: string, value?: string) => {
      if (!value) return
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }

    const setLinkTag = (rel: string, href?: string) => {
      if (!href) return
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    const setJsonLd = (data: Record<string, unknown>) => {
      let element = document.head.querySelector<HTMLScriptElement>('script[data-seo="schema"]')
      if (!element) {
        element = document.createElement('script')
        element.type = 'application/ld+json'
        element.dataset.seo = 'schema'
        document.head.appendChild(element)
      }
      element.textContent = JSON.stringify(data)
    }

    document.documentElement.lang = siteConfig.lang
    document.documentElement.dir = 'rtl'
    document.title = title

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', keywords)
    setMetaTag(
      'name',
      'robots',
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    )
    setMetaTag('name', 'theme-color', siteConfig.themeColor)
    setMetaTag('name', 'author', siteConfig.name)

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', siteConfig.name)
    setMetaTag('property', 'og:locale', siteConfig.locale)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonical)
    setMetaTag('property', 'og:image', imageUrl)
    setMetaTag('property', 'og:image:alt', siteConfig.name)

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', imageUrl)

    setLinkTag('canonical', canonical)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Caterer',
      name: siteConfig.name,
      description,
      url: siteUrl || undefined,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      image: imageUrl || undefined,
      areaServed: siteConfig.areaServed,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.addressLocality,
        addressCountry: siteConfig.addressCountry,
      },
      sameAs: [siteConfig.instagram],
    }

    setJsonLd(schema)
  }, [pathname])

  return null
}
