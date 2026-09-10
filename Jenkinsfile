pipeline{
	agent any
	
	environment{
		FRONTEND_DIR = "D:\\Important\\Projects\\ToDoWeb"
		BACKEND_DIR = "D:\\Important\\Projects\\ToDoApi"
	}
	tools{
		nodejs "NodeJS"
	}
	stages{
		stage('checkout'){
			steps{
				git branch: 'main', url: 'https://github.com/chetu1818/To-Do-1.git'
			}
		}
		stage('build frontend'){
			steps{
				dir('frontend'){
					bat 'npm install'
					bat 'npx ng build --configuration production'
				}
			}
		}
		stage('Build API'){
			steps{
				bat 'npm install'
				bat 'npx prisma generate'
			}
		}
	}
	stage('deploy to iis'){
		steps{
			// Deploy Angular 
                // Adjust the dist path if your angular.json outputs to a nested folder like dist/frontend/browser
                bat 'xcopy /E /Y /I "%WORKSPACE%\\frontend\\dist\\*" "%FRONTEND_DIR%"'
                
                // Deploy Node.js
                // Note: If you want to persist dev.db between builds, you'll need to exclude it from the xcopy overwrite
                bat 'xcopy /E /Y /I "%WORKSPACE%\\backend\\*" "%BACKEND_DIR%"'
		}
	}
}