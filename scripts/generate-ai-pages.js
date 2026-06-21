import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const contentDir = path.join(process.cwd(), 'content');

// Ensure you have OPENAI_API_KEY in your .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  'Financial Planning',
  'Estate Planning',
  'Assisted Living',
  '401k and IRA Strategies',
  'Senior Travel & Leisure',
  'Elder Law & Legal Rights',
  'AARP Benefits',
  'Memory Care & Healthcare',
  'Senior Housing & Downsizing',
  'Part-time Jobs for Retirees',
  'Life Insurance for Seniors'
];

const toSlug = (str) =>
  str.toLowerCase()
     .replace(/&/g, 'and')
     .replace(/[^a-z0-9\s-]/g, '')
     .trim()
     .replace(/\s+/g, '-');

const getNextTopic = () => {
  const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir) : [];
  
  let targetCategory = categories[0];
  let minCount = Infinity;

  // Find the category with the fewest articles so content stays balanced
  for (const category of categories) {
    const slugPrefix = toSlug(category);
    const count = files.filter(f => f.startsWith(slugPrefix) && f.endsWith('.mdx')).length;
    
    if (count < minCount) {
      minCount = count;
      targetCategory = category;
    }
  }

  const nextNumber = minCount + 1;
  return {
    title: `${targetCategory} Guide ${nextNumber}: Complete Overview 2026`,
    slug: `${toSlug(targetCategory)}-guide-${nextNumber}`,
    category: targetCategory,
    description: `Learn everything you need to know about ${targetCategory} in our comprehensive 2026 guide for seniors.`,
  };
};

async function generateArticleWithAI(topic) {
  const prompt = `
You are an expert financial planner, eldercare specialist, and SEO writer. 
Write a highly authoritative, empathetic, and comprehensive 1500-word article about "${topic.title}".
The target audience is Americans aged 40-75.

Requirements:
- Output ONLY valid Markdown content. Do not include frontmatter or wrapping code blocks like \`\`\`markdown. Just start with the text.
- Start with an engaging Introduction (## Introduction).
- Include a "Key Takeaways" section as bullet points.
- Structure the main content with H2 (##) and H3 (###) headings.
- Include a robust FAQ section at the end (## Frequently Asked Questions) with at least 3 common questions and answers.
- The tone should be professional, trustworthy, clear, and easy to read (avoid overly dense jargon).
- Do not use generic AI-isms like "In conclusion" or "In today's fast-paced world".
`;

  try {
    console.log(`Asking ChatGPT to write article: ${topic.title}...`);
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or gpt-4o-mini if you prefer to save costs
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    
    let text = response.choices[0].message.content;
    // Clean up wrapping markdown blocks if ChatGPT adds them
    if (text.startsWith('```markdown')) {
      text = text.replace(/^```markdown\n/, '').replace(/\n```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    return text;
  } catch (error) {
    console.error(`Error generating content for ${topic.title}:`, error);
    return null;
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY is not set in .env file.');
    process.exit(1);
  }

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
  }

  const topic = getNextTopic();
  console.log(`Starting AI generation for new topic: ${topic.title}`);
  
  const filePath = path.join(contentDir, `${topic.slug}.mdx`);

  // Call the AI
  const articleBody = await generateArticleWithAI(topic);
  
  if (articleBody) {
    const date = new Date().toISOString();
    const fileContent = `---
title: "${topic.title}"
description: "${topic.description}"
date: "${date}"
updatedAt: "${date}"
author: "Retirement Expert Team"
category: "${topic.category}"
---

${articleBody}
`;
    fs.writeFileSync(filePath, fileContent);
    console.log(`[SUCCESS] Wrote ${topic.slug}.mdx`);
    console.log('Successfully generated one article. Exiting to allow CI/CD to commit.');
  } else {
    console.log('AI generation failed. Will retry next run.');
  }

  console.log('Finished AI generation process!');
}

main();
