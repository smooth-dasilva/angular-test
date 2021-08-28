
pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
            COMMIT_HASH = "${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"
            REGION = "us-east-2"
            S3_BUCKET = "user-portal-alinetest"
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
              
              withCredentials([
                string(credentialsId: 'SONAR_URL', variable: 'URL'),
                string(credentialsId: 'USER_PORTAL_SONAR_TOKEN', variable: 'TOKEN')
                    ]){
                    def scannerHome = tool 'sonar'
                    withSonarQubeEnv('Sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                        sh "npm run sonar"

                    timeout(time: 10, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                      
                     }   
                    
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
