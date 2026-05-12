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

                sshagent(credentials: ['dev-server-key']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$DEV_HOST "
                        sudo rm -rf /home/ubuntu/dev-app &&
                        mkdir -p /home/ubuntu/dev-app
                    "
                    '''

                    sh '''
                    scp -o StrictHostKeyChecking=no -r dist/* ubuntu@$DEV_HOST:/home/ubuntu/dev-app
                    '''

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$DEV_HOST "
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

                sshagent(credentials: ['qa-id']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$QA_HOST "
                        sudo rm -rf /home/ubuntu/qa-app &&
                        mkdir -p /home/ubuntu/qa-app
                    "
                    '''

                    sh '''
                    scp -o StrictHostKeyChecking=no -r dist/* ubuntu@$QA_HOST:/home/ubuntu/qa-app
                    '''

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$QA_HOST "
                        sudo rm -rf /var/www/html/* &&
                        sudo cp -r /home/ubuntu/qa-app/* /var/www/html/ &&
                        sudo systemctl restart nginx
                    "
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

                sshagent(credentials: ['prod-id']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$PROD_HOST "
                        sudo rm -rf /home/ubuntu/prod-app &&
                        mkdir -p /home/ubuntu/prod-app
                    "
                    '''

                    sh '''
                    scp -o StrictHostKeyChecking=no -r dist/* ubuntu@$PROD_HOST:/home/ubuntu/prod-app
                    '''

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$PROD_HOST "
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