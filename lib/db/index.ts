import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

// Ensure data directory exists
const DATA_DIR = path.resolve(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "vsr.db");

// Singleton connection
let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH);
    dbInstance.pragma("journal_mode = WAL");
    dbInstance.pragma("foreign_keys = ON");
    initializeSchema(dbInstance);
  }
  return dbInstance;
}

function initializeSchema(db: Database.Database) {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT,
      city TEXT NOT NULL,
      service_category TEXT NOT NULL,
      service_subtype TEXT NOT NULL,
      amount REAL,
      tenure_months INTEGER,
      details_json TEXT,
      contact_method TEXT DEFAULT 'phone',
      contact_time TEXT DEFAULT 'anytime',
      consent_given INTEGER NOT NULL,
      consent_version TEXT NOT NULL,
      consent_timestamp TEXT NOT NULL,
      marketing_consent INTEGER DEFAULT 0,
      status TEXT DEFAULT 'new',
      assigned_to TEXT,
      internal_notes TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS providers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      subcategories_json TEXT NOT NULL,
      logo_url TEXT,
      published INTEGER DEFAULT 1,
      verified INTEGER DEFAULT 1,
      indicative_rate_min REAL,
      indicative_rate_max REAL,
      tenure_min_months INTEGER,
      tenure_max_months INTEGER,
      processing_fee_text TEXT,
      eligibility_highlights TEXT,
      source_reference TEXT,
      last_verified_at TEXT,
      disclaimer TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS offers (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      service_category TEXT NOT NULL,
      provider_name TEXT,
      badge_text TEXT,
      valid_from TEXT NOT NULL,
      valid_until TEXT NOT NULL,
      terms TEXT NOT NULL,
      cta_text TEXT DEFAULT 'Enquire Now',
      cta_url TEXT DEFAULT '/apply',
      published INTEGER DEFAULT 1,
      priority INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('super_admin', 'admin', 'enquiry_manager')),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notification_logs (
      id TEXT PRIMARY KEY,
      enquiry_id INTEGER,
      channel TEXT NOT NULL,
      recipient TEXT NOT NULL,
      status TEXT NOT NULL,
      details TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_email TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
    CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at);
    CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON enquiries(reference_id);
    CREATE INDEX IF NOT EXISTS idx_providers_cat ON providers(category);
    CREATE INDEX IF NOT EXISTS idx_offers_valid ON offers(valid_until, published);
  `);

  // Seed default admin if none exists
  const adminCount = db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number };
  if (adminCount.count === 0) {
    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@vsrassociates.in";
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "AdminSecure@2026";
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(defaultPassword, salt);
    
    db.prepare(`
      INSERT INTO admin_users (id, email, password_hash, name, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      "admin-bootstrap-01",
      defaultEmail.toLowerCase(),
      hash,
      "Super Administrator",
      "super_admin",
      new Date().toISOString()
    );

    // Also seed initial enquiry manager
    const managerHash = bcrypt.hashSync("Manager@2026", salt);
    db.prepare(`
      INSERT INTO admin_users (id, email, password_hash, name, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      "admin-bootstrap-02",
      "manager@vsrassociates.in",
      managerHash,
      "Lead Operations Manager",
      "enquiry_manager",
      new Date().toISOString()
    );
  }

  // Seed default providers if none exist (indicative published rate information with explicit source disclosures)
  const providerCount = db.prepare("SELECT COUNT(*) as count FROM providers").get() as { count: number };
  if (providerCount.count === 0) {
    const seedProviders = [
      {
        id: "prov-sbi",
        name: "State Bank of India (Public Sector Partner)",
        category: "loan",
        subcategories_json: JSON.stringify(["home-loan", "plot-loan", "balance-transfer"]),
        logo_url: "/providers/sbi.svg",
        published: 1,
        verified: 1,
        indicative_rate_min: 8.50,
        indicative_rate_max: 9.65,
        tenure_min_months: 60,
        tenure_max_months: 360,
        processing_fee_text: "Up to 0.35% of loan amount + applicable GST (min ₹2,000, max ₹10,000)",
        eligibility_highlights: "Salaried & Self-employed, Minimum CIBIL 750+ for lowest bracket",
        source_reference: "Official Lender Schedule / Public Tariff Sheet",
        last_verified_at: "2026-04-01T00:00:00Z",
        disclaimer: "Indicative published rates as per lender schedule. Subject to final credit assessment.",
      },
      {
        id: "prov-hdfc",
        name: "HDFC Bank (Private Sector Partner)",
        category: "loan",
        subcategories_json: JSON.stringify(["home-loan", "personal-loan", "business-loan", "loan-against-property"]),
        logo_url: "/providers/hdfc.svg",
        published: 1,
        verified: 1,
        indicative_rate_min: 8.70,
        indicative_rate_max: 10.25,
        tenure_min_months: 36,
        tenure_max_months: 360,
        processing_fee_text: "0.50% of loan amount or ₹3,000 (whichever is higher)",
        eligibility_highlights: "Resident & NRI applicants with verifiable steady cash flow",
        source_reference: "Official Lender Schedule / Public Tariff Sheet",
        last_verified_at: "2026-04-01T00:00:00Z",
        disclaimer: "Rates vary depending on applicant risk profile and property valuation.",
      },
      {
        id: "prov-icici",
        name: "ICICI Bank (Private Sector Partner)",
        category: "loan",
        subcategories_json: JSON.stringify(["home-loan", "vehicle-loan", "top-up", "education-loan"]),
        logo_url: "/providers/icici.svg",
        published: 1,
        verified: 1,
        indicative_rate_min: 8.75,
        indicative_rate_max: 9.90,
        tenure_min_months: 24,
        tenure_max_months: 360,
        processing_fee_text: "0.50% - 1.00% depending on ticket size",
        eligibility_highlights: "Digital in-principle approval eligibility for pre-screened profiles",
        source_reference: "Official Lender Schedule / Public Tariff Sheet",
        last_verified_at: "2026-04-01T00:00:00Z",
        disclaimer: "Sanction and disbursement are at the sole discretion of ICICI Bank.",
      },
      {
        id: "prov-lic",
        name: "LIC of India (Life Insurance Partner)",
        category: "insurance",
        subcategories_json: JSON.stringify(["life", "term", "child", "retirement"]),
        logo_url: "/providers/lic.svg",
        published: 1,
        verified: 1,
        indicative_rate_min: null,
        indicative_rate_max: null,
        tenure_min_months: 60,
        tenure_max_months: 480,
        processing_fee_text: "Statutory premium rates as approved by IRDAI",
        eligibility_highlights: "Age 18 to 65 years, medical examination as per underwriting grid",
        source_reference: "Public IRDAI Product Filings",
        last_verified_at: "2026-04-01T00:00:00Z",
        disclaimer: "Insurance is the subject matter of solicitation. Policy terms apply.",
      },
      {
        id: "prov-star",
        name: "Star Health Insurance (Health Partner)",
        category: "insurance",
        subcategories_json: JSON.stringify(["health", "family-floater"]),
        logo_url: "/providers/star.svg",
        published: 1,
        verified: 1,
        indicative_rate_min: null,
        indicative_rate_max: null,
        tenure_min_months: 12,
        tenure_max_months: 36,
        processing_fee_text: "Standard policy premium with multi-year discount options",
        eligibility_highlights: "Individual and floater sum insured up to ₹1 Crore",
        source_reference: "Public IRDAI Prospectus",
        last_verified_at: "2026-04-01T00:00:00Z",
        disclaimer: "Coverage benefits, exclusions and waiting periods apply as per policy brochure.",
      }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO providers (
        id, name, category, subcategories_json, logo_url, published, verified,
        indicative_rate_min, indicative_rate_max, tenure_min_months, tenure_max_months,
        processing_fee_text, eligibility_highlights, source_reference, last_verified_at,
        disclaimer, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    for (const p of seedProviders) {
      insertStmt.run(
        p.id, p.name, p.category, p.subcategories_json, p.logo_url, p.published, p.verified,
        p.indicative_rate_min, p.indicative_rate_max, p.tenure_min_months, p.tenure_max_months,
        p.processing_fee_text, p.eligibility_highlights, p.source_reference, p.last_verified_at,
        p.disclaimer, now, now
      );
    }
  }

  // Seed default offers
  const offerCount = db.prepare("SELECT COUNT(*) as count FROM offers").get() as { count: number };
  if (offerCount.count === 0) {
    const seedOffers = [
      {
        id: "offer-festive-home",
        title: "Special Home Loan Processing Fee Concession",
        description: "Zero processing fee on balance transfer cases and 50% waiver on fresh home loan sanctions through partner financial institutions.",
        service_category: "loan",
        provider_name: "Selected Partner Banks",
        badge_text: "Limited Window",
        valid_from: "2026-01-01T00:00:00Z",
        valid_until: "2026-12-31T23:59:59Z",
        terms: "Subject to minimum loan ticket of ₹30 Lakhs and lender verification. VSR Associates assists in documentation and application routing.",
        cta_text: "Check Eligibility",
        cta_url: "/apply?service=loan&sub=home-loan",
        published: 1,
        priority: 10
      },
      {
        id: "offer-msme-business",
        title: "Fast-Track MSME Business Loan Assistance",
        description: "Priority document review and multi-lender file positioning for collateral-free business expansion facilities up to ₹75 Lakhs.",
        service_category: "loan",
        provider_name: "Partner NBFCs & Banks",
        badge_text: "MSME Assistance",
        valid_from: "2026-01-01T00:00:00Z",
        valid_until: "2026-12-31T23:59:59Z",
        terms: "Minimum 2 years audited ITR and active GST registration required. Interest rates set directly by lenders.",
        cta_text: "Apply for Business Assistance",
        cta_url: "/apply?service=loan&sub=business-loan",
        published: 1,
        priority: 8
      },
      {
        id: "offer-health-family",
        title: "Comprehensive Health Floater Consultation",
        description: "Complimentary policy comparison report covering waiting periods, room-rent capping, and network hospitals across top insurers.",
        service_category: "insurance",
        provider_name: "IRDAI Registered Insurers",
        badge_text: "Free Review",
        valid_from: "2026-01-01T00:00:00Z",
        valid_until: "2026-12-31T23:59:59Z",
        terms: "Informational consultation assistance only. Policy purchase contract is solely between customer and insurer.",
        cta_text: "Request Comparison",
        cta_url: "/apply?service=insurance&sub=health",
        published: 1,
        priority: 5
      }
    ];

    const insertOffer = db.prepare(`
      INSERT INTO offers (
        id, title, description, service_category, provider_name, badge_text,
        valid_from, valid_until, terms, cta_text, cta_url, published, priority,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    for (const o of seedOffers) {
      insertOffer.run(
        o.id, o.title, o.description, o.service_category, o.provider_name, o.badge_text,
        o.valid_from, o.valid_until, o.terms, o.cta_text, o.cta_url, o.published, o.priority,
        now, now
      );
    }
  }

  // Seed default site settings
  const settingsCount = db.prepare("SELECT COUNT(*) as count FROM site_settings").get() as { count: number };
  if (settingsCount.count === 0) {
    const defaultSettings = [
      ["site_title", "Vrinda Shree Radha Associates | Financial Services Marketplace"],
      ["contact_phone", "+91 98765 43210"],
      ["contact_email", "contact@vsrassociates.in"],
      ["contact_address", "VSR Tower, Ground & 2nd Floor, Financial District, Mathura Road, Uttar Pradesh - 281001, India"],
      ["operating_hours", "Monday to Saturday: 9:30 AM - 6:30 PM (IST)"],
      ["whatsapp_number", "+91 98765 43210"],
      ["regulatory_disclaimer", "Vrinda Shree Radha Associates (VSR Associates) is a financial services discovery, comparison and documentation assistance facilitator. VSR Associates is NOT a bank, NBFC, lender or direct insurer. Final loan sanctions, interest rates, insurance coverages and disbursements remain at the sole discretion of the respective regulated institutions."]
    ];

    const insertSetting = db.prepare("INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)");
    const now = new Date().toISOString();
    for (const [k, v] of defaultSettings) {
      insertSetting.run(k, v, now);
    }
  }
}
