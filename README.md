This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a journal application built using Next.js, designed to enhance emotional self-awareness and reflection through journaling, AI-driven insights, and mood tracking

## Project Setup
```bash
git clone https://github.com/Maythunguyen/may-day.git
cd may-day

#install all packages 
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Project Overview
## Frontend

- Built with Next.js, React, and Tailwind CSS for responsive styling.

- Custom components using Aceternity UI, Shadcn UI components, and Framer Motion for animations.

- This project uses Satoshi Font for modern style 

- User authentication implemented via Clerk.

## Backend

- Python backend with FastAPI framework, deployed on Render.

- Uses OpenAI GPT-4 API to analyze journal entries and provide personalized emotional insights.

## Features
*** Journal Entry Management

- Users can create, update, and delete journal entries.

- Entries include title, content, tags (Daily Journal, Gratitude Log, Dating Reflections, etc.), mood selection, and background images.

*** AI-driven Insights

- Individual entry analysis provided by GPT-4 for emotional context.

- Bulk analysis identifies recurring emotional patterns related to people mentioned.

- Mood and Tagging System

- Users categorize entries using moods (Happy, Sad, Angry, etc.) and custom tags.

- Filter journal entries by mood or tag.


User-specific journal data persisted in browser local storage.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tools and Technologies
Next.js

React

Tailwind CSS

Clerk Authentication

Python

FastAPI

OpenAI GPT-4

Render (Backend hosting)

Vercel (Frontend hosting)

## Future Plans
- Enhanced AI insights feature for deeper emotional analysis. This feature aggregates entries related to the same person or event, allowing the AI to analyse and provide recommendations or alerts regarding their positive or negative impacts.
- Add image upload feature to caption the beautiful moments in daily life. 
- Improve the responsive on mobile device
- Cloud database integration for improved data storage and retrieval.
