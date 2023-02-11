# Can you Toast?

_Web App which links with Strava to estimate your performance based on how well you can toast bread_

... Thats it

## Ideas

- Strava integration    
  - Strava API does not document the result of the Power Curve
    - Will take last 6 weeks data and process on the front end
    - While the processing is happening the toaster will prime?
- Toast pops out of a toaster
  - How to decide level of Toasting?
- SSR for sharing

## Toasting

720-850 Watt Toaster

Min Power 400W?

0 -       Grade 0
1min      Grade 1
1min 30s  Grade 2
2min      Grade 3
2min 30   Grade 5
3min      Grade 6
3min 30   Grade 7
4min      Grade 9
4min 30   Grade 10

## Tooling

SvelteKit

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# To create a production version of your app:
npm run build

# You can preview the production build with 
npm run preview
```
