# Feedbackz

This project consists of a Single Page Application (VueJS 3) and a REST API (NestJS).

## Assumptions

This is an initial version (v0) of the dashboard, developed under tight time constraints. While I aim to cover all relevant aspects, I will prioritize certain features and mention others here, recognizing that this should be an iterative process. Below are the assumptions guiding this development:

### Data
- **Shared types**: I will store common frontend and backend types in a shared folder outside their respective root directories to maintain consistent typing across the project.

### Design
- **Responsiveness**: While essential for a strong design, extended responsiveness will be excluded from v0 due to time constraints, particularly the extensive work required for mobile screen adaptations.
- **Theme Handling**: Light/dark mode will not be implemented in v0.

### Internationalization (i18n)
- Internationalization is relevant for this project; however, I will assume it is not needed in v0.

### Accessibility
- While accessibility is important, I will assume it is not required in v0.

### SEO
- The developed pages are not public-facing and do not require consideration from an SEO perspective.

### Documentation
- **Code Readability**: Variable and function/class/method names will be self-explanatory. Code should be simple to read and understand, with comments included only when necessary.
- **REST API documentation**: The REST endpoints will be documented using Swagger, enabling new developers to quickly understand their usage (see Run and Test the Applications locally/Frontend).
- **Documentation**: Since documentation hasn't been explicitly requested, I will assume it is not needed for this exercise.

### Testing
- While testing (unit/component tests, integration tests, e2e tests) is essential, it is not required for this exercise.

### Continuous Integration
- Setting up Continuous Integration (CI) is beyond the scope of this exercise, but the foundations are in place, including a versioning tool (Git), the GitHub platform, and Docker for containerization.
- For ease of setup and testing, I am using a monorepo for this exercise. However, in a real-world scenario, a separate repository for each project and the shared content could be considered.

## Instructions to Build and Run

These steps guide you through building, running, and testing the NestJS backend and Vue.js frontend applications using Docker and Docker Compose.

### Prerequisites

- **Docker** and **Docker Compose** are required to build and run the containers.
- Ensure Docker is running on your machine.

### Cloning the Repository

    git clone https://github.com/adrian-inthe/feedbackz.git

### Project Structure

    feedbackz
    │
    ├── backend/
    │   ├── Dockerfile
    │   └── (NestJS source files)
    │
    ├── frontend/
    │   ├── Dockerfile
    │   └── (Vue.js source files)
    │
    ├── docker-compose.yml
    └── README.md

###  Build and Run the Applications with Docker

Open a terminal and navigate to the project root directory (where the `docker-compose.yml` file is located).

    cd …/feedbackz

Build and start the Docker containers:

    docker compose up --build -d

This command will build the images for both the NestJS backend and the Vue.js frontend and start the services.

### Accessing the frontend

Open your browser and go to [http://localhost:8080](http://localhost:8080)

### Stop the Applications

    docker-compose down

### Run and Test the Applications locally

#### Prerequisites

- Up-to-date **Node.js** and **NPM** are required to build and run the applications locally.

#### Backend

Run a MongoDB docker image to store the data.

    docker run --name mongo-local -d -p 27017:27017 -v mongodb_data:/data/db mongo:latest

Open a terminal and navigate to the project's `backend` directory.

    cd /feedbackz/backend
    npm install
    
    # To start run:
    npm run start:dev 
    # the app will be available on http://localhost:3000

    # To read the API documentation:
    # go to http://localhost:3000/api

#### Frontend

Open a terminal and navigate to the project's `frontend` directory.

    cd /feedbackz/frontend
    npm install
    
    # To start run:
    npm run dev 
    # then open http://localhost:5173

Tip: to easily test the pagination system, change the limit value (e.g. limit: 2) in the feedbackStore.

## Thoughts on the Development Next Steps

Here are some additional considerations for the first iterative improvements to the current solution:

### Loading speeds
- Caching on both the frontend and the backend.
- Adding build middleware to optimize assets.

### Security & Privacy
- Hashing the emails in the database to prevent data leaks.
- Add an authentication layer to prevent unauthorized access.

### Logging & troubleshooting
- Improve logging capabilities with a comprehensive monitoring system like Datadog.
- Enhance troubleshooting by integrating the Marker.io system for streamlined issue reporting and resolution.
