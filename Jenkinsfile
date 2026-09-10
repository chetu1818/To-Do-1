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
                // Copy all source files to the server directories
                bat 'xcopy /E /Y /I "%WORKSPACE%\\frontend\\*" "%FRONTEND_DIR%"'
                bat 'xcopy /E /Y /I "%WORKSPACE%\\backend\\*" "%BACKEND_DIR%"'
                
                // Start Frontend (assuming it runs on port 4200)
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                    bat 'pm2 restart frontend || pm2 start npm --name "frontend" -- start'
                }
                
                // Start Backend (assuming it runs on port 3000)
                dir("${BACKEND_DIR}") {
                    bat 'npm install'
                    bat 'npx prisma generate'
                    bat 'pm2 restart backend || pm2 start npm --name "backend" -- start'
                }
            }
        }
    }
}