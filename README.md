# Next Fetch Architecture

A Next.js App Router reference implementation demonstrating a robust, type-safe architecture for fetching and mutating data from external REST APIs.

It establishes structured patterns for API integration using server-side fetching, runtime validation with Zod, and a functional error handling strategy using a Result type, ensuring reliable data flow and separation of concerns.

## Before You Begin

This project uses [MockAPI](https://mockapi.io/) for simulating backend data. To get started, you'll need to create an account on MockAPI, create an endpoint, and obtain your API secret to put in the `.env` file.

### Setting up MockAPI

- Create a new project on MockAPI.
- Create a new resource called `users`
- Use the following fields for the `users` resource:

  > Note: During setup, you can choose Fake.json as the data source to pre-populate your resource with sample data.

  ```ts
    {
      "id": "Object ID", // auto-generated
      "createdAt": "date" // auto-generated
      "name": "string",
      "email": "string",
      "age": "number"
    }
  ```

- Generate some sample data (e.g., 50 users)
- Obtain your API secret from the project settings or api URL
  > See [tests/mock-api.http](./tests/mock-api.http) for reference on how to interact with the MockAPI endpoints

## Getting Started

- Clone the repository:

  ```bash
    git clone https://github.com/emanuelefavero/next-fetch-architecture.git
  ```

- Navigate to the project directory:

  ```bash
    cd next-fetch-architecture
  ```

- Install dependencies:

  ```bash
    npm install
  ```

- Add your environment variables in a `.env` file based on the `.env.example` provided.
- Run the development server:

  ```bash
    npm run dev
  ```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
