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

                    sh '''
                    sshpass -p "$PASS" scp -o StrictHostKeyChecking=no -r dist/* $USER@$DEV_HOST:/home/ubuntu/dev-app
                    '''

                    sh '''
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$DEV_HOST "
                        sudo rm -rf /var/www/html/* &&
                        sudo cp -r /home/ubuntu/dev-app/* /var/www/html/ &&
                        sudo systemctl restart nginx
                    "
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
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$QA_HOST "
                        sudo rm -rf /home/ubuntu/qa-app &&
                        mkdir -p /home/ubuntu/qa-app
                    "
                    '''

                    sh '''
                    sshpass -p "$PASS" scp -o StrictHostKeyChecking=no -r dist/* $USER@$QA_HOST:/home/ubuntu/qa-app
                    '''

                    sh '''
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$QA_HOST "
                        sudo rm -rf /var/www/html/* &&
                        sudo cp -r /home/ubuntu/qa-app/* /var/www/html/ &&
                        sudo systemctl restart nginx
                    "
                    '''
                }
            }
        }

        // ================= PROD =================

        stage('Approval for Production') {

            when {
                branch 'main'
            }

            steps {
                input 'Deploy to Production?'
            }
        }

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

                    sh '''
                    sshpass -p "$PASS" scp -o StrictHostKeyChecking=no -r dist/* $USER@$PROD_HOST:/home/ubuntu/prod-app
                    '''

                    sh '''
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$PROD_HOST "
                        sudo rm -rf /var/www/html/* &&
                        sudo cp -r /home/ubuntu/prod-app/* /var/www/html/ &&
                        sudo systemctl restart nginx
                    "
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