pipeline {
agent any


stages {

    stage('Clone Repository') {
        steps {
            git branch: 'main',
            url: 'https://github.com/Gokulraja2004/jenkins1.git'
        }
    }

    stage('Install Dependencies') {
        steps {

            sh '''
                rm -rf node_modules package-lock.json

                npm install
            '''
        }
    }

    stage('Build React App') {
        steps {

            sh '''
                npm run build
            '''
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
            scp -o StrictHostKeyChecking=no -r * ubuntu@15.206.184.2:/home/ubuntu/qa-app
            '''

            sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@15.206.184.2 "

                cd /home/ubuntu/qa-app &&

                npm install &&

                npm run build &&

                pm2 delete qa-react || true &&

                pm2 start 'npx serve -s dist -l 3000' --name qa-react &&

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
            scp -o StrictHostKeyChecking=no -r * ubuntu@52.66.225.201:/home/ubuntu/prod-app
            '''

            sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@52.66.225.201 "

                cd /home/ubuntu/prod-app &&

                npm install &&

                npm run build &&

                pm2 delete prod-react || true &&

                pm2 start 'npx serve -s dist -l 3001' --name prod-react &&

                pm2 save
            "
            '''
        }
    }
}

post {

    success {
        echo 'React Vite Deployment Success 🚀'
    }

    failure {
        echo 'Pipeline Failed ❌'
    }
}


}
