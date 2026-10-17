export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: "loan" | "insurance" | "investment";
  iconName: string;
  indicativeRateRange?: string;
  indicativeTenureRange?: string;
  maxAmountIndicative?: string;
  useCases: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  faqs: { question: string; answer: string }[];
}

export const LOAN_SERVICES: ServiceItem[] = [
  {
    id: "home-loan",
    slug: "home-loan",
    title: "Home Loan",
    category: "loan",
    iconName: "Home",
    shortDescription: "Financing assistance for purchasing new or resale residential property, ready-to-move homes, and under-construction units.",
    indicativeRateRange: "8.50% - 9.85% p.a.",
    indicativeTenureRange: "Up to 30 Years",
    maxAmountIndicative: "Up to ₹10 Crore (Based on lender appraisal)",
    useCases: [
      "Purchase of ready-to-move apartment or villa",
      "Purchase of under-construction builder project",
      "Resale property acquisition from existing owner",
      "Self-construction on pre-owned freehold land",
    ],
    eligibilityCriteria: [
      "Resident Indians & Non-Resident Indians (NRIs)",
      "Salaried individuals with min. 2 years total work experience",
      "Self-employed individuals with min. 3 years stable business operation",
      "Minimum monthly net income of ₹25,000 for salaried applicants",
      "Credit score (CIBIL) preferably 750 or higher for competitive rate tiers",
    ],
    requiredDocuments: [
      "Identity & Address Proof (Aadhaar Card, PAN Card, Passport)",
      "Salaried: Latest 3 months salary slips and 6 months bank statement",
      "Self-Employed: Last 2-3 years audited ITR with computation of income",
      "Property Documents: Agreement to sell, title deed, sanction layout plan",
    ],
    faqs: [
      {
        question: "Does VSR Associates approve or disburse the home loan directly?",
        answer: "No. VSR Associates provides financial comparison, documentation facilitation, and application assistance. Sanction, interest rates, and loan disbursement remain exclusively at the discretion of the partner bank or NBFC.",
      },
      {
        question: "What is the typical processing time for a home loan?",
        answer: "Lender in-principle sanction typically takes 3 to 7 working days once all verified KYC, financial, and title documents are submitted.",
      },
      {
        question: "Can I include a co-applicant to increase loan eligibility?",
        answer: "Yes. Adding an earning co-applicant (spouse, parent, or child) allows their income to be combined, enhancing your total borrowing capacity.",
      },
    ],
  },
  {
    id: "plot-loan",
    slug: "plot-loan",
    title: "Plot Loan",
    category: "loan",
    iconName: "Landmark",
    shortDescription: "Specialised financing to acquire residential plots or land parcels for future self-construction.",
    indicativeRateRange: "8.75% - 10.25% p.a.",
    indicativeTenureRange: "Up to 15 Years",
    maxAmountIndicative: "Up to 75% of plot valuation",
    useCases: [
      "Purchase of residential plots in authority-approved layouts",
      "Purchase of freehold gated community land",
      "Composite plot purchase plus construction loan bundle",
    ],
    eligibilityCriteria: [
      "Age bracket: 21 to 65 years",
      "Residential plot must be located within municipal or approved urban limits",
      "Land must not be designated for agricultural or non-permitted use",
    ],
    requiredDocuments: [
      "KYC & Proof of Income",
      "Plot title deeds tracing 30-year lineage",
      "Approved layout map from town planning authority",
      "Latest property tax receipts and Encumbrance Certificate (EC)",
    ],
    faqs: [
      {
        question: "Is there a deadline to begin construction after buying a plot?",
        answer: "Most financial institutions require construction to commence within 3 to 5 years from plot loan disbursement.",
      },
    ],
  },
  {
    id: "construction-loan",
    slug: "construction-loan",
    title: "Construction Loan",
    category: "loan",
    iconName: "HardHat",
    shortDescription: "Stage-wise disbursed financing to construct a independent house or residential floor on owned land.",
    indicativeRateRange: "8.65% - 10.00% p.a.",
    indicativeTenureRange: "Up to 25 Years",
    maxAmountIndicative: "Up to 80% of certified construction estimate",
    useCases: [
      "Ground-up construction on self-owned residential plot",
      "Adding additional floors or extending an existing residential unit",
    ],
    eligibilityCriteria: [
      "Clear, marketable freehold title on the plot",
      "Architect-certified structural blueprint and cost estimate",
      "Municipal building permit approval",
    ],
    requiredDocuments: [
      "Income proof of applicant",
      "Registered sale deed of the land",
      "Architect / civil engineer approved construction estimate",
      "Local municipal building permission",
    ],
    faqs: [
      {
        question: "How is money disbursed for construction?",
        answer: "Funds are disbursed in progressive milestones (foundation, plinth, lintel, brickwork, finishing) following physical inspection by the lender's technical valuer.",
      },
    ],
  },
  {
    id: "personal-loan",
    slug: "personal-loan",
    title: "Personal Loan",
    category: "loan",
    iconName: "UserCheck",
    shortDescription: "Unsecured financing for medical emergencies, wedding expenses, home renovation, or debt consolidation.",
    indicativeRateRange: "10.50% - 18.00% p.a.",
    indicativeTenureRange: "1 to 5 Years",
    maxAmountIndicative: "₹50,000 to ₹40 Lakhs",
    useCases: [
      "Emergency medical treatments",
      "Wedding or festive family events",
      "Home interior upgrade or urgent repair",
      "High-cost credit card debt consolidation",
    ],
    eligibilityCriteria: [
      "Salaried professionals or registered self-employed individuals",
      "Age: 21 to 58 years",
      "Minimum net monthly salary: ₹20,000",
      "Healthy repayment track record with no recent defaults",
    ],
    requiredDocuments: [
      "PAN Card & Aadhaar Card",
      "Last 3 months payslips & 3 months bank statement",
      "Company ID card (for salaried applicants)",
    ],
    faqs: [
      {
        question: "Is collateral required for a personal loan?",
        answer: "No. Personal loans are purely unsecured facilities based on the applicant's credit score and repayment capability.",
      },
    ],
  },
  {
    id: "business-loan",
    slug: "business-loan",
    title: "Business Loan",
    category: "loan",
    iconName: "Briefcase",
    shortDescription: "Working capital, expansion capital, and machinery term loans for MSMEs, traders, and enterprises.",
    indicativeRateRange: "11.00% - 19.50% p.a.",
    indicativeTenureRange: "1 to 7 Years",
    maxAmountIndicative: "₹2 Lakhs to ₹5 Crore",
    useCases: [
      "Working capital cycle and inventory replenishment",
      "Purchase of industrial plant, machinery or equipment",
      "Opening new branch offices or retail outlets",
      "Staff expansion and operational scale-up",
    ],
    eligibilityCriteria: [
      "Minimum 2 to 3 years in current business operations",
      "Annual turnover of ₹25 Lakhs or above",
      "Clean GST filing track record",
      "Positive net profit margin for the past 2 financial years",
    ],
    requiredDocuments: [
      "Business registration proof (GST, Udyam, Shop & Est)",
      "Last 2 years audited balance sheets & P&L statements",
      "Last 12 months primary current bank account statement",
      "Promoters' KYC and CIBIL report",
    ],
    faqs: [
      {
        question: "Can MSMEs get collateral-free business loans?",
        answer: "Yes. Many partner banks and NBFCs offer unsecured MSME credit facilities up to ₹50 Lakhs depending on turnover and banking transaction volume.",
      },
    ],
  },
  {
    id: "vehicle-loan",
    slug: "vehicle-loan",
    title: "Vehicle Loan",
    category: "loan",
    iconName: "Car",
    shortDescription: "Financing for new and pre-owned personal cars, two-wheelers, and commercial fleet vehicles.",
    indicativeRateRange: "8.75% - 12.50% p.a.",
    indicativeTenureRange: "1 to 7 Years",
    maxAmountIndicative: "Up to 90% of on-road vehicle price",
    useCases: [
      "New passenger car purchase",
      "Certified pre-owned luxury or family vehicle",
      "Commercial transport vehicles and fleet addition",
    ],
    eligibilityCriteria: [
      "Minimum age: 21 years",
      "Stable employment or commercial transport license (for commercial vehicles)",
      "Satisfactory credit history",
    ],
    requiredDocuments: [
      "KYC & Income proof",
      "Vehicle proforma invoice or quotation from authorized dealership",
      "Valuation report & RC copy (for pre-owned vehicles)",
    ],
    faqs: [
      {
        question: "Is hypothecation required on vehicle loans?",
        answer: "Yes, the vehicle remains hypothecated to the financing bank on the Registration Certificate (RC) until full loan settlement.",
      },
    ],
  },
  {
    id: "education-loan",
    slug: "education-loan",
    title: "Education Loan",
    category: "loan",
    iconName: "GraduationCap",
    shortDescription: "Assistance for higher education in India and overseas universities covering tuition, boarding, and travel.",
    indicativeRateRange: "9.25% - 13.00% p.a.",
    indicativeTenureRange: "Up to 15 Years",
    maxAmountIndicative: "Up to ₹1.5 Crore",
    useCases: [
      "Undergraduate and postgraduate degree programs abroad",
      "Premier Indian institutions (IITs, IIMs, medical universities)",
      "Flight training, STEM certifications, and specialized diplomas",
    ],
    eligibilityCriteria: [
      "Confirmed admission letter from a recognized university",
      "Earning co-applicant (parent, guardian or spouse)",
      "Collateral required for loans above ₹7.5 Lakhs at select lenders",
    ],
    requiredDocuments: [
      "Admission letter and fee breakdown schedule",
      "Academic records (10th, 12th, graduation mark sheets)",
      "Co-borrower income documents and asset papers (if collateralized)",
    ],
    faqs: [
      {
        question: "When does education loan repayment begin?",
        answer: "Repayments generally begin after the moratorium period: Course duration + 6 to 12 months after course completion or upon getting employment.",
      },
    ],
  },
  {
    id: "balance-transfer",
    slug: "balance-transfer",
    title: "Balance Transfer",
    category: "loan",
    iconName: "RefreshCw",
    shortDescription: "Transfer existing high-interest home or property loans to partner institutions with lower interest rates and savings.",
    indicativeRateRange: "8.50% - 9.25% p.a.",
    indicativeTenureRange: "Remaining tenure or up to 30 Years",
    maxAmountIndicative: "Full outstanding principal amount",
    useCases: [
      "Reducing high monthly EMI payments",
      "Switching from fixed-rate to competitive floating-rate benchmarks",
      "Accessing additional top-up funds at home loan interest rates",
    ],
    eligibilityCriteria: [
      "Minimum 12 timely EMI repayments with the existing lender",
      "Property construction completed and possession taken",
      "No default or bounce history in the preceding 12 months",
    ],
    requiredDocuments: [
      "Foreclosure letter & list of documents (LOD) from current lender",
      "Last 12 months loan repayment track statement",
      "Standard KYC and income proofs",
    ],
    faqs: [
      {
        question: "How much can I save with a home loan balance transfer?",
        answer: "Even a 0.50% to 1.00% interest rate reduction on a 20-year loan of ₹50 Lakhs can potentially save upwards of ₹4 to ₹8 Lakhs in total interest over time.",
      },
    ],
  },
  {
    id: "top-up",
    slug: "top-up",
    title: "Top-up Loan",
    category: "loan",
    iconName: "TrendingUp",
    shortDescription: "Additional low-cost borrowing facility extended over and above an existing home or mortgage loan.",
    indicativeRateRange: "8.90% - 10.50% p.a.",
    indicativeTenureRange: "Co-terminus with main loan (up to 20 Years)",
    maxAmountIndicative: "Up to ₹1 Crore",
    useCases: [
      "Home expansion, renovation, modular interiors",
      "Financing child's higher education without taking a separate education loan",
      "Consolidating miscellaneous high-interest debts",
    ],
    eligibilityCriteria: [
      "Active home loan running with consistent on-time payment track record",
      "Adequate property valuation headroom available",
    ],
    requiredDocuments: [
      "Latest home loan repayment statement",
      "Updated income documentation",
    ],
    faqs: [
      {
        question: "Why choose a Top-up loan over a personal loan?",
        answer: "Top-up loans feature substantially lower interest rates (similar to home loans) and longer repayment tenures than typical personal loans.",
      },
    ],
  },
  {
    id: "loan-against-property",
    slug: "loan-against-property",
    title: "Loan Against Property",
    category: "loan",
    iconName: "Shield",
    shortDescription: "Mortgage loan facility leveraging owned residential, commercial, or industrial property equity.",
    indicativeRateRange: "9.25% - 11.50% p.a.",
    indicativeTenureRange: "Up to 15 Years",
    maxAmountIndicative: "Up to 65% of certified property market value",
    useCases: [
      "Major business expansion and capacity scaling",
      "Debt consolidation of multiple high-cost credit lines",
      "Funding large capital commitments",
    ],
    eligibilityCriteria: [
      "Clear, marketable freehold property title",
      "Approved building plan from competent authority",
      "Strong operational cash flows or salary to service debt",
    ],
    requiredDocuments: [
      "Complete chain of property title deeds",
      "Approved building sanction map",
      "Business or personal audited income proofs for 3 years",
    ],
    faqs: [
      {
        question: "Can I take a Loan Against Property on a rented commercial asset?",
        answer: "Yes, many lenders offer Lease Rental Discounting (LRD) or Loan Against Property on rented commercial buildings.",
      },
    ],
  },
];

