# TenzinRabten_02250375_DSO101_A2
# Assignment II - Jenkins CI/CD Pipeline

**Course:** DSO101 - Continuous Integration and Continuous Deployment  
**Programme:** Bachelor of Engineering in Software Engineering (SWE)  
**Student:** Tenzin Rabten | Student ID: 02250375

---

## Overview

This project demonstrates a fully automated CI/CD pipeline built with Jenkins for a Node.js to-do list application. The pipeline automates code checkout, dependency installation, building, testing, and deployment of a Docker image to Docker Hub.

---

## Pipeline Stages

The Jenkinsfile defines five stages that run sequentially on every push to the main branch.

**Checkout** - Jenkins pulls the latest code from the GitHub repository using stored credentials.

**Install** - Runs `npm install` inside the `todo-app/backend` directory to install all required Node.js dependencies.

**Build** - Runs `npm run build` to execute the build script defined in `package.json`.

**Test** - Runs `npm test` using Jest with the `jest-junit` reporter to generate a `junit.xml` test results file, which Jenkins reads and displays under the Test Results section.

**Deploy** - Builds a Docker image tagged as `bidhasmonga/todo-app:latest` and pushes it to Docker Hub using credentials stored securely in Jenkins.

---

## Pipeline Configuration

The pipeline was configured in Jenkins as follows:

- Created a new Pipeline item in Jenkins
- Set the definition to "Pipeline script from SCM"
- Selected Git as the SCM and provided the GitHub repository URL
- Added GitHub credentials using a Personal Access Token stored in Jenkins Credentials Manager
- Set the script path to `Jenkinsfile` in the repository root
- Saved and triggered the first build using "Build Now"

---

## Tools Used

| Tool | Purpose |
|---|---|
| Jenkins | CI/CD automation |
| GitHub | Source code hosting |
| Node.js and npm | Runtime and package management |
| Jest and jest-junit | Unit testing and JUnit report generation |
| Docker | Containerization and image deployment |
| Docker Hub | Container image registry |

---

## Challenges Faced
Running Jenkins on Windows

The Jenkinsfile provided in the assignment used sh commands, which are intended for Linux or Mac systems. Since Jenkins was running on a Windows machine, all sh commands had to be replaced with bat commands. For example, sh 'npm install' was changed to bat 'cd todo-app\\backend && npm install'. Without this change, the pipeline would fail immediately at every stage.

Docker not recognized by Jenkins

Jenkins could not find the docker command even though Docker Desktop was installed and the path was added to the system environment variables. This was because Jenkins runs as a Windows service under a separate system account that did not inherit the updated PATH. The fix was to bypass the PATH entirely by hardcoding the full path to the Docker executable in the Jenkinsfile as C:\Program Files\Docker\Docker\resources\bin\docker.exe, which resolved the issue completely.

Push failing due to network instability

During the Docker image push to Docker Hub, the connection dropped mid-upload with an EOF error. This was caused by an unstable network connection rather than a code issue. The pipeline was rebuilt and the push succeeded on the next attempt since Docker had cached most of the image layers.

Incorrect Docker Hub credentials

The initial Docker Hub credentials stored in Jenkins had an incorrect password, causing login to fail. The credentials were deleted and recreated with the correct details, after which login succeeded.

## Repository

GitHub: https://github.com/rabten93/TenzinRabten_02250375_DSO101_A2.git
Docker Hub: https://hub.docker.com/repository/docker/rabten93/todo-app

