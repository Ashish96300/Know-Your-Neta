# Know Your Neta

**Know Your Neta** is a citizen-focused political accountability platform built to make information about elected representatives easier to explore and understand.

The project brings politician profiles, constituency information, election promises, and citizen feedback together in one place. The goal is simple: make it easier for people to look beyond names and party affiliations and learn about a representative's public record.

> **Project status:** In development. Features and data coverage may evolve as the project grows.

## What it offers

- **Explore politicians** — browse politician profiles and view their party and electoral-area associations.
- **Search and discover** — find representatives through the politician discovery interface.
- **Detailed profiles** — view available background information such as education, profession, political career, achievements, tenure status, declared assets and liabilities, and criminal-case count.
- **Constituency context** — represent electoral areas in a hierarchy that supports states, Lok Sabha constituencies, Vidhan Sabha constituencies, and municipal wards.
- **Promise tracking** — record public promises with descriptions, dates, source links, and progress statuses: Promised, In Progress, Completed, or Not Completed.
- **Citizen reviews** — authenticated users can submit feedback and rate representatives across overall performance, development, accessibility, transparency, and infrastructure.
- **Accountability overview** — politician profiles include review summaries and dedicated sections for constituency information, promises, and reviews.
- **Administration tools** — admin-only operations support managing politician, party, electoral-area, and promise records, along with moderation of reviews.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling & UI | Tailwind CSS 4, shadcn/ui, Base UI, Lucide |
| Backend | Next.js App Router, Route Handlers |
| Database | MongoDB, Mongoose |
| Authentication | JWT sessions, HTTP-only cookies, bcrypt |
| Validation | Zod |
| Media | Cloudinary |
| Data Visualization | Recharts |
| State & Utilities | Zustand, Axios |

## Application Structure

```text
.
├── app/
│   ├── (auth)/             # Login and registration pages
│   ├── (public)/           # Public-facing pages
│   │   ├── dashboard/
│   │   └── politician/     # Politician directory and profiles
│   ├── admin/              # Admin interface
│   ├── api/                # API route handlers
│   └── components/         # Application components
├── components/ui/          # Reusable UI components
├── lib/
│   ├── config/              # External service configuration
│   ├── controllers/         # Business logic
│   ├── data/                # Data access helpers
│   ├── db/                  # Database connection
│   ├── middleware/          # Authentication and authorization
│   ├── models/              # Mongoose models
│   ├── services/            # Domain services
│   ├── types/
│   ├── utils/
│   └── validations/         # Zod schemas
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account (for image-upload functionality)

### 1. Clone the repository

```bash
git clone https://github.com/Ashish96300/Know-Your-Neta.git
cd Know-Your-Neta
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Required
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret

# Required only for Cloudinary-backed media features
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use a strong, private value for `JWT_SECRET`. Never commit `.env.local` or expose credentials in source control.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Production build

```bash
npm run build
npm run start
```

Run the linter:

```bash
npm run lint
```

## Core Data Models

The application uses MongoDB documents modelled with Mongoose:

- **Politician** — profile, party, electoral area, background, public disclosures, tenure, achievements, and review aggregates.
- **Party** — party name, abbreviation, logo, and description.
- **ElectoralArea** — hierarchical electoral areas, including state, Lok Sabha, Vidhan Sabha, and municipal ward levels.
- **ElectionPromise** — promise details, publication date, source URL, status, and completion date.
- **Review** — citizen ratings and comments associated with a politician and electoral area.
- **User** — registered accounts and user roles.

## API Overview

The project exposes REST-style endpoints through Next.js Route Handlers.

| Resource | Route | Purpose |
|---|---|---|
| Politicians | `/api/politician` | Retrieve and manage politician records |
| Parties | `/api/party` | Retrieve and manage political parties |
| Electoral Areas | `/api/electoralArea` | Retrieve and manage constituency hierarchy |
| Promises | `/api/promise` | Create and manage election promises |
| Reviews | `/api/review` | Submit and update citizen reviews |
| Users | `/api/user` | Registration, login, and logout |
| Media Signing | `/api/cloudinary/sign` | Generate authenticated Cloudinary upload signatures |

Protected operations use session authentication. Administrative operations additionally require the admin role. Refer to the route handlers and controllers for request schemas and supported methods.

## Important Notes

- Politician information, promise records, and other civic data should be backed by reliable sources. Promise records include a source URL so claims can be checked.
- Citizen ratings represent user-submitted feedback; they should be read as community sentiment, not as an official or independently verified performance score.
- The completeness and accuracy of records depend on the data entered into the application.
- Do not use this project as a substitute for official election records or verified government disclosures.

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your changes.
4. Open a pull request with a clear description of what changed and why.

Please keep contributions factual, respectful, and non-partisan—especially when working with political or public-record information.

## License

No license is currently specified in this repository. Until a license is added, the default copyright rules apply; please contact the repository owner before reusing or redistributing the code.

---

<p align="center">
  Built to encourage informed citizens and accountable public representation.
</p>
