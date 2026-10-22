import mysql from 'mysql2/promise';
import 'dotenv/config';

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  const now = new Date();

  // Clear existing items in features, how_it_works, faq if any
  await conn.query('DELETE FROM landing_items WHERE section_key IN ("features", "how_it_works", "faq")');

  // Features (12 bento items matching live website)
  const features = [
    ['📋', 'Online Prescription Upload', 'Submit and manage prescriptions digitally for faster, error-free dispensing and retrieval.'],
    ['✍️', 'Consent Form Submission', 'Collect and store patient consent forms electronically with full compliance and audit trails.'],
    ['🧪', 'Multi Vendor Lab Tests', 'Seamlessly integrate with multiple lab vendors to order tests and receive results in one place.'],
    ['👥', 'Staff Management', 'Manage your entire team — schedules, roles, access permissions — from a single dashboard.'],
    ['📦', 'I/E Management', 'Track inventory and expenses efficiently to keep your clinic operations running smoothly.'],
    ['📍', 'Home Visit with Map Integration', 'Schedule and track home visits with live map integration for accurate, timely care delivery.'],
    ['🏥', 'Multi Clinic Management', 'Operate and oversee multiple clinic locations from one unified, centralized platform.'],
    ['📱', 'Role Management', 'Define granular access roles for doctors, staff, and admins to keep your data secure.'],
    ['🔐', 'White Label', 'Launch under your own brand identity with full white-label customization options available.'],
    ['📒', 'Ledger Feature', 'Maintain transparent financial records and patient accounts with a built-in ledger system.'],
    ['🔔', 'Follow-up Management', 'Never miss a follow-up — automate reminders and track patient follow-up schedules easily.'],
    ['📁', 'Patient Record', 'Store and manage complete patient information securely in one place. Access medical history, prescription, lab reports, and treatment notes anytime, anywhere.']
  ];

  for (let i = 0; i < features.length; i++) {
    const f = features[i];
    await conn.query(
      'INSERT INTO landing_items (`section_key`, `icon`, `title`, `description`, `order`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['features', f[0], f[1], f[2], i, now, now]
    );
  }
  console.log('✓ Successfully inserted 12 feature items');

  // How It Works (4 steps)
  const steps = [
    ['Create Your Account', 'Sign up in 2 minutes. No credit card needed for the free trial.'],
    ['Set Up Your Clinic', 'Add your doctors, departments, schedule, and branding easily.'],
    ['Add Patient Data', 'Easily add new patient details or import existing records in just a few clicks.'],
    ['Go Live & Grow', 'Start seeing patients digitally and watch your efficiency soar.']
  ];

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    await conn.query(
      'INSERT INTO landing_items (`section_key`, `title`, `description`, `badge`, `order`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['how_it_works', s[0], s[1], String(i + 1), i, now, now]
    );
  }
  console.log('✓ Successfully inserted 4 steps');

  // FAQs (5 items)
  const faqs = [
    ['What is this healthcare management system?', 'This platform is a digital healthcare management system designed to streamline patient records, doctor information, appointments, and medical history in one secure place.', 'open'],
    ['How can I register as a patient?', 'You can register by filling out the patient registration form with your basic details such as name, contact number, email, and medical information.', ''],
    ['Can I book appointments online?', 'Yes, patients can easily book appointments with doctors through the platform by selecting their preferred date and time.', ''],
    ['Can I get digital prescriptions?', 'Yes, doctors can generate and share digital prescriptions which can be viewed and downloaded by patients anytime.', ''],
    ['How do doctors manage their profiles?', 'Doctors can update their profile details, specialization, availability, and consultation timings through their dashboard', '']
  ];

  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    await conn.query(
      'INSERT INTO landing_items (`section_key`, `title`, `description`, `badge`, `order`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['faq', f[0], f[1], f[2], i, now, now]
    );
  }
  console.log('✓ Successfully inserted 5 FAQs');

  const [count] = await conn.query('SELECT COUNT(*) as total FROM landing_items');
  console.log('Total landing items in DB now:', count[0].total);

  await conn.end();
}

main().catch(console.error);
