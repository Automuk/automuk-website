import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://autom.uk'

    const staticPages = [
        '',
        '/services',
        '/how-it-works',
        '/about',
        '/contact',
    ]

    const tools = [
        '/tools/json-prettier',
        '/tools/qr-generator',
        '/tools/image-converter',
        '/tools/password-generator',
        '/tools/word-counter',
        '/tools/md-previewer',
        '/tools/regex-tester',
        '/tools/base64-converter',
        '/tools/url-converter',
        '/tools/case-converter',
        '/tools/uuid-generator',
        '/tools/lorem-ipsum',
        '/tools/unit-converter',
        '/tools/timestamp-converter',
        '/tools/bmi-calculator',
        '/tools/tip-calculator',
        '/tools/age-calculator',
        '/tools/percentage-calculator',
        '/tools/dice-roller',
    ]

    const allPages = [...staticPages, ...tools]

    return allPages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: page.startsWith('/tools') ? 'monthly' : 'weekly',
        priority: page === '' ? 1 : page.startsWith('/tools') ? 0.8 : 0.7,
    }))
}
