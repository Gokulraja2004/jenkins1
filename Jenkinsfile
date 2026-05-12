pipeline {
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
                    sh './deploy-qa.sh $QA_HOST $USER $PASS'
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