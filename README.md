# iu-quiz-app

This is the source code of the IU Quiz App for the course "ISEF01 - Projekt Softwareentwicklung" at the "IU - Internationale Hochschule". It is a web application that allows users to create and take collaborative quizzes. The app is built using Nuxt.js and Supabase as the primary technologies.

## Local Development

The following instructions help set up the project on a local machine for development. This allows for properly testing schema migration scripts and the application itself before deploying it to the hosted environment.

### Setup

Requirements:

-   Git
-   Node.js with npm
-   Docker

Clone this Repository:

```bash
git clone https://github.com/NicklasRatay/iu-quiz-app.git
```

Installing Dependencies:

```bash
npm install
```

### Backend

Starting Supabase PostgreSQL Container:

```bash
npx supabase start
```

Resetting the Database:

```bash
npx supabase db reset
```

Stopping Supabase PostgreSQL Container:

```bash
npx supabase stop
```

### Frontend

Starting the App in Development Mode:

```bash
npm run dev
```