export const INSURANCE_SERVICES: ServiceItem[] = [
  {
    id: "life",
    slug: "life",
    title: "Life Insurance",
    category: "insurance",
    iconName: "HeartPulse",
    shortDescription: "Comprehensive financial security solutions for dependents and family milestones.",
    useCases: ["Family income replacement", "Long term wealth creation", "Estate planning"],
    eligibilityCriteria: ["Age 18 to 65 years", "Subject to medical underwriting"],
    requiredDocuments: ["Identity proof", "Income documents for high-sum assured covers", "Medical reports"],
    faqs: [
      {
        question: "How does VSR Associates help with insurance?",
        answer: "VSR Associates provides discovery assistance, policy comparison across IRDAI-registered insurers, and guidance on policy terms. Contracts are issued directly by licensed insurers.",
      },
    ],
  },
  {
    id: "health",
    slug: "health",
    title: "Health Insurance",
    category: "insurance",
    iconName: "Activity",
    shortDescription: "Individual and family floater health coverages protecting against hospitalization and critical illnesses.",
    useCases: ["Cashless hospitalization", "Critical illness cover", "Accident protection"],
    eligibilityCriteria: ["Individuals from 91 days to 65+ years", "Pre-existing diseases subject to waiting periods"],
    requiredDocuments: ["KYC documents", "Previous medical history declarations"],
    faqs: [
      {
        question: "What is cashless hospitalization?",
        answer: "Cashless hospitalization allows treatment at network hospitals where the insurer settles the covered bill directly, subject to policy deductibles and copays.",
      },
    ],
  },
  {
    id: "motor",
    slug: "motor",
    title: "Motor Insurance",
    category: "insurance",
    iconName: "ShieldCheck",
    shortDescription: "Third-party liability and comprehensive damage coverage for private and commercial vehicles.",
    useCases: ["Mandatory statutory compliance", "Own-damage accidental repair", "Roadside assistance add-ons"],
    eligibilityCriteria: ["Valid vehicle registration certificate (RC)"],
    requiredDocuments: ["RC copy", "Previous year insurance policy (if renewal)"],
    faqs: [
      {
        question: "What is No Claim Bonus (NCB)?",
        answer: "NCB is a discount rewarded for claim-free policy years, ranging from 20% to 50% on the own-damage premium.",
      },
    ],
  },
  {
    id: "term",
    slug: "term",
    title: "Term Insurance",
    category: "insurance",
    iconName: "Umbrella",
    shortDescription: "Pure risk life protection offering high sum assured coverage at economical annual premiums.",
    useCases: ["Family financial safety net", "Debt liability cover (covering home loan liabilities)"],
    eligibilityCriteria: ["Salaried or self-employed individuals with verifiable income proofs"],
    requiredDocuments: ["Income tax returns / Form 16", "Bank statements", "Identity and address proof"],
    faqs: [
      {
        question: "Why is term insurance essential?",
        answer: "Term insurance ensures that if an unfortunate event occurs, your family receives the full sum assured to pay off loans and sustain living costs.",
      },
    ],
  },
  {
    id: "child",
    slug: "child",
    title: "Child Plans",
    category: "insurance",
    iconName: "Baby",
    shortDescription: "Targeted savings and insurance frameworks ensuring financial milestones for your child's higher education.",
    useCases: ["Funding college tuition", "Guaranteed maturity payouts", "Waiver of premium upon parent's demise"],
    eligibilityCriteria: ["Parents aged 18 to 55 with child aged 0 to 17 years"],
    requiredDocuments: ["Parent KYC & income proof", "Child birth certificate"],
    faqs: [
      {
        question: "What does Waiver of Premium (WOP) mean in a child plan?",
        answer: "If the parent passes away during the policy term, future premiums are waived by the insurer, and the policy continues to pay out the target corpus at maturity.",
      },
    ],
  },
  {
    id: "retirement",
    slug: "retirement",
    title: "Retirement Plans",
    category: "insurance",
    iconName: "Sun",
    shortDescription: "Annuity and pension solutions providing guaranteed recurring monthly income in retirement years.",
    useCases: ["Retirement corpus accumulation", "Guaranteed lifetime annuity pension"],
    eligibilityCriteria: ["Entry age: 30 to 70 years"],
    requiredDocuments: ["Standard KYC", "Bank account verification for annuity payouts"],
    faqs: [
      {
        question: "Can I choose when my pension starts?",
        answer: "Yes, you can choose immediate annuity (pension starts right away) or deferred annuity (pension begins after a designated accumulation period).",
      },
    ],
  },
];

