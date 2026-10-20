import type { ScholarshipPillar, ScholarshipRule } from '../../components/university/UniversityPageScholarships';

// PLACEHOLDER DATA — replace with real CU Online scholarship rules.
// See qa/PLACEHOLDER_CONTENT.md rows CU-S-01 .. CU-S-04.
export const CU_SCHOLARSHIP_RULES: ScholarshipRule[] = [
  {
    id: 'early-bird',
    label: 'Early Bird Grant',
    percent: 25,
    tag: 'Early Bird',
    condition: 'marks >= 0',
  },
  {
    id: 'merit',
    label: 'Academic Merit',
    percent: 40,
    tag: 'Merit',
    condition: 'marks >= 75',
  },
  {
    id: 'defence',
    label: 'Defence Personnel',
    percent: 50,
    tag: 'Defence',
    condition: '',
  },
];

// PLACEHOLDER DATA — replace with real CU Online scholarship pillars.
// See qa/PLACEHOLDER_CONTENT.md rows CU-S-03 .. CU-S-04.
export const CU_SCHOLARSHIP_PILLARS: ScholarshipPillar[] = [
  {
    title: 'Early Bird Fee Grant',
    body: '[Pillar body — early bird eligibility and waiver description]',
    icon: 'clock',
    tag: 'Ongoing Batch',
    tone: 'amber',
    footnote: 'Applied Automatically',
  },
  {
    title: 'Academic Merit Scholarship',
    body: '[Pillar body — merit eligibility and waiver description]',
    icon: 'award',
    tag: 'Academic Merit',
    tone: 'blue',
    footnote: 'Evaluated on Marksheet',
  },
  {
    title: 'Defence Personnel Concession',
    body: '[Pillar body — defence personnel eligibility and waiver description]',
    icon: 'shield',
    tag: 'Defence',
    tone: 'amber',
    footnote: 'Service Card Verified',
  },
  {
    title: 'Women in Education Grant',
    body: '[Pillar body — women applicants eligibility and waiver description]',
    icon: 'heart',
    tag: 'Women in Education',
    tone: 'green',
    footnote: 'Self Certification Affidavit',
  },
  {
    title: 'University Alumni Concession',
    body: '[Pillar body — alumni eligibility and waiver description]',
    icon: 'user',
    tag: 'Alumni Benefit',
    tone: 'blue',
    footnote: 'Registration Number Match',
  },
  {
    title: 'Corporate Employee Rebate',
    body: '[Pillar body — corporate employee eligibility and waiver description]',
    icon: 'star',
    tag: 'Working Executives',
    tone: 'blue',
    footnote: 'Company ID / HR Letter',
  },
];
