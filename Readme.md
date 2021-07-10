Welcome to the Turati Keep Up Repository

What is Keep-Up?

Keepup is a plartform that servers to help people in mainting their suburb conditions. KeepUp helps the suburb by providing
a plartform where citizens can donate their money and time to clean the streets, pull out weeds, pick-up litter,
resore pavement, replace stolen strom water drain covers and many more ways that can keep the suburb in a good condition.
When you donate to help your suburb become better and clean, keepup makes sure your donations are put to good use
and the suburb is clean.

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/turati-software/Keep-Up.git
```

2. Install the dependecies:

In the Frontend Folder is the Frontend created in Next.js.

Make sure you are in the frontend folder

```bash
npm install
# or
yarn install
```

3. In order to run it:

```bash
   npm run dev
   # or
   yarn dev
```

Open [LocalHost](http://localhost:3000) with your browser to view the project.

In the Backend Folder is the handler.js and serverless.yml which deploys a stack to aws stack formation to enable the peach payment api.

- To run the servlerless:

  1. Ensure you have serverless installed globally and you are logged in to the correct aws account
  2. ```bash
      npm install aws
     ```
  3. ```bash
      sls deploy --stage -(desired stage)
     ```
  ## Learn More

To learn more about Next.js, take a look at the following documentation:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Authors

- [Apfiwaho Ramukosi](https://www.linkedin.com/in/apfiwaho-ramukosi-45738470)
- [Benjamin Ho](https://www.linkedin.com/in/benjamin-ho-42163aa9/)
