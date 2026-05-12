pipeline {
    agent any

    environment {
        DEV_SERVER  = "ubuntu@3.109.156.48"
        QA_SERVER   = "ubuntu@15.206.184.2"
        PROD_SERVER = "ubuntu@52.66.225.201"
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

                sh '''
                ssh -o StrictHostKeyChecking=no $DEV_SERVER "
                    sudo rm -rf /home/ubuntu/dev-app &&
                    mkdir -p /home/ubuntu/dev-app
                "
                '''

                sh '''
                scp -o StrictHostKeyChecking=no -r dist/* $DEV_SERVER:/home/ubuntu/dev-app
                '''

                sh '''
                ssh -o StrictHostKeyChecking=no $DEV_SERVER "
                    sudo rm -rf /var/www/html/* &&
                    sudo cp -r /home/ubuntu/dev-app/* /var/www/html/ &&
                    sudo systemctl restart nginx
                "
                '''
            }
        }

        // ================= QA =================

        stage('Deploy to QA') {

            when {
                branch 'qa'
            }

            steps {

                sh '''
                ssh -o StrictHostKeyChecking=no $QA_SERVER "
                    sudo rm -rf /home/ubuntu/qa-app &&
                    mkdir -p /home/ubuntu/qa-app
                "
                '''

                sh '''
                scp -o StrictHostKeyChecking=no -r dist/* $QA_SERVER:/home/ubuntu/qa-app
                '''

                sh '''
                ssh -o StrictHostKeyChecking=no $QA_SERVER "
                    sudo rm -rf /var/www/html/* &&
                    sudo cp -r /home/ubuntu/qa-app/* /var/www/html/ &&
                    sudo systemctl restart nginx
                "
                '''
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

                sh '''
                ssh -o StrictHostKeyChecking=no $PROD_SERVER "
                    sudo rm -rf /home/ubuntu/prod-app &&
                    mkdir -p /home/ubuntu/prod-app
                "
                '''

                sh '''
                scp -o StrictHostKeyChecking=no -r dist/* $PROD_SERVER:/home/ubuntu/prod-app
                '''

                sh '''
                ssh -o StrictHostKeyChecking=no $PROD_SERVER "
                    sudo rm -rf /var/www/html/* &&
                    sudo cp -r /home/ubuntu/prod-app/* /var/www/html/ &&
                    sudo systemctl restart nginx
                "
                '''
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