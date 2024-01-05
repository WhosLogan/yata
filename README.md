# Yata

Yet another time tracker app. With a goal of having no bloat, paid subscriptions, or annoying surprises.

## Developing

Once you've installed dependencies with `npm install` (or your favorite package manager), set the below environment variables and start a development server:

```bash
npm run dev
```

## Building

To create a production build of Yata:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Environment Variables
The following variables need to be set in order to properly run Yata:
```
AUTH_SECRET: A 32 byte base-64 encoded secret (used for authentication and encryption)
DATABASE_URL: A url to your database instance
DATABASE_AUTH_TOKEN: Optional, an authentication token to your db
```

## Deployment

Deployment is automatically handled for the production website (https://yata.world).
However, if you wish to host your own version of Yata, set the proper environment variables
and run a production build.