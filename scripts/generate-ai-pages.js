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
  'Senior Travel and Leisure',
  'Elder Law and Legal Rights',
  'AARP Benefits',
  'Memory Care and Healthcare',
  'Senior Housing and Downsizing',
  'Part-time Jobs for Retirees',
  'Life Insurance for Seniors'
];

const getNextTopic = () => {
  const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir) : [];
  
  let targetCategory = categories[0];
  let minCount = Infinity;

  // Find the category with the fewest articles so content stays balanced
  for (const category of categories) {
    const slugPrefix = category.toLowerCase().replace(/ /g, '-');
    const count = files.filter(f => f.startsWith(slugPrefix) && f.endsWith('.mdx')).length;
    
    if (count < minCount) {
      minCount = count;
      targetCategory = category;
    }
  }

  const nextNumber = minCount + 1;
  return {
    title: `${targetCategory} Guide ${nextNumber}: Complete Overview 2026`,
    slug: `${targetCategory.toLowerCase().replace(/ /g, '-')}-guide-${nextNumber}`,
    category: targetCategory,
    description: `Learn everything you need to know about ${targetCategory} in our comprehensive 2026 guide for seniors.`,
  };
};

async function generateArticleWithAI(topic) {
  const prompt = `
You are a senior content strategist with three blended areas of expertise:
1) A CERTIFIED FINANCIAL PLANNER™ (CFP) with 15+ years advising pre-retirees and retirees,
2) A certified eldercare/aging-life-care specialist, and
3) An SEO content lead who builds pages that satisfy Google's E-E-A-T (Experience, Expertise, 
   Authoritativeness, Trustworthiness) and "Helpful Content" standards for YMYL (Your Money or 
   Your Life) topics.

Write a 1500-word, highly authoritative, empathetic article about "${topic.title}" (category: 
"${topic.category}") for Americans aged 40-75 who are researching this topic with real financial 
or caregiving decisions on the line.

=== SEARCH INTENT & SEMANTIC KEYWORD STRATEGY (do this BEFORE writing) ===
- Infer the primary search intent behind "${topic.title}" (informational, comparison, or 
  decision/transactional) and write to satisfy that intent first.
- Identify the primary keyword and 8-12 semantically related terms, synonyms, and natural 
  variations a real user or Google's query fan-out would associate with this topic (related 
  questions, adjacent concerns, common terminology).
- Weave these naturally into headings and body copy as a real expert would talk about the 
  topic — DO NOT repeat the exact primary keyword phrase mechanically. Google's systems match 
  on meaning, not literal repetition; unnatural repetition reads as manipulation and can hurt 
  rankings, not help them.
- Prioritize "information gain": include at least one angle, data point, or framing that isn't 
  just a repeat of what every other generic article on this topic already says.

=== STRUCTURE & ON-PAGE SEO ===
- Suggest an SEO title tag (under 60 characters, includes primary keyword near the front).
- URL-SAFE TITLE RULE: The title becomes the URL slug in the format {category}-guide-{number}. 
  The {category} portion must contain ONLY letters, numbers, and spaces (spaces will be 
  converted to hyphens automatically) — NEVER use special characters such as @ # $ % ^ & * 
  ( ) + = / \\ | < > : ; " ' ~ \` or any symbol, even if it reads naturally in English (e.g. write 
  "and" instead of "&", "percent" instead of "%", spell out numbers like "401k" without a 
  special symbol, avoid em dashes — use a hyphen or rephrase instead). If in doubt, leave it out.
- Suggest a meta description (under 155 characters, includes primary keyword, ends with a 
  reason to click).
- Output ONLY valid Markdown content. No frontmatter, no wrapping code blocks like \\\`\\\`\\\`markdown 
  — start directly with the H1 or Introduction.
- Open with a 2-3 sentence direct answer to the core question before any throat-clearing — 
  AI Overviews and featured snippets favor pages that answer the query immediately, then expand.
- ## Introduction — engaging, states what the reader will walk away knowing.
- ## Key Takeaways — 4-6 scannable bullet points summarizing the article's core value.
- Body organized with ## (H2) and ### (H3) headings that mirror how real users phrase 
  follow-up questions (these double as candidates for "People Also Ask" matching).
- Use short paragraphs (2-4 sentences), bullet lists, and at least one comparison or 
  step-by-step list where relevant — these formats are favored for AI-generated summaries.
- ## Frequently Asked Questions — at least 5 Q&As, phrased the way someone would actually type 
  or speak them into a search bar. Each answer: 2-4 concise sentences, self-contained (answers 
  the question even without reading the rest of the article).

=== E-E-A-T & TRUST SIGNALS (critical for financial/eldercare YMYL content) ===
- Write with the voice of someone who has direct experience: reference realistic scenarios, 
  common mistakes seen in practice, and practical nuance — not just textbook definitions.
- Be precise and conservative with any numbers, thresholds, or rules (tax brackets, Medicare/
  Medicaid rules, Social Security ages, etc.). If a specific figure could be time-sensitive or 
  you're not certain it's current, say so in general terms rather than stating it as fact.
- Include a brief, natural disclaimer that this is educational information, not individualized 
  financial or legal advice, and that readers should confirm specifics with a licensed 
  professional or official source — this is standard practice for trustworthy financial content 
  and also protects against giving prescriptive advice that could be wrong for someone's 
  specific situation.
- Do not fabricate statistics, studies, or named sources. If you reference a general trend, 
  frame it as general knowledge rather than inventing a citation.

=== TONE & STYLE ===
- Professional, warm, plain-spoken — explain financial/legal/medical jargon the first time it 
  appears, in-line, in one clause.
- Avoid generic AI-isms: "In conclusion," "In today's fast-paced world," "Navigating the 
  complexities of," "It's important to note that," "Unlock," "Delve into," "In the realm of," 
  "When it comes to."
- Vary sentence length and structure — avoid the repetitive rhythm of "X is important. Y is 
  also important. Z matters too."
- End with a closing section (not literally titled "Conclusion") that gives the reader a clear 
  next step or decision framework, not just a recap.

Target length: ~1500 words, excluding the title tag/meta description suggestions.
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