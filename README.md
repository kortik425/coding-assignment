# Movieland 

## Note: Git Workflow & Commit Philosophy
Throughout the tasks, I followed a disciplined Git workflow to ensure clarity, traceability, and ease of collaboration. For every change or feature update, a separate branch was created. This helps isolate work, making it easier to review and test.

There is intentionally a large number of commits, as I believe in atomic commits: each commit is (as much as possible) self-contained and represents a single logical change. This makes code review easier on the eye, more efficient and allows faster identification of issues, leading to quicker and safer releases.

Rather than batching multiple unrelated changes into large commits, I chose to make many small and fast commits. This approach supports:

* Easier rollbacks when something goes wrong
* Better visibility into the development history
* Faster and more focused code reviews

All changes, commits, and merges can be viewed in the stage branch. In a real-world production workflow, the stage branch would serve as a pre-release environment where changes are validated before being merged into master for production deployment.

React + Redux + RTK + Bootstrap application that fetches movies from [https://www.themoviedb.org/](https://www.themoviedb.org/)

Created with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.