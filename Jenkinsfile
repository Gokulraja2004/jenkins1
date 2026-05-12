pipeline {
agent any

```
environment {
    DEV_SERVER  = "ubuntu@3.109.156.48"
    QA_SERVER   = "ubuntu@15.206.184.2"
    PROD_SERVER = "ubuntu@52.66.225.201"
}

stages {

    stage('Clone Repository') {
        steps {
            git branch: 'main',
            url: 'https://github.com/Gokulraja2004/jenkins1.git'
        }
    }

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
        steps {

            sh '''
            ssh -o StrictHostKeyChecking=no ${DEV_SERVER} "
                sudo rm -rf /home/ubuntu/dev-app &&
                mkdir -p /home/ubuntu/dev-app
            "
            '''

            sh '''
            scp -o StrictHostKeyChecking=no -r * ${DEV_SERVER}:/home/ubuntu/dev-app
            '''

            sh '''
            ssh -o StrictHostKeyChecking=no ${DEV_SERVER} "
                cd /home/ubuntu/dev-app &&
                npm install &&
                npm run build &&
                pm2 delete dev-react || true &&
                pm2 start 'npx serve -s dist -l 3000' --name dev-react &&
                pm2 save
            "
            '''
        }
    }

    stage('Approval for QA') {
        steps {
            input 'Deploy to QA?'
        }
    }

    stage('Deploy to QA') {
        steps {

            sh '''
            ssh -o StrictHostKeyChecking=no ${QA_SERVER} "
                sudo rm -rf /home/ubuntu/qa-app &&
                mkdir -p /home/ubuntu/qa-app
            "
            '''

            sh '''
            scp -o StrictHostKeyChecking=no -r * ${QA_SERVER}:/home/ubuntu/qa-app
            '''

            sh '''
            ssh -o StrictHostKeyChecking=no ${QA_SERVER} "
                cd /home/ubuntu/qa-app &&
                npm install &&
                npm run build &&
                pm2 delete qa-react || true &&
                pm2 start 'npx serve -s dist -l 3001' --name qa-react &&
                pm2 save
            "
            '''
        }
    }

    stage('Approval for PROD') {
        steps {
            input 'Deploy to PROD?'
        }
    }

    stage('Deploy to PROD') {
        steps {

            sh '''
            ssh -o StrictHostKeyChecking=no ${PROD_SERVER} "
                sudo rm -rf /home/ubuntu/prod-app &&
                mkdir -p /home/ubuntu/prod-app
            "
            '''

            sh '''
            scp -o StrictHostKeyChecking=no -r * ${PROD_SERVER}:/home/ubuntu/prod-app
            '''

            sh '''
            ssh -o StrictHostKeyChecking=no ${PROD_SERVER} "
                cd /home/ubuntu/prod-app &&
                npm install &&
                npm run build &&
                pm2 delete prod-react || true &&
                pm2 start 'npx serve -s dist -l 3002' --name prod-react &&
                pm2 save
            "
            '''
        }
    }
}
```

}
