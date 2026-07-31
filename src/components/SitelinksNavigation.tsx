import { Link } from 'react-router-dom'
import { BookOpen, Calendar, ChefHat, MessageCircle, Sparkles, Utensils } from 'lucide-react'

const primaryPages = [
  { title: 'خدماتنا', description: 'الإعاشة وتجهيز المناسبات', href: '/services', icon: Sparkles },
  { title: 'قائمة الطعام', description: 'صور الأطباق والبوفيهات', href: '/menu', icon: Utensils },
  { title: 'ألبوم المنيو', description: 'باقات وصفحات المنيو', href: '/menu-pages', icon: BookOpen },
  { title: 'داخل المطبخ', description: 'صور وفيديوهات التجهيز', href: '/kitchen', icon: ChefHat },
  { title: 'احجز الآن', description: 'أرسل تفاصيل مناسبتك', href: '/booking', icon: Calendar },
  { title: 'تواصل معنا', description: 'اتصال وواتساب مباشر', href: '/contact', icon: MessageCircle },
]

export default function SitelinksNavigation() {
  return (
    <nav
      aria-label="أهم صفحات إيليت"
      className="relative border-y border-gold/15 bg-black/95 py-5 sm:py-7"
    >
      <div className="container-custom grid grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {primaryPages.map((page) => (
          <Link
            key={page.href}
            to={page.href}
            className="group flex min-h-24 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-center transition-colors hover:border-gold/45 hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <page.icon className="h-5 w-5 text-gold" aria-hidden="true" />
            <span className="mt-2 text-sm font-bold text-white group-hover:text-gold">{page.title}</span>
            <span className="mt-1 text-xs leading-5 text-white/55">{page.description}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
