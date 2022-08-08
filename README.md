# qwik-library-styling-repro

This repo consists of a component library containing a `Counter` component which has a red background via module.css. Tracking in issue here: https://github.com/BuilderIO/qwik/issues/948

If you yarn start inside of `test-library`, you will see the red `Counter`.

If you build that and then yarn start inside of `test-app`, you will see the `Counter` rendered without a red background. Expected red. But the styles don't load downstream.

## To repro


1. Install deps and link

```
yarn
```

2. Build the component library (scaffolded via `npm init qwik@latest` using the component library template)

```
cd packages/test-library
yarn build
```

3. Start the test app which renders

```
cd ../test-app
yarn start
```

Expected:
Counter with red background

Resulted:
The test-library produces a css file index.css which is never referenced by the app. This has many ramifications:

1. To get styles rendering you must know details about the guts of the library (import the css manually.)
2. The styles are concatenated into one blob, which means we'd never tree shake the library styles (you'll get all rules.)

Instead, the styles should probably be javascriptified as intermediate output, but then extracted at the app layer. This means that if you render Counter but not another component, you never get the other component's styles. And, extracting at the app layer means that we can respect the async boundaries - don't load styling you don't need; just the styling within the modules when they are loaded.
