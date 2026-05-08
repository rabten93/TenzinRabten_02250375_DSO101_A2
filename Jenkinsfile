pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
            post {
                always {
                    junit 'junit.xml'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t rabten93/todo-backend:latest .'
            }
        }

       stage('Docker Push') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'docker-hub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {
            bat '@echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
            bat 'docker push rabten93/todo-backend:latest'
        }
    }
       
}
    }
}