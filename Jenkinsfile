pipeline {
    agent any
    environment {
        FRONTEND_DIR = "D:\\Important\\Projects\\ToDoWeb"
        BACKEND_DIR = "D:\\Important\\Projects\\ToDoApi"
    }
    tools {
        nodejs "NodeJS"
    }
    stages {
        stage('checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/chetu1818/To-Do-1.git'
            }
        }
        stage('Deploy & Start Apps') {
            steps {
                bat 'xcopy /E /Y /I "%WORKSPACE%\\frontend\\*" "%FRONTEND_DIR%"'
                bat 'xcopy /E /Y /I "%WORKSPACE%\\backend\\*" "%BACKEND_DIR%"'
                
                // Start Frontend using npx
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                    bat 'npx -y pm2 restart frontend || npx -y pm2 start npm --name "frontend" -- start'
                }
                
                // Start Backend using npx
                dir("${BACKEND_DIR}") {
                    bat 'npm install'
                    bat 'npx prisma generate'
                    bat 'npx -y pm2 restart backend || npx -y pm2 start npm --name "backend" -- start'
                }
            }
        }
    }
}