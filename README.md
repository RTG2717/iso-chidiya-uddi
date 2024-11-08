# `iso-chidiya-uddi`

A multiplayer [Chidiya Uddi](https://dsource.in/resource/indian-games/indoor-games/chidiya-udd) game built by [IndiaSocial (ISO)](https://reddit.com/r/IndiaSocial) community Discord members.

# Contribution Rules

1. Simple: fork the repo, make meaningful and valuable code updates, create a pr.

# Usage Guide

## Prerequisites

1. [Node.js](https://nodejs.org/en)
2. A text editor [[Visual Studio Code](https://code.visualstudio.com/download) recommended]

### Prettier

##### (how to use)

1. Download prettier extension in VS Code.
1. Go to Settings (Ctrl+,) and set Format on save to `yes`.
1. Save files which need formatting. These files will be formatted according to the config in `.prettierrc` file.

> Note: Always format before raising PR.

## Frontend

All frontend part is housed in `./frontend/`, ensure that you have all the pre-requisites installed on your system.

### Installation

1. Install packages:

    ```
    npm ci
    ```

1. Install the tailwind configuration: follow the steps in [this guide](https://tailwindcss.com/docs/guides/vite)

### Running the Code

1. Navigate to the backend folder. `[BASE_DIR]/frontend/`
2. Start Development Server:

    ```
    npm run dev
    ```
3. Start Tailwind parallely:

    ```
    npm run watch
    ```

## Backend

Install all prerequisites in system.

To run the current version of backend:

1. Navigate to the backend folder. `[BASE_DIR]/backend/`
2. Run the command
    > npm run dev
