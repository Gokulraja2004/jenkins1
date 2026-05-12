pipeline {

    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    environment {
        DEV_HOST  = credentials('dev-host')
        QA_HOST   = credentials('qa-host')
        PROD_HOST = credentials('prod-host')
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
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$DEV_HOST "
                        sudo rm -rf /home/ubuntu/dev-app &&
                        mkdir -p /home/ubuntu/dev-app
                    "
                    '''

                    sh 'chmod +x deploy-dev.sh'

                    sh './deploy-dev.sh $DEV_HOST $USER $PASS'
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
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$QA_HOST "
                        sudo rm -rf /home/ubuntu/qa-app &&
                        mkdir -p /home/ubuntu/qa-app
                    "
                    '''

                    sh 'chmod +x deploy-qa.sh'

                    sh './deploy-qa.sh $QA_HOST $USER $PASS'
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
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$PROD_HOST "
                        sudo rm -rf /home/ubuntu/prod-app &&
                        mkdir -p /home/ubuntu/prod-app
                    "
                    '''

                    sh 'chmod +x deploy-prod.sh'

                    sh './deploy-prod.sh $PROD_HOST $USER $PASS'
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