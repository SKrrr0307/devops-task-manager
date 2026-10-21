pipeline {

    agent any

    environment {
	DOCKERHUB_USER = 'skrrr0307'

	FRONTEND_IMAGE = 'skrrr0307/devops-task-manager-frontend'
	BACKEND_IMAGE = 'skrrr0307/devops-task-manager-backend'

	IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

	stage('Checkout Code') {
	    steps {
		checkout scm
	    }
	}
	
	stage('Verify Docker') {
	    steps {
		sh ```
		    docker --version
		    docker info > /dev/null
		```
	    }

	}
	
	stage('Build Frontend Image') {
	    steps {
		sh ```
		    docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
		```
	    }
	}
	stage('Build Backend Image') {
            steps {
                sh ```
                    docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend
                ```
            }
        }

	stage('Push Images to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        set +x

                        printf '%s' "$DOCKER_PASS" | \
                          docker login \
                          -u "$DOCKER_USER" \
                          --password-stdin

                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}

                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}

                        docker logout
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'SUCCESS: Frontend and backend images pushed to Docker Hub!'
        }

        failure {
            echo 'FAILED: Check Jenkins console output.'
        }

        always {
            echo "Pipeline execution completed. Build number: ${BUILD_NUMBER}"
        }
    }
}
