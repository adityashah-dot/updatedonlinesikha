export const AMITY_SCHOLARSHIP_RULES = [
  {
    id: "early-bird",
    label: "Early Bird Grant",
    percent: 12,
    tag: "Early Bird",
    condition: "marks >= 0"
  },
  {
    id: "merit-75",
    label: "Academic Merit (75%+)",
    percent: 20,
    tag: "Merit",
    condition: "marks >= 75"
  },
  {
    id: "merit-85",
    label: "Top Merit (85%+)",
    percent: 25,
    tag: "Top Merit",
    condition: "marks >= 85"
  },
  {
    id: "defence",
    label: "Defence Personnel",
    percent: 50,
    tag: "Defence",
    condition: ""
  }
];
export const AMITY_SCHOLARSHIP_PILLARS = [
  {
    title: "Early Bird 20% Grant",
    body: "[Pillar body \u2014 early bird eligibility and waiver description]",
    icon: "clock",
    tag: "Ongoing Batch",
    tone: "amber",
    footnote: "Applied Automatically"
  },
  {
    title: "Academic Excellence",
    body: "[Pillar body \u2014 merit eligibility and waiver description]",
    icon: "award",
    tag: "Academic Merit",
    tone: "blue",
    footnote: "Evaluated on Marksheet"
  },
  {
    title: "Jai Jawan Defense Scheme",
    body: "[Pillar body \u2014 defence personnel eligibility and waiver description]",
    icon: "shield",
    tag: "Defense Personnel",
    tone: "amber",
    footnote: "Defense Service Card Verified"
  },
  {
    title: "Single Girl Child Scheme",
    body: "[Pillar body \u2014 single girl child eligibility and waiver description]",
    icon: "heart",
    tag: "Women in Education",
    tone: "green",
    footnote: "Self Certification Affidavit"
  },
  {
    title: "Amity Alumni Concession",
    body: "[Pillar body \u2014 alumni eligibility and waiver description]",
    icon: "user",
    tag: "Alumni Benefit",
    tone: "blue",
    footnote: "Registration Number Match"
  },
  {
    title: "Corporate Employee Rebate",
    body: "[Pillar body \u2014 corporate employee eligibility and waiver description]",
    icon: "star",
    tag: "Working Executives",
    tone: "blue",
    footnote: "Company ID / HR Letter"
  }
];
