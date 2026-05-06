"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronDown,
  Cloud,
  Code2,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Palette,
  Play,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Animation helpers ────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <FadeUp className={cn("mb-10", center && "text-center")}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-500">
        {label}
      </p>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-muted-foreground sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "50K+", label: "Active learners" },
  { value: "600+", label: "Expert courses" },
  { value: "94%", label: "Completion rate" },
  { value: "4.9★", label: "Average rating" },
];

const CATEGORIES = [
  {
    icon: Code2,
    label: "Development",
    count: 142,
    color:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  {
    icon: Palette,
    label: "Design",
    count: 89,
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    icon: LayoutDashboard,
    label: "Data Science",
    count: 67,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    icon: Brain,
    label: "AI & ML",
    count: 54,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
  {
    icon: TrendingUp,
    label: "Business",
    count: 91,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    icon: Lock,
    label: "Cybersecurity",
    count: 38,
    color:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  {
    icon: Smartphone,
    label: "Mobile Dev",
    count: 45,
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    icon: Cloud,
    label: "Cloud & DevOps",
    count: 52,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
];

const COURSES = [
  {
    icon: Code2,
    tag: "Development",
    tagColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600",
    title: "React & Next.js Masterclass",
    desc: "Build full-stack apps with the latest Next.js 15 App Router",
    instructor: "Mark K.",
    initials: "MK",
    avatarColor: "bg-violet-100 text-violet-700",
    reviews: "2.4k",
    duration: "12h",
    price: "Free",
    popular: false,
  },
  {
    icon: Brain,
    tag: "AI & ML",
    tagColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600",
    title: "Machine Learning A–Z",
    desc: "From regression to transformers with Python & PyTorch",
    instructor: "Sarah C.",
    initials: "SC",
    avatarColor: "bg-emerald-100 text-emerald-700",
    reviews: "5.1k",
    duration: "24h",
    price: "$49",
    originalPrice: "$120",
    popular: true,
  },
  {
    icon: LayoutDashboard,
    tag: "Data Science",
    tagColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600",
    title: "Data Analysis with Python",
    desc: "Pandas, Matplotlib, and real-world datasets from day one",
    instructor: "James L.",
    initials: "JL",
    avatarColor: "bg-amber-100 text-amber-700",
    reviews: "1.9k",
    duration: "18h",
    price: "$39",
    originalPrice: "$99",
    popular: false,
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pick your path",
    desc: "Take a 2-min quiz and get a personalised learning roadmap.",
    color: "bg-violet-50 dark:bg-violet-950/30",
    numColor: "text-violet-600",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    num: "02",
    title: "Learn by doing",
    desc: "Video lessons paired with hands-on coding labs and quizzes.",
    color: "bg-emerald-50 dark:bg-emerald-950/30",
    numColor: "text-emerald-600",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    num: "03",
    title: "Get mentored",
    desc: "Weekly 1-on-1 sessions with industry professionals.",
    color: "bg-amber-50 dark:bg-amber-950/30",
    numColor: "text-amber-600",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    num: "04",
    title: "Earn & showcase",
    desc: "Verified certificates shared directly to your LinkedIn.",
    color: "bg-rose-50 dark:bg-rose-950/30",
    numColor: "text-rose-600",
    border: "border-rose-200 dark:border-rose-800",
  },
];

const PATHS = [
  {
    icon: Code2,
    bg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600",
    fillColor: "bg-violet-500",
    title: "Frontend Developer",
    tag: "Beginner",
    tagColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    desc: "HTML → CSS → JS → React · 8 courses · ~6 months",
    progress: 50,
    enrolled: null,
    cta: "Continue",
    ctaVariant: "outline" as const,
  },
  {
    icon: Brain,
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600",
    fillColor: "bg-emerald-500",
    title: "AI/ML Engineer",
    tag: "Intermediate",
    tagColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    desc: "Python → ML → Deep Learning → Deployment · 10 courses · ~9 months",
    progress: 0,
    enrolled: "1,240 enrolled this month",
    cta: "Start path",
    ctaVariant: "default" as const,
  },
  {
    icon: Lock,
    bg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600",
    fillColor: "bg-amber-500",
    title: "Cybersecurity Analyst",
    tag: "Advanced",
    tagColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    desc: "Networks → Ethical Hacking → Incident Response · 12 courses · ~12 months",
    progress: 0,
    enrolled: null,
    cta: "Explore",
    ctaVariant: "outline" as const,
  },
];

const INSTRUCTORS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    role: "ML Engineer @ OpenAI · 12 yrs exp.",
    tags: ["AI", "Python"],
    courses: 14,
    students: "48K",
    rating: "4.9★",
    bg: "bg-violet-100 dark:bg-violet-900/40",
    color: "text-violet-700 dark:text-violet-300",
  },
  {
    initials: "MK",
    name: "Mark Kowalski",
    role: "Staff Engineer @ Vercel · 10 yrs exp.",
    tags: ["React", "TypeScript"],
    courses: 9,
    students: "32K",
    rating: "4.8★",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    color: "text-emerald-700 dark:text-emerald-300",
  },
  {
    initials: "PL",
    name: "Priya Lal",
    role: "Design Lead @ Airbnb · 8 yrs exp.",
    tags: ["UI/UX", "Figma"],
    courses: 7,
    students: "21K",
    rating: "4.9★",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    color: "text-amber-700 dark:text-amber-300",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The ML course completely transformed my career. I went from a spreadsheet analyst to a junior ML engineer in 7 months. The projects were real-world, not toy examples.",
    name: "Rahul K.",
    role: "ML Engineer · Hired at TCS",
    initials: "RK",
    accentColor: "text-violet-500",
    bg: "bg-violet-100 dark:bg-violet-900/40",
    color: "text-violet-700 dark:text-violet-300",
  },
  {
    quote:
      "I tried three other platforms before this one. The mentorship is what makes the difference — getting unstuck in 24h instead of spending days on Stack Overflow.",
    name: "Amira M.",
    role: "Fullstack Dev · Freelancing",
    initials: "AM",
    accentColor: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    color: "text-emerald-700 dark:text-emerald-300",
  },
  {
    quote:
      "As a working mum, I could only study evenings. The async format meant I never fell behind. Finished the UX path in 9 months and just landed my first design role.",
    name: "Fatima N.",
    role: "UX Designer · Remote",
    initials: "FN",
    accentColor: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    color: "text-amber-700 dark:text-amber-300",
  },
  {
    quote:
      "The certificate alone didn't get me the job — the portfolio project did. Building something real during the course gave me something concrete to show in interviews.",
    name: "Diego P.",
    role: "Backend Dev · Buenos Aires",
    initials: "DP",
    accentColor: "text-rose-500",
    bg: "bg-rose-100 dark:bg-rose-900/40",
    color: "text-rose-700 dark:text-rose-300",
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    popular: false,
    features: [
      { text: "5 free courses", included: true },
      { text: "Community access", included: true },
      { text: "Mentorship sessions", included: false },
      { text: "Verified certificates", included: false },
    ],
    cta: "Get started free",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    popular: true,
    features: [
      { text: "All 600+ courses", included: true },
      { text: "2 mentor sessions/mo", included: true },
      { text: "Verified certificates", included: true },
      { text: "Team dashboard", included: false },
    ],
    cta: "Start 7-day trial",
    variant: "default" as const,
  },
  {
    name: "Teams",
    price: "$79",
    period: "/user/mo",
    popular: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited mentorship", included: true },
      { text: "Team dashboard", included: true },
      { text: "Custom learning paths", included: true },
    ],
    cta: "Contact sales",
    variant: "outline" as const,
  },
];

const FAQS = [
  "Do I need any prior experience to start?",
  "How long do I have access to a course?",
  "Are the certificates recognised by employers?",
  "Can I switch plans or cancel anytime?",
];

const LOGOS = ["Google", "Microsoft", "Shopify", "Stripe", "Notion", "Figma"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">
      {/* ── SECTION 1: Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pb-16 pt-24 grainy"
      >
        {/* Mesh blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px]" />
          <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-rose-400/15 blur-[100px]" />
          <div className="absolute bottom-0 -left-20 h-[350px] w-[350px] rounded-full bg-emerald-400/15 blur-[100px]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container flex max-w-4xl flex-col items-center gap-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="gap-1.5 px-4 py-1.5 text-sm font-medium shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-violet-500" />
              50,000+ learners worldwide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          >
            Learn Today,{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
                Lead Tomorrow.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Expert-led courses in tech, design, and business. Learn at your pace
            with real projects and mentorship from industry pros.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25"
              asChild
            >
              <Link href="/courses">
                <Play className="h-4 w-4 fill-current" />
                Start Learning Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="/courses">
                Explore Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  "bg-violet-400",
                  "bg-emerald-400",
                  "bg-amber-400",
                  "bg-rose-400",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-7 w-7 rounded-full border-2 border-background",
                      c,
                    )}
                  />
                ))}
              </div>
              <span>
                <strong className="font-semibold text-foreground">4.9 ★</strong>{" "}
                from 12,000+ reviews
              </span>
            </div>
            <span className="hidden sm:inline">·</span>
            <span>No credit card needed</span>
          </motion.div>

          {/* Floating course card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-md"
          >
            <Card className="border-violet-200 bg-card/80 shadow-xl shadow-violet-500/10 backdrop-blur dark:border-violet-800">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/50">
                  <Code2 className="h-6 w-6 text-violet-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    Python for Data Science
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    by Sarah Chen · 48 lessons · 12h
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[62%] rounded-full bg-violet-500" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    62% complete · resume where you left off
                  </p>
                </div>
                <Button
                  size="icon"
                  className="shrink-0 bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: Trust logos ───────────────────────────────────────── */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container">
          <FadeUp>
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Trusted by learners at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {LOGOS.map((logo) => (
                <span
                  key={logo}
                  className="text-sm font-semibold text-muted-foreground/50 transition-opacity hover:text-muted-foreground"
                >
                  {logo}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 3: Stats ─────────────────────────────────────────────── */}
      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <p className="font-heading text-4xl font-bold text-violet-600">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: How it works ──────────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <SectionHeader
          label="How it works"
          title="From zero to job-ready in 4 steps"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.1}>
              <div
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border p-6 transition-shadow hover:shadow-md",
                  step.color,
                  step.border,
                )}
              >
                <span
                  className={cn(
                    "font-heading text-3xl font-bold opacity-80",
                    step.numColor,
                  )}
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: Categories ────────────────────────────────────────── */}
      <section className="border-y bg-muted/20 py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <SectionHeader label="Browse by topic" title="Categories" />
            <FadeUp>
              <Link
                href="/courses"
                className="mb-10 flex items-center gap-1 text-sm font-medium text-violet-600 hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeUp>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <FadeUp key={cat.label} delay={i * 0.06}>
                <Link href="/courses">
                  <div className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        cat.color,
                      )}
                    >
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {cat.count} courses
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Featured courses ──────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between">
          <SectionHeader label="Handpicked for you" title="Featured courses" />
          <FadeUp>
            <Link
              href="/courses"
              className="mb-10 flex items-center gap-1 text-sm font-medium text-violet-600 hover:underline"
            >
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {COURSES.map((course, i) => (
            <FadeUp key={course.title} delay={i * 0.1}>
              <Card
                className={cn(
                  "flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg",
                  course.popular && "ring-2 ring-violet-500",
                )}
              >
                {course.popular && (
                  <div className="bg-violet-500 py-1.5 text-center text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <div
                  className={cn(
                    "flex h-28 items-center justify-center",
                    course.bg,
                  )}
                >
                  <course.icon className={cn("h-10 w-10", course.iconColor)} />
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge
                      className={cn("text-xs font-medium", course.tagColor)}
                    >
                      {course.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold leading-snug">{course.title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {course.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
                        course.avatarColor,
                      )}
                    >
                      {course.initials}
                    </div>
                    <span>{course.instructor}</span>
                    <span className="ml-auto flex items-center gap-0.5 text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                    </span>
                    <span>({course.reviews})</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant={course.popular ? "default" : "outline"}
                      className={
                        course.popular
                          ? "bg-violet-600 hover:bg-violet-700 text-white"
                          : ""
                      }
                      asChild
                    >
                      <Link href="/courses">Enrol now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SECTION 7: Learning paths ────────────────────────────────────── */}
      <section className="border-y bg-muted/20 py-16 md:py-24">
        <div className="container">
          <SectionHeader
            label="Structured journeys"
            title="Career learning paths"
            subtitle="Curated sequences of courses that take you from beginner to hireable."
          />
          <div className="flex flex-col gap-4">
            {PATHS.map((path, i) => (
              <FadeUp key={path.title} delay={i * 0.1}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-wrap items-center gap-4 p-5 sm:flex-nowrap">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        path.bg,
                      )}
                    >
                      <path.icon className={cn("h-6 w-6", path.iconColor)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{path.title}</span>
                        <Badge className={cn("text-xs", path.tagColor)}>
                          {path.tag}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {path.desc}
                      </p>
                      {path.progress > 0 && (
                        <>
                          <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                path.fillColor,
                              )}
                              style={{ width: `${path.progress}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            4 of 8 courses complete
                          </p>
                        </>
                      )}
                      {path.enrolled && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Not started ·{" "}
                          <span className="font-medium text-emerald-600">
                            {path.enrolled}
                          </span>
                        </p>
                      )}
                    </div>
                    <Button
                      variant={path.ctaVariant}
                      size="sm"
                      className={cn(
                        "shrink-0",
                        path.ctaVariant === "default" &&
                          "bg-violet-600 hover:bg-violet-700 text-white",
                      )}
                      asChild
                    >
                      <Link href="/courses">{path.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: Instructors ───────────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <SectionHeader
          label="World-class educators"
          title="Meet your instructors"
          subtitle="Industry professionals who've been where you want to go."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {INSTRUCTORS.map((inst, i) => (
            <FadeUp key={inst.name} delay={i * 0.1}>
              <Card className="h-full text-center transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div
                    className={cn(
                      "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold",
                      inst.bg,
                      inst.color,
                    )}
                  >
                    {inst.initials}
                  </div>
                  <h3 className="font-semibold">{inst.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {inst.role}
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {inst.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-around border-t pt-4 text-xs text-muted-foreground">
                    {[
                      { v: inst.courses, l: "courses" },
                      { v: inst.students, l: "students" },
                      { v: inst.rating, l: "rating" },
                    ].map(({ v, l }) => (
                      <div key={l}>
                        <p className="text-base font-semibold text-foreground">
                          {v}
                        </p>
                        <p>{l}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SECTION 9: Testimonials ──────────────────────────────────────── */}
      <section className="border-y bg-muted/20 py-16 md:py-24">
        <div className="container">
          <SectionHeader
            label="Success stories"
            title="What learners say"
            center
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <span
                      className={cn(
                        "font-heading text-4xl font-bold leading-none",
                        t.accentColor,
                      )}
                    >
                      &ldquo;
                    </span>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {t.quote}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                          t.bg,
                          t.color,
                        )}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                      <div className="ml-auto flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: Pricing ──────────────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <SectionHeader
          label="Simple pricing"
          title="Plans for every stage"
          subtitle="No hidden fees. Cancel any time."
          center
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {PRICING.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.1}>
              <Card
                className={cn(
                  "relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg",
                  plan.popular && "ring-2 ring-violet-500",
                )}
              >
                {plan.popular && (
                  <div className="absolute -right-8 top-5 rotate-45 bg-violet-500 px-10 py-1 text-xs font-semibold text-white">
                    Popular
                  </div>
                )}
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {plan.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="my-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((f) => (
                      <li
                        key={f.text}
                        className={cn(
                          "flex items-center gap-2 text-sm",
                          !f.included && "opacity-40",
                        )}
                      >
                        {f.included ? (
                          <Zap className="h-4 w-4 shrink-0 text-violet-500" />
                        ) : (
                          <span className="h-4 w-4 shrink-0 text-center text-muted-foreground">
                            ×
                          </span>
                        )}
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.variant}
                    className={cn(
                      "w-full",
                      plan.popular &&
                        "bg-violet-600 hover:bg-violet-700 text-white",
                    )}
                    asChild
                  >
                    <Link href="/courses">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SECTION 11: FAQ ──────────────────────────────────────────────── */}
      <section className="border-y bg-muted/20 py-16 md:py-24">
        <div className="container max-w-2xl">
          <SectionHeader
            label="Got questions?"
            title="Frequently asked"
            center
          />
          <div className="flex flex-col gap-2">
            {FAQS.map((q, i) => (
              <FadeUp key={q} delay={i * 0.06}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between rounded-xl border bg-card px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-muted/50"
                >
                  {q}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      openFaq === i && "rotate-180",
                    )}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-b-xl border-x border-b bg-card px-5 py-4 text-sm text-muted-foreground"
                  >
                    Our platform is designed to meet learners at every level.
                    Tap any question to learn more, or{" "}
                    <Link
                      href="/courses"
                      className="text-violet-600 underline underline-offset-2"
                    >
                      contact us
                    </Link>{" "}
                    for a personal answer.
                  </motion.div>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: CTA Banner ───────────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-violet-600 px-8 py-16 text-center text-white shadow-2xl shadow-violet-500/30">
            {/* Decorative blobs */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-800/40 blur-3xl" />
            </div>
            <div className="relative">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <GraduationCap className="h-4 w-4" />
                Ready to level up?
              </div>
              <h2 className="font-heading mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                Start your free 7-day trial today
              </h2>
              <p className="mx-auto mt-4 max-w-md text-violet-200">
                No credit card required. Access all Pro features. Cancel
                whenever.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-violet-600 hover:bg-violet-50 shadow-lg"
                  asChild
                >
                  <Link href="/courses">
                    <Sparkles className="h-4 w-4" />
                    Start free trial
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/40 hover:bg-white/10 text-black"
                  asChild
                >
                  <Link href="">
                    <Users className="h-4 w-4" />
                    Become an instructor
                  </Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center justify-center gap-4 text-sm text-violet-200">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" /> 600+ courses
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> 50K+ learners
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current text-amber-300" /> 4.9
                  rated
                </span>
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