export const INVESTMENT_SERVICES: ServiceItem[] = [
  {
    id: "mutual-funds",
    slug: "mutual-funds",
    title: "Mutual Funds",
    category: "investment",
    iconName: "PieChart",
    shortDescription: "Professionally managed portfolios across equity, debt, and hybrid assets suited to your risk appetite.",
    useCases: ["Long-term wealth creation", "Tax savings under ELSS", "Diversified market exposure"],
    eligibilityCriteria: ["KYC-compliant resident Indians, NRIs, and institutional investors"],
    requiredDocuments: ["PAN Card", "Aadhaar Card", "Active bank account for auto-debit"],
    faqs: [
      {
        question: "Are mutual fund returns guaranteed?",
        answer: "Mutual fund investments are subject to market risks. Past performance does not guarantee future results. VSR Associates provides informational guidance only.",
      },
    ],
  },
  {
    id: "sip",
    slug: "sip",
    title: "Systematic Investment Plans (SIP)",
    category: "investment",
    iconName: "Coins",
    shortDescription: "Disciplined recurring monthly investments benefiting from rupee-cost averaging and compounding growth.",
    useCases: ["Goal-based savings (child education, retirement)", "Habitual investing starting from ₹500/month"],
    eligibilityCriteria: ["KYC-verified bank account holder"],
    requiredDocuments: ["PAN, Aadhaar, Cancelled cheque"],
    faqs: [
      {
        question: "Can I modify or pause my SIP at any time?",
        answer: "Yes, SIPs are flexible. You can increase, decrease, pause, or stop your SIP installments without penalty.",
      },
    ],
  },
  {
    id: "fixed-deposits",
    slug: "fixed-deposits",
    title: "Fixed Deposits (FDs)",
    category: "investment",
    iconName: "Vault",
    shortDescription: "Assured capital preservation solutions through partner banks and high-rated corporate deposit programs.",
    useCases: ["Capital security", "Predictable interest earnings", "Senior citizen income booster"],
    eligibilityCriteria: ["All resident individuals and HUFs"],
    requiredDocuments: ["PAN & Aadhaar", "Bank account verification"],
    faqs: [
      {
        question: "Are bank fixed deposits insured?",
        answer: "Under DICGC guidelines, bank deposits (including principal and interest) are insured up to ₹5 Lakhs per depositor per commercial bank.",
      },
    ],
  },
  {
    id: "wealth-guidance",
    slug: "wealth-guidance",
    title: "Wealth Guidance",
    category: "investment",
    iconName: "Compass",
    shortDescription: "Consultative financial health assessments to align cash flows, asset allocation, and milestone planning.",
    useCases: ["Asset allocation strategy", "Debt reduction roadmap", "Family estate structuring"],
    eligibilityCriteria: ["Individuals seeking structured financial roadmap"],
    requiredDocuments: ["Portfolio statements (for review)"],
    faqs: [
      {
        question: "Does VSR Associates manage client investment funds directly?",
        answer: "No. VSR Associates does not take custody of client funds or execute discretionary trades. All transactions occur directly through SEBI/AMFI registered entities.",
      },
    ],
  },
];
