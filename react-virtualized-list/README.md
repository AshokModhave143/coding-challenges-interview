## React Virtualized List

The goal of this exercise, is to render every word in the English language in a single, scrollable, performant list.

In our `App.tsx` file, there's a hook already written for `useDictionary()`. This hook will fetch the entire dictionary and return it in a nice array.

This dictionary has nearly 400K words in it, far too many elements to write to the DOM at once. In fact, it will almost certainly crash your web browser. For this reason, there's a component called `<SafelyRenderChildren/>`. This component will put an artificial limit on the amount of children you can render at once, to ensure that there's no chance of crashing the interview :)

### What is virtualization?

Virtualization in client-side development, deals with the concept of only rendering elements that are critical for providing a seamless user experience, and culling every element that is off the screen.

So instead of rendering 500K list items, we might start with only rendering 500 items, and then progressively adding/removing list items as the user scrolls.

The goal is to deliver a user experience that feels as seamless as possible.

### Goals

1. When loading the page, we should see a list that is filled with words, the scrollbar should be as long as the entirety of the dictionary, appearing as if every word is already present in the list.
2. Scrolling using the mousewheel should feel completely seamless. The elements should stay positioned correctly and not jump around as elements load/unload.
3. We should be able to drag the scrollbar to any position in the list and have the correct items be visible.

### Stretch Goals

1. Add a search box to the list.

### Parameters

- Each list item has a known height (30px)
- `<SafelyRenderChildren/>` limits the maximum list items to 2,500
- The amount of items you render at one time is completely up to you, and should be tuned for a balance of performance and usibility (we want no visual evidence of loading when mousewheel scrolling, and minimal evidence of loading when scrolling large distances at one time)
- There is an optional included `useScrollPosition` hook that you can use to quickly get the current scroll position.

---

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

# Contributing

Contributions are welcome! Please open an issue or submit a pull request.
