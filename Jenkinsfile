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
                bat 'docker login -u rabten93 -p 160808'
                bat 'docker push rabten93/todo-backend:latest'
            }
        }
    }
}