import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

const categories = [
  'Social Security',
  'Medicare',
  'Retirement Planning',
  'Veterans Benefits',
  'Tax Savings',
  'Health Insurance',
  'Senior Discounts',
  'State Retirement Guides',
  'Cost of Living',
  'Financial Planning'
];

const generateTopics = () => {
  const topics = [];
  categories.forEach((category) => {
    for (let i = 1; i <= 10; i++) {
      topics.push({
        title: `${category} Guide ${i}: Complete Overview 2026`,
        slug: `${category.toLowerCase().replace(/ /g, '-')}-guide-${i}`,
        category: category,
        description: `Learn everything you need to know about ${category} in our comprehensive 2026 guide for seniors.`,
      });
    }
  });
  return topics;
};

const placeholderContent = `
## Introduction

Navigating the complexities of retirement and senior benefits can be overwhelming. This guide is designed to provide you with clear, actionable information.

## Key Takeaways

- **Maximize Benefits:** Understand the optimal time to apply.
- **Avoid Penalties:** Learn the crucial deadlines.
- **Plan Ahead:** Use our calculators to estimate your future needs.

## In-Depth Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Eligibility Requirements

1. Must be at least 62 years old for early benefits.
2. Must have accumulated 40 credits (about 10 years of work).
3. Specific state regulations may apply.

### Common Mistakes to Avoid

Many seniors make critical errors when applying for benefits. The most common mistake is applying too early without understanding the permanent reduction in benefits. Another frequent error is missing the Initial Enrollment Period (IEP).

## Frequently Asked Questions

### When should I apply?
It is generally recommended to apply 3 months before you want your benefits to begin.

### Can I work while receiving benefits?
Yes, but depending on your age, your benefits may be temporarily reduced if you earn above a certain limit.
`;

async function main() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
  }

  const topics = generateTopics();
  console.log(`Generating ${topics.length} pages...`);

  topics.forEach((topic) => {
    const filePath = path.join(contentDir, `${topic.slug}.mdx`);
    const date = new Date().toISOString();
    
    const fileContent = `---
title: "${topic.title}"
description: "${topic.description}"
date: "${date}"
updatedAt: "${date}"
author: "Retirement Expert Team"
category: "${topic.category}"
---
${placeholderContent}`;

    fs.writeFileSync(filePath, fileContent);
  });

  console.log('Finished generating 100+ pages.');
}

main();
