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
            sh 'npm install'
        }
    }

    stage('Build React App') {
        steps {
            sh 'npm run build'
        }
    }
}


}
