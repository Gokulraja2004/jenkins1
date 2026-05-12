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

        // ================= BUILD DOCKER IMAGE =================

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

                    sh '''
                    sshpass -p "$PASS" scp -o StrictHostKeyChecking=no react-app.tar $USER@$DEV_HOST:/home/ubuntu
                    '''

                    sh '''
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$DEV_HOST "

                        docker stop react-dev-container || true &&
                        docker rm react-dev-container || true &&

                        docker rmi $IMAGE_NAME || true &&

                        docker load < /home/ubuntu/react-app.tar &&

                        docker run -d \
                        --name react-dev-container \
                        -p 3000:80 \
                        $IMAGE_NAME
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
                    docker save $IMAGE_NAME > react-app.tar
                    '''

                    sh '''
                    sshpass -p "$PASS" scp -o StrictHostKeyChecking=no react-app.tar $USER@$QA_HOST:/home/ubuntu
                    '''

                    sh '''
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$QA_HOST "

                        docker stop react-qa-container || true &&
                        docker rm react-qa-container || true &&

                        docker rmi $IMAGE_NAME || true &&

                        docker load < /home/ubuntu/react-app.tar &&

                        docker run -d \
                        --name react-qa-container \
                        -p 3000:80 \
                        $IMAGE_NAME
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

                    sh '''
                    sshpass -p "$PASS" scp -o StrictHostKeyChecking=no react-app.tar $USER@$PROD_HOST:/home/ubuntu
                    '''

                    sh '''
                    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$PROD_HOST "

                        docker stop react-prod-container || true &&
                        docker rm react-prod-container || true &&

                        docker rmi $IMAGE_NAME || true &&

                        docker load < /home/ubuntu/react-app.tar &&

                        docker run -d \
                        --name react-prod-container \
                        -p 3000:80 \
                        $IMAGE_NAME
                    "
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