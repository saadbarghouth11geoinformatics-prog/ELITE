import { Link } from 'react-router-dom'
import { serviceAreas } from '@/data/companyProfile'

const services = [
  {
    title: 'بوفيهات وإعاشة للمناسبات',
    description: 'بوفيه مفتوح وقوائم طعام متنوعة للزفاف والمناسبات العائلية وفعاليات الشركات.',
    href: '/menu',
  },
  {
    title: 'تجهيز وضيافة القاعات',
    description: 'تنسيق طاولات الطعام وخدمة الضيوف وتجهيز البوفيه داخل قاعة مناسبتك باحتراف.',
    href: '/services',
  },
  {
    title: 'حجز سريع ومباشر',
    description: 'حدد المدينة والموعد وعدد الضيوف، ثم تواصل مباشرة للحصول على العرض المناسب.',
    href: '/booking',
  },
]

export default function LocalServiceContent() {
  return (
    <section
      aria-labelledby="local-services-title"
      className="relative border-y border-gold/15 bg-black/90 py-14 sm:py-20"
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold text-gold">إيليت النخبة للحفلات والإعاشة</p>
          <h2
            id="local-services-title"
            className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl"
          >
            بوفيهات وتموين وتجهيز قاعات المناسبات في منطقة مكة
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            نخدم حفلات الزفاف والمناسبات الخاصة والشركات بخدمات الطعام والضيافة وتجهيز
            البوفيهات، مع فريق يمتلك خبرة عملية في تنظيم الخدمة داخل موقع العميل.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-right transition-colors hover:border-gold/35 hover:bg-gold/[0.06]"
            >
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/65">{service.description}</p>
              <Link
                to={service.href}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-gold"
              >
                اعرف التفاصيل
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.06] p-5 text-center">
          <h3 className="text-lg font-bold text-white">مناطق الخدمة داخل السعودية</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-gold/25 bg-black/40 px-4 py-2 text-sm text-white/85"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          <details className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <summary className="cursor-pointer font-bold text-white">هل توفر إيليت قاعة حفلات؟</summary>
            <p className="mt-3 text-sm leading-7 text-white/65">
              نقدم تجهيز الطعام والبوفيه والضيافة داخل القاعة أو موقع المناسبة الذي يحدده العميل.
            </p>
          </details>
          <details className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <summary className="cursor-pointer font-bold text-white">كيف أطلب عرض سعر؟</summary>
            <p className="mt-3 text-sm leading-7 text-white/65">
              أرسل المدينة والتاريخ وعدد الضيوف ونوع المناسبة من صفحة الحجز أو عبر واتساب.
            </p>
          </details>
          <details className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <summary className="cursor-pointer font-bold text-white">ما المدن التي تغطيها الخدمة؟</summary>
            <p className="mt-3 text-sm leading-7 text-white/65">
              تشمل التغطية جدة ومكة والطائف وأضم والمخواة وغميقة، ويمكن الاستفسار عن المواقع
              المجاورة قبل الحجز.
            </p>
          </details>
        </div>
      </div>
    </section>
  )
}
