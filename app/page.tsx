import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Building2, Calculator, CarFront, CheckCircle2,
  ChevronRight, CircleHelp, Clock3, FileText, HeartPulse, Home, Landmark,
  LockKeyhole, PiggyBank, ShieldCheck, Sparkles, TrendingUp, Wallet,
} from "lucide-react";
import { Hero3DContainer } from "@/components/3d/Hero3DContainer";
import { Hero3DFallback } from "@/components/3d/Hero3DFallback";
import { EmiCalculator } from "@/components/calculator/EmiCalculator";
import { ProviderComparison } from "@/components/providers/ProviderComparison";

const services = [
  { title: "Home loan", detail: "Purchase, resale and construction", href: "/loans/home-loan", icon: Home, tone: "blue" },
  { title: "Personal loan", detail: "Plan for life's big expenses", href: "/loans/personal-loan", icon: Wallet, tone: "violet" },
  { title: "Business loan", detail: "Working capital and expansion", href: "/loans/business-loan", icon: Building2, tone: "cyan" },
  { title: "Vehicle loan", detail: "Finance for your next drive", href: "/loans/vehicle-loan", icon: CarFront, tone: "amber" },
  { title: "Loan against property", detail: "Explore property-backed finance", href: "/loans/loan-against-property", icon: Landmark, tone: "emerald" },
  { title: "Insurance", detail: "Health, life and motor cover", href: "/insurance", icon: HeartPulse, tone: "rose" },
  { title: "Investments & SIP", detail: "Understand long-term options", href: "/investments", icon: TrendingUp, tone: "indigo" },
  { title: "Balance transfer", detail: "Review your existing loan", href: "/loans/balance-transfer", icon: PiggyBank, tone: "teal" },
];

const steps = [
  ["01", "Tell us what you need", "Choose a service and share only the details needed for your enquiry."],
  ["02", "Explore indicative options", "Review available information and estimate repayments before you apply."],
  ["03", "Get assistance", "Our team can help you understand documentation and next steps."],
];

const faqs = [
  ["Is VSR Associates a bank or lender?", "No. VSR Associates is a financial-services discovery and application-assistance facilitator, not a bank, NBFC or insurer."],
  ["Does an enquiry guarantee approval?", "No. Each lender or insurer makes its own eligibility, pricing, underwriting and approval decisions."],
  ["Are the EMI figures final offers?", "No. EMI results are estimates based on the amount, rate and tenure you enter. Actual terms and fees are set by the relevant institution."],
];

export default function HomePage() {
  return (
    <div className="vsr-home">
      <section className="hero-shell">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-dark"><Sparkles size={14} /> Financial choices, made clearer</div>
            <h1>Make your next<br /><span>money move</span><br />with confidence.</h1>
            <p className="hero-description">Explore financing, compare indicative information and plan your next step with a little more clarity — all in one place.</p>
            <div className="hero-actions">
              <Link href="/apply?service=loan&sub=home-loan" className="button button-primary">Explore your options <ArrowRight size={17} /></Link>
              <Link href="/emi-calculator" className="button button-glass"><Calculator size={17} /> Calculate EMI</Link>
            </div>
            <div className="hero-assurance">
              <span><ShieldCheck size={16} /> Clear, upfront disclaimers</span>
              <span><LockKeyhole size={16} /> Consent-led enquiries</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-label art-label-top"><span className="status-dot" /> Your goals, in focus</div>
            <Hero3DContainer />
            <div className="art-label art-label-bottom"><span className="art-label-icon"><Calculator size={16} /></span><span><b>Plan before you apply</b><small>Estimate. Compare. Decide.</small></span></div>
          </div>
        </div>
        <div className="site-container hero-bottom">
          <span>One starting point for</span>
          <div><b>Borrowing</b><i /> <b>Protection</b><i /> <b>Growing your money</b></div>
        </div>
      </section>

      <section className="section section-services" id="services">
        <div className="site-container">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> FIND YOUR STARTING POINT</div><h2>What are you planning for?</h2><p>Start with a goal. Explore the options and information relevant to you.</p></div>
            <Link href="/loans" className="text-link">View all services <ArrowRight size={16} /></Link>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return <Link href={service.href} key={service.title} className="service-card">
                <div className={`service-icon tone-${service.tone}`}><Icon size={22} strokeWidth={1.8} /></div>
                <div className="service-card-copy"><h3>{service.title}</h3><p>{service.detail}</p></div>
                <span className="service-arrow"><ArrowRight size={17} /></span>
              </Link>;
            })}
          </div>
          <p className="section-footnote"><LockKeyhole size={13} /> Exploring the website does not require you to submit an enquiry.</p>
        </div>
      </section>

      <section className="section section-calculator">
        <div className="site-container">
          <div className="calculator-intro"><div className="eyebrow"><span className="eyebrow-line" /> PLAN WITH NUMBERS</div><h2>Know the monthly commitment<br /><span>before you commit.</span></h2><p>Adjust the amount, interest rate and tenure to understand an estimated monthly repayment and total interest.</p><div className="calculator-note"><CircleHelp size={16} /> An estimate, not a loan offer or sanction.</div></div>
          <div className="calculator-panel"><EmiCalculator compact initialPrincipal={5000000} initialRate={8.5} initialTenureMonths={240} /></div>
        </div>
      </section>

      <section className="section section-providers">
        <div className="site-container">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> INFORMATION TO COMPARE</div><h2>Explore provider information</h2><p>Review the indicative details currently listed in our catalogue.</p></div><div className="provider-note"><BadgeCheck size={17} /> Check source and date before relying on a rate</div></div>
          <ProviderComparison category="loan" title="Loan provider catalogue" />
          <p className="section-footnote">Rates, fees, eligibility and availability may change. Listing a provider does not imply an official partnership or guarantee of approval.</p>
        </div>
      </section>

      <section className="section section-process">
        <div className="site-container process-layout">
          <div className="process-intro"><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> A SIMPLE WAY FORWARD</div><h2>From question<br />to next step.</h2><p>No pressure to decide everything today. Start with the information you need.</p><Link href="/apply" className="button button-primary">Start an enquiry <ArrowRight size={17} /></Link></div>
          <div className="process-list">{steps.map(([number, title, description]) => <div className="process-step" key={number}><div className="process-number">{number}</div><div><h3>{title}</h3><p>{description}</p></div><ChevronRight className="process-chevron" size={19} /></div>)}</div>
        </div>
      </section>

      <section className="section section-faq">
        <div className="site-container faq-layout">
          <div><div className="eyebrow"><span className="eyebrow-line" /> GOOD TO KNOW</div><h2>Clarity comes first.</h2><p>Important details before you explore financial products.</p><Link href="/faqs" className="text-link">Read all FAQs <ArrowRight size={16} /></Link></div>
          <div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="site-container final-cta">
        <div className="cta-icon"><FileText size={24} /></div><div><div className="eyebrow eyebrow-dark">YOUR NEXT STEP</div><h2>Have a specific requirement?</h2><p>Share the basics and let the team understand what you're looking for.</p></div><Link href="/apply" className="button button-dark">Tell us what you need <ArrowRight size={17} /></Link>
      </section>

      <div className="site-container disclaimer-strip"><Clock3 size={15} /><span>Financial information is indicative and for general guidance only. Final rates, eligibility, coverage, returns and approvals are determined by the respective regulated institution. Investments are subject to market risk.</span></div>
    </div>
  );
}
