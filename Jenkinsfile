
pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
            REGION = "us-east-2"
            S3_BUCKET = credentials('MEMBER_BUCKET')

    stages {
        stage("Install") {
            steps { 
                sh "npm i"
            }
        }

        stage("Test") {
            steps {
                sh "npm run test-coverage"
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }

        stage('Sonarqube') {
            steps {
                withSonarQubeEnv('Sonarqube') {
                    sh "npm run sonar"
                }
            }
        }
  
        stage("Await Quality Gateway") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }

        stage("Deploy") {
            steps {
                echo "Update S3 bucket with new build"
                // sh "aws s3 sync ./dist s3://${S3_BUCKET} --delete --acl public-read"
            }
        }
    }

    post {
        always {
            echo "Post Member-Dashboard CI/CD build"
        }   
    }
}