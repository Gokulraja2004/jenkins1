
pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Gokulraja2004/mernstack-new.git'
            }
        }

        stage('Install Dependencies') {
            steps {

                dir('MERN-E-Commerce-Store-main') {
                    sh 'npm install --legacy-peer-deps'
                }

                dir('MERN-E-Commerce-Store-main/frontend') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Build Frontend') {
            steps {

                dir('MERN-E-Commerce-Store-main/frontend') {

                    sh '''
                        rm -rf node_modules package-lock.json

                        npm install --legacy-peer-deps

                        npm install vite --save-dev --legacy-peer-deps

                        npm run build
                    '''
                }
            }
        }

        stage('Deploy to QA') {
            steps {

                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@15.206.184.2 "
                    sudo rm -rf /home/ubuntu/qa-app &&
                    mkdir -p /home/ubuntu/qa-app
                "
                '''

                sh '''
                scp -o StrictHostKeyChecking=no -r MERN-E-Commerce-Store-main/* ubuntu@15.206.184.2:/home/ubuntu/qa-app
                '''

                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@15.206.184.2 "

                    # BACKEND
                    cd /home/ubuntu/qa-app/backend &&

                    npm install --legacy-peer-deps &&

                    pm2 restart qa-app || pm2 start index.js --name qa-app &&

                    # FRONTEND
                    cd /home/ubuntu/qa-app/frontend &&

                    rm -rf node_modules package-lock.json &&

                    npm install --legacy-peer-deps &&

                    npm install vite --save-dev --legacy-peer-deps &&

                    npm run build &&

                    pm2 restart frontend || pm2 start 'npx serve -s dist -l 3000' --name frontend &&

                    pm2 save
                "
                '''
            }
        }

        stage('Approval for Production') {
            steps {
                input 'Deploy to Production?'
            }
        }

        stage('Deploy to PROD') {
            steps {

                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@52.66.225.201 "
                    sudo rm -rf /home/ubuntu/prod-app &&
                    mkdir -p /home/ubuntu/prod-app
                "
                '''

                sh '''
                scp -o StrictHostKeyChecking=no -r MERN-E-Commerce-Store-main/* ubuntu@52.66.225.201:/home/ubuntu/prod-app
                '''

                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@52.66.225.201 "

                    # BACKEND
                    cd /home/ubuntu/prod-app/backend &&

                    npm install --legacy-peer-deps &&

                    pm2 restart prod-app || pm2 start index.js --name prod-app &&

                    # FRONTEND
                    cd /home/ubuntu/prod-app/frontend &&

                    rm -rf node_modules package-lock.json &&

                    npm install --legacy-peer-deps &&

                    npm install vite --save-dev --legacy-peer-deps &&

                    npm run build &&

                    pm2 restart prod-frontend || pm2 start 'npx serve -s dist -l 3001' --name prod-frontend &&

                    pm2 save
                "
                '''
            }
        }
    }

    post {

        success {
            echo 'Pipeline Success ✅'
        }

        failure {
            echo 'Pipeline Failed ❌'
        }
    }
}
