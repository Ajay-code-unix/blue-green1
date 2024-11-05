   pipeline {
       agent any
       triggers {
        pollSCM('* * * * *') // Poll SCM every minute for changes
    }
       stages {
           stage('Clone Repository') {
               steps {
                   // Cloning the Git repository
                   
                   checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                   userRemoteConfigs: [[url: 'https://github.com/Ajay-code-unix/blue-green1.git']]
                   ])
               }
           }
           stage('Build Docker Image') {
               steps {
                   script {
                       
                       sh "sudo docker build --no-cache  -t ajaybadrinath/bg:latest ."
                   }
               }
           }
           stage('Push Docker Image') {
               steps {
                   
                       sh "echo '<---passwd--->' | sudo -S docker login -u ajaybadrinath --password-stdin"
                       sh  'sudo docker push ajaybadrinath/bg:latest'
                       
                   
               }
           }
           stage('Deploy to Blue or Green') {
               steps {
                   script{
                  // sh 'sudo docker rm -f blue || true'
                   //sh 'sudo docker run -d --name blue -p 3001:3000 ajaybadrinath/bg:latest'
                   def env=sh(script: "curl -s http://localhost:3001 || echo green", returnStdout: true).trim()
                   if (env == "Hello bg") {
                        deployToGreen()
                    } else {
                        deployToBlue()
                    
                       
                   }
               }
           }}
       }
       
        

}
def deployToBlue() {
    sh 'sudo docker rm -f blue || true'
    sh 'sudo docker run -d --name blue -p 3001:3000 ajaybadrinath/bg:latest'
}

def deployToGreen() {
    sh 'sudo docker rm -f green || true'
    sh 'sudo docker run -d --name green -p 3002:3000 ajaybadrinath/bg:latest'
}
