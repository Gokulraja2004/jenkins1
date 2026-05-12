pipeline {

    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    environment {

        DEV_HOST  = credentials('dev-host')
        QA_HOST   = credentials('qa-host')
        PROD_HOST = credentials('prod-host')

        IMAGE_NAME = "react-app"
    }

    stages {

        // ================= INSTALL =================

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // ================= BUILD IMAGE =================

        stage('Build Docker Image') {
            steps {

                sh '''
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        // ================= DEV =================

        stage('Deploy to DEV') {

            when {
                branch 'dev'
            }

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dev-id',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {

                    sh '''
                    docker save $IMAGE_NAME > react-app.tar
                    '''

                    sh 'chmod +x deploy-dev.sh'

                    sh '''
                    ./deploy-dev.sh $DEV_HOST $USER $PASS
                    '''
                }
            }
        }

        // ================= QA =================

        stage('Deploy to QA') {

            when {
                branch 'qa'
            }

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'qa2-id',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {

                    sh '''
                    docker save $IMAGE_NAME > react-app.tar
                    '''

                    sh 'chmod +x deploy-qa.sh'

                    sh '''
                    ./deploy-qa.sh $QA_HOST $USER $PASS
                    '''
                }
            }
        }

        // ================= PROD APPROVAL =================

        stage('Approval for Production') {

            when {
                branch 'main'
            }

            steps {
                input 'Deploy to Production?'
            }
        }

        // ================= PROD =================

        stage('Deploy to PROD') {

            when {
                branch 'main'
            }

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'pr-id',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {

                    sh '''
                    docker save $IMAGE_NAME > react-app.tar
                    '''

                    sh 'chmod +x deploy-prod.sh'

                    sh '''
                    ./deploy-prod.sh $PROD_HOST $USER $PASS
                    '''
                }
            }
        }
    }

    post {

        success {
            echo 'Docker Deployment Success'
        }

        failure {
            echo 'Docker Deployment Failed'
        }
    }
}