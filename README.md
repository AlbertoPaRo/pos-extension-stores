# Building the Project

This project is a Chrome Extension workspace managed with `pnpm` and `turbo`. Follow the steps below to build the project.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: Version specified in `.nvmrc` (use `nvm` to manage Node versions).
- **pnpm**: Install globally using `npm install -g pnpm`.

## Steps to Build

1. **Install Dependencies**

   Run the following command to install all dependencies:

   ```bash
   pnpm install
   ```

2. **Set Environment Variables**

   Copy the `.example.env` file to `.env` and configure the necessary environment variables:

   ```bash
   cp .example.env .env
   ```

3. **Clean the Workspace**

   Ensure the workspace is clean before building:

   ```bash
   pnpm clean
   ```

4. **Build the Project**

   To build the project, run:

   ```bash
   pnpm build
   ```

   This will clean the workspace, set global environment variables, and build all packages and pages.

5. **Generate a Zip File**

   After building, you can generate a zip file for deployment:

   ```bash
   pnpm zip
   ```

## Additional Commands

- **Run in Development Mode**:

  ```bash
  pnpm dev
  ```

- **Run End-to-End Tests**:

  ```bash
  pnpm e2e
  ```

- **Lint and Fix Code**:

  ```bash
  pnpm lint:fix
  ```

## Notes

- The project uses `turbo` for task orchestration. You can customize the build process in the `turbo.json` file.
- Ensure all environment variables are correctly set in the `.env` file before building.
- Refer to the `package.json` scripts section for additional commands.