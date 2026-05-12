pipeline {

    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    environment {
        DEV_SERVER  = "ubuntu@3.109.156.48"
        QA_SERVER   = "ubuntu@15.206.184.2"
        PROD_SERVER = "ubuntu@52.66.225.201"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to DEV') {

            when {
                branch 'dev'
            }

            steps {
                echo "Deploying to DEV"
            }
        }

        stage('Deploy to QA') {

            when {
                branch 'qa'
            }

            steps {
                echo "Deploying to QA"
            }
        }

        stage('Deploy to PROD') {

            when {
                branch 'main'
            }

            steps {
                echo "Deploying to PROD"
            }
        }
    }
}