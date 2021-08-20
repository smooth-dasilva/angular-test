
pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
            COMMIT_HASH = "${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"
            REGION = "us-east-2"
            S3_BUCKET = "user-portal-alinetest"
            SONAR_URL = credentials('SONAR_URL')
            USER_PORTAL_SONAR_TOKEN = credentials('USER_PORTAL_SONAR_TOKEN')
        }
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
                    withSonarQubeEnv('SonarQube') {
                        sh "sonar-scanner \
                            -Dsonar.projectKey=user-portal \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${SONAR_URL} \
                            -Dsonar.login=${USER_PORTAL_SONAR_TOKEN}"
                    }
                    timeout(time: 10, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
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
                sh "aws s3 sync ./dist s3://${S3_BUCKET} --delete --acl public-read"
            }
        }
    }

    post {
        always {
            echo "Post CI/CD build"
        }   
    }
}
