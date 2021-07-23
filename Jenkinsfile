
pipeline {
    agent any
    environment {
            COMMIT_HASH = "${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"
            AWS_ID = credentials('AWS_ID')
            IMG_NAME = "user_portal"
            REGION = "us-east-2"
            S3_BUCKET = "user-portal-alinetest"
        }
    stages {

        stage("Install") {
            steps {
                sh "npm install"
            }
        }
        stage("Test and lint") {
            steps {
                sh "ng test"
            }
        }
        stage("Serve and build") {
            steps {
                sh "ng build"
            }
        }
        // stage(‘Code Analysis: Sonarqube’) {
        //     steps {
        //         withSonarQubeEnv(‘SonarQube’) {
        //             sh ‘np sonar:sonar’
        //         }
        //     }
        // }
        // stage(‘Await Quality Gateway’) {
        //     steps {
        //         waitForQualityGate abortPipeline: true
        //     }
        // }

        stage("Deploy") {
            steps {
                echo "Update S3 bucket with new build"
                sh "aws s3 sync ./dist s3://${S3_BUCKET} --delete --acl public-read"
            }

        }
    }
    post {
        always {
            sh "Post user_portal deployment"
        }
    }
}
