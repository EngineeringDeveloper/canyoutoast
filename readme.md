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

## Strava

[Guidelines](https://developers.strava.com/guidelines/)

## Toasting


Average 30s power over 400W	
Data set with Watts
  Take Moving average 30s
  find effrots where average stays above 400W
  Calculate Energy consumption over those efforts
  take max energy

Based on energy
| Time Mins | Time S | Power | Enery  | Grade |
|-----------|--------|-------|--------|-------|
| 1.8       | 108    | 400   | 43200  | 1     |
| 2.7       | 162    | 400   | 64800  | 2     |
| 3.6       | 216    | 400   | 86400  | 3     |
| 4.5       | 270    | 400   | 108000 | 5     |
| 5.4       | 324    | 400   | 129600 | 6     |
| 6.3       | 378    | 400   | 151200 | 7     |
| 7.2       | 432    | 400   | 172800 | 9     |
| 8.1       | 486    | 400   | 194400 | 10    |

720-850 Watt Toaster
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
