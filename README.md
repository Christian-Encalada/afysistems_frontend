# Planifia

## Description

Frontend of PLANIFIA systems

## Prerequisites

Before running the application, make sure you have the following installed in your development environment:

- Node.js
- npm or yarn (Node.js package managers)

## Installation

### Without docker

1. Prerequisites

   - node 20: [Installation Instructions](https://nodejs.org/en/download/package-manager/current)

2. Install project dependencies

```
npm install
# or if you prefer using yarn
yarn
```

3. Running the Application

To run the application locally, follow these steps:

Start the application in development mode:

    ```
    npm run dev
    # or
    yarn dev
    ```

Open your browser and go to http://localhost:3000 to see the application in action.

### With docker

1. Prerequisites

- Docker: [Installation Instructions](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Instructions](https://docs.docker.com/compose/install/)

2. Run app

```bash
# build
$ docker-compose up --build

# start
$ docker-compose up

# stop
$ docker-compose down
```

## Project Structure

- components/: Contains React components of the application.
- page.tsx: Main pages of Next.js.
- styles/: CSS styles for the application.

## Technologies Used

- React.js
- Next.js
- TypeScript

## Dark Mode

This project uses Tailwind CSS for styling and next-themes to facilitate dark mode implementation. Follow these steps to apply dark mode styles to your components:

### Basic usage

1. Ensure that the project is correctly configured with Tailwind CSS and next-themes.
2. To apply dark mode-specific styles, use the `dark:` prefix before the Tailwind classes you want to apply. For example:

```jsx
<div className='bg-white text-black dark:bg-gray-800 dark:text-white'>
  Component content
</div>
```

In this example, the background will be white and the text black in light mode, but in dark mode, the background will change to dark gray and the text to white.

### Common Examples

- Changing text colors:

```jsx
<p className='text-gray-800 dark:text-gray-200'>Example text</p>
```

- Modifying backgrounds:

```jsx
<button className='border-gray-300 dark:border-gray-700'>Button</button>
```

- Adjusting borders:

```jsx
<button className='border-gray-300 dark:border-gray-700'>Button</button>
```

## Important

Use Tailwind's custom CSS variables to maintain consistency in theme colors:

```jsx
<div className='bg-primary dark:bg-primary-dark'>
  Content with custom colors
</div>
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
