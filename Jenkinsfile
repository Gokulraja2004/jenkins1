pipeline {

    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    environment {
        DEV_HOST  = "3.109.156.48"
        QA_HOST   = "15.206.184.2"
        PROD_HOST = "52.66.225.201"
    }

    stages {

        // ================= INSTALL =================

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // ================= BUILD =================

        stage('Build React App') {
            steps {
                sh 'npm run build'
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
            echo 'Pipeline Success'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}