import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { generateGradientImage } from './images'
import { richTextFromParagraphs, richTextHeadingAndParagraphs } from './lexical'

async function run() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('Seeding Fastora content...')

  // ── Media ────────────────────────────────────────────────────
  const lumenBuffer = await generateGradientImage(['#3D5AFE', '#7C3AED'])
  const lumenCover = await payload.create({
    collection: 'media',
    data: { alt: 'Lumen Skincare social content grid' },
    file: {
      data: lumenBuffer,
      mimetype: 'image/jpeg',
      name: 'lumen-cover.jpg',
      size: lumenBuffer.length,
    },
  })

  const northboundBuffer = await generateGradientImage(['#111113', '#3D5AFE'])
  const northboundCover = await payload.create({
    collection: 'media',
    data: { alt: 'Northbound Logistics website redesign' },
    file: {
      data: northboundBuffer,
      mimetype: 'image/jpeg',
      name: 'northbound-cover.jpg',
      size: northboundBuffer.length,
    },
  })

  const postHeroBuffer = await generateGradientImage(['#7C3AED', '#3D5AFE'])
  const postHero = await payload.create({
    collection: 'media',
    data: { alt: 'Social media growth strategy' },
    file: {
      data: postHeroBuffer,
      mimetype: 'image/jpeg',
      name: 'post-hero.jpg',
      size: postHeroBuffer.length,
    },
  })

  // ── Site Settings ────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Fastora',
      tagline: 'Digital services and social media, engineered for speed.',
      contactEmail: 'hello@fastora.example',
      contactPhone: '+1 (555) 019-2044',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/fastora' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/fastora' },
        { platform: 'twitter', url: 'https://twitter.com/fastora' },
      ],
      footerText: `© ${new Date().getFullYear()} Fastora. All rights reserved.`,
    },
  })

  // ── Header / Footer nav ─────────────────────────────────────
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/work', label: 'Work' } },
        { link: { type: 'custom', url: '/insights', label: 'Insights' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        { link: { type: 'custom', url: '/services', label: 'Services' } },
        { link: { type: 'custom', url: '/work', label: 'Work' } },
        { link: { type: 'custom', url: '/insights', label: 'Insights' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })

  // ── Services ─────────────────────────────────────────────────
  const servicesData = [
    {
      title: 'Social Media Management & Growth',
      summary:
        'Always-on content, community management, and growth strategy across the platforms your audience actually uses.',
      order: 1,
      problem:
        'Most brands post inconsistently and treat every platform the same way, so growth stalls and engagement dries up.',
      approach:
        'We build a platform-specific content engine — planning, producing, posting, and reporting on a weekly cadence — backed by real audience data, not guesswork.',
      deliverables: [
        'Content calendar & strategy',
        'Daily/weekly posting & community management',
        'Platform-native creative (Reels, Shorts, carousels)',
        'Monthly growth & engagement reporting',
      ],
      faqs: [
        {
          question: 'How fast will I see growth?',
          answer:
            'Most clients see measurable engagement lift within the first 30 days and compounding follower growth by month three, once the content engine is running at full cadence.',
        },
        {
          question: 'Which platforms do you manage?',
          answer:
            'Instagram, TikTok, LinkedIn, X, YouTube Shorts, and Facebook — we recommend a focused 2-3 platform mix based on where your audience actually is.',
        },
      ],
    },
    {
      title: 'Content Strategy & Creation',
      summary:
        "Editorial strategy, scripting, and production for video, photo, and written content that actually gets watched.",
      order: 2,
      problem: "Content gets made but doesn't convert because there's no strategy connecting it to business goals.",
      approach:
        'We start with a content pillar framework tied to your funnel, then produce against it — video, photography, copywriting — on a repeatable production schedule.',
      deliverables: [
        'Content pillar & editorial calendar',
        'Scriptwriting & storyboarding',
        'Video & photo production',
        'Repurposing across formats and channels',
      ],
      faqs: [
        {
          question: 'Do you handle filming, or just strategy?',
          answer:
            'Both. We plan the content pillars and calendar, then produce the video, photo, and written assets — either on-site or via remote-friendly production workflows.',
        },
      ],
    },
    {
      title: 'Web Design & Development',
      summary:
        'Fast, conversion-focused websites built on modern frameworks — from marketing sites to full web apps.',
      order: 3,
      problem: 'Slow, generic websites cost you visitors before they even see your offer.',
      approach:
        'We design and build custom, high-performance sites — Core Web Vitals-optimized from day one — with a CMS your team can actually use.',
      deliverables: [
        'UX/UI design',
        'Responsive front-end build',
        'CMS integration & training',
        'Performance & SEO optimization',
      ],
      faqs: [
        {
          question: 'What do you build with?',
          answer:
            'Modern, fast frameworks like Next.js paired with a headless CMS, so your team can edit content without touching code and the site stays fast as it grows.',
        },
      ],
    },
    {
      title: 'AI-Powered Content Systems',
      summary:
        "Custom AI workflows that generate, repurpose, and personalize content at a scale your team can't match manually.",
      order: 4,
      problem: "Manually producing enough content to compete online doesn't scale — teams burn out trying.",
      approach:
        'We design AI-assisted pipelines — from ideation to draft to repurposing — with human review built in, so quality never dips as volume scales up.',
      deliverables: [
        'Custom AI content workflows',
        'Prompt & template systems',
        'Human-in-the-loop review process',
        'Ongoing optimization & training',
      ],
      faqs: [
        {
          question: 'Will AI-generated content sound generic?',
          answer:
            "No — every workflow is trained on your brand voice and reviewed by a human before it ships, so it reads like you, just produced faster.",
        },
      ],
    },
    {
      title: 'Digital Campaigns',
      summary: 'Paid and organic campaigns engineered around a single measurable goal — not vanity metrics.',
      order: 5,
      problem: 'Ad spend gets wasted chasing impressions instead of outcomes that matter to the business.',
      approach:
        'We plan, launch, and optimize campaigns against one primary KPI, with weekly iteration based on real performance data.',
      deliverables: [
        'Campaign strategy & targeting',
        'Ad creative production',
        'Landing page optimization',
        'Weekly performance reporting & iteration',
      ],
      faqs: [
        {
          question: 'What platforms do you run campaigns on?',
          answer:
            'Meta, TikTok, Google, and LinkedIn — the mix depends on where your specific audience converts best, which we validate in the first two weeks.',
        },
      ],
    },
    {
      title: 'Brand Identity',
      summary:
        'Visual identity systems — logo, color, type, voice — built to hold up across every platform you show up on.',
      order: 6,
      problem: 'Inconsistent visuals across platforms make a brand feel smaller and less trustworthy than it is.',
      approach:
        'We build a complete identity system with clear usage rules, so every touchpoint — social, web, print — feels unmistakably yours.',
      deliverables: [
        'Logo & mark design',
        'Color & typography system',
        'Brand guidelines document',
        'Social & web templates',
      ],
      faqs: [
        {
          question: 'Do you redesign existing brands or only create new ones?',
          answer:
            'Both — we regularly refresh existing identities to feel sharper and more consistent, as well as build new identities from scratch.',
        },
      ],
    },
  ] as const

  const createdServices = []
  for (const service of servicesData) {
    const doc = await payload.create({
      collection: 'services',
      data: {
        title: service.title,
        summary: service.summary,
        order: service.order,
        featuredOnHome: true,
        problem: richTextFromParagraphs([service.problem]),
        approach: richTextFromParagraphs([service.approach]),
        deliverables: service.deliverables.map((label) => ({ label })),
        faqs: service.faqs,
        _status: 'published',
      },
    })
    createdServices.push(doc)
  }

  // ── Testimonials ─────────────────────────────────────────────
  await payload.create({
    collection: 'testimonials',
    data: {
      quote:
        'Fastora rebuilt our entire social presence in six weeks. We went from posting sporadically to a real content engine — and our engagement tripled.',
      clientName: 'Amaka Chukwu',
      role: 'Founder',
      company: 'Lumen Skincare',
      rating: 5,
      showOnHome: true,
    },
  })

  await payload.create({
    collection: 'testimonials',
    data: {
      quote:
        'The team ships fast without cutting corners. Our new site loads in under a second and our conversion rate is up 40%.',
      clientName: 'Daniel Osei',
      role: 'CEO',
      company: 'Northbound Logistics',
      rating: 5,
      showOnHome: true,
    },
  })

  // ── Case Studies ─────────────────────────────────────────────
  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'From sporadic posts to a 3x engagement engine',
      summary:
        'Lumen Skincare had beautiful products but flat social engagement. We rebuilt their content system from the ground up.',
      clientName: 'Lumen Skincare',
      industry: 'Beauty & Wellness',
      coverImage: lumenCover.id,
      order: 1,
      featuredOnHome: true,
      relatedService: createdServices[0]?.id,
      challenge: richTextFromParagraphs([
        'Lumen Skincare had beautiful products but an inconsistent social presence — irregular posting, no content strategy, and flat engagement across Instagram and TikTok.',
      ]),
      approach: richTextFromParagraphs([
        'We built a platform-specific content calendar, produced weekly video content, and introduced a daily community management cadence.',
      ]),
      results: [
        { metric: '+212%', label: 'engagement rate in 90 days' },
        { metric: '3.1x', label: 'follower growth in 6 months' },
        { metric: '48hr', label: 'average content turnaround' },
      ],
      _status: 'published',
    },
  })

  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'A website rebuilt for speed and conversions',
      summary:
        "Northbound's old site was slow and losing leads. We rebuilt it for speed, and conversions followed.",
      clientName: 'Northbound Logistics',
      industry: 'Logistics & Supply Chain',
      coverImage: northboundCover.id,
      order: 2,
      featuredOnHome: true,
      relatedService: createdServices[2]?.id,
      challenge: richTextFromParagraphs([
        "Northbound's old website took over 6 seconds to load on mobile, and their quote-request form saw a 70% drop-off rate.",
      ]),
      approach: richTextFromParagraphs([
        'We rebuilt the site on a modern, image-optimized stack, redesigned the quote flow into a 3-step form, and optimized every page for Core Web Vitals.',
      ]),
      results: [
        { metric: '0.9s', label: 'average page load time' },
        { metric: '+40%', label: 'quote form conversion rate' },
        { metric: '98', label: 'Lighthouse performance score' },
      ],
      _status: 'published',
    },
  })

  // ── Insights (blog) ──────────────────────────────────────────
  const category = await payload.create({
    collection: 'categories',
    data: { title: 'Social Media Strategy' },
  })

  await payload.create({
    collection: 'posts',
    data: {
      title: "Why Posting More Isn't the Same as Growing Faster",
      heroImage: postHero.id,
      categories: [category.id],
      publishedAt: new Date().toISOString(),
      _status: 'published',
      meta: {
        title: "Why Posting More Isn't the Same as Growing Faster | Fastora",
        description:
          'Posting frequency is not a growth strategy. Here is what actually moves engagement and followers.',
      },
      content: richTextHeadingAndParagraphs("Why Posting More Isn't the Same as Growing Faster", [
        'Posting more often does not reliably grow an account. What moves the numbers is relevance: content built around a small number of clear pillars, published consistently, and refined using real performance data.',
        'Brands that post five times a day with no strategy often see flat or declining reach, because the algorithm and the audience both reward signal over volume. A tighter content calendar built around 3-4 pillars, backed by weekly performance review, consistently outperforms high-frequency, low-strategy posting.',
        'The fix is not posting less or more — it is posting on purpose. Define your pillars, commit to a cadence you can sustain, and let the data tell you what to double down on.',
      ]),
    },
  })

  // ── Home Page ────────────────────────────────────────────────
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const homeData = {
    title: 'Home',
    hero: {
      type: 'highImpact' as const,
      richText: richTextHeadingAndParagraphs(
        'Digital services and social media, engineered for speed.',
        [
          'Fastora is the agency built for brands who move fast — sharp strategy, fast execution, work that compounds.',
        ],
      ),
      links: [
        { link: { type: 'custom' as const, url: '/contact', label: 'Start a project', appearance: 'default' as const } },
        { link: { type: 'custom' as const, url: '/work', label: 'See our work', appearance: 'outline' as const } },
      ],
    },
    layout: [
      {
        blockType: 'servicesOverview' as const,
        eyebrow: 'What we do',
        heading: 'Services that move at your speed',
        limit: 6,
      },
      {
        blockType: 'whyFastora' as const,
        eyebrow: 'Why Fastora',
        heading: 'Engineered speed, not chaotic speed',
        points: [
          {
            stat: '48hr',
            title: 'Average turnaround',
            description: 'From brief to first draft in two days, not two weeks.',
          },
          {
            stat: '3x',
            title: 'Average engagement lift',
            description: 'Across client social accounts within the first 90 days.',
          },
          {
            stat: '100%',
            title: 'In-house execution',
            description: 'No outsourced black boxes — one accountable team end to end.',
          },
        ],
      },
      {
        blockType: 'selectedWork' as const,
        eyebrow: 'Selected work',
        heading: 'Results, not just deliverables',
        limit: 3,
      },
      {
        blockType: 'testimonialsBlock' as const,
        eyebrow: 'Client results',
        heading: 'Brands that move fast with us',
        limit: 3,
      },
      {
        blockType: 'faq' as const,
        eyebrow: 'FAQ',
        heading: 'Questions, answered directly',
        items: [
          {
            question: 'What does Fastora do?',
            answer:
              'Fastora is a digital services and social media agency that handles social media management, content creation, web design and development, AI-powered content systems, digital campaigns, and brand identity — all under one accountable team.',
          },
          {
            question: 'How fast can Fastora start on a project?',
            answer:
              'Most engagements kick off within 48 hours of a signed brief, with first deliverables typically in your hands within one to two weeks depending on scope.',
          },
          {
            question: 'Does Fastora work with brands outside a specific industry?',
            answer:
              'Yes. Fastora works with brands globally across e-commerce, SaaS, hospitality, logistics, beauty, and professional services — the approach adapts, the speed does not.',
          },
          {
            question: 'What makes Fastora different from other agencies?',
            answer:
              "Everything is executed in-house by one team, on fixed short-cycle sprints, so you always know who's accountable and when work ships — no black-box subcontracting.",
          },
        ],
      },
      {
        blockType: 'latestInsights' as const,
        eyebrow: 'Insights',
        heading: 'Fresh thinking, shipped weekly',
        limit: 3,
      },
      {
        blockType: 'cta' as const,
        richText: richTextFromParagraphs(['Ready to move faster?']),
        links: [
          { link: { type: 'custom' as const, url: '/contact', label: 'Start a project', appearance: 'default' as const } },
        ],
      },
    ],
    _status: 'published' as const,
    slug: 'home',
  }

  if (existingHome.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existingHome.docs[0].id,
      data: homeData,
    })
  } else {
    await payload.create({
      collection: 'pages',
      data: homeData,
    })
  }

  payload.logger.info('Seed complete.')
}

await run()
