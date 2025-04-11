# Installation Guide - Surgical Instrument Condemnation Certificate System

## System Requirements

### Server Requirements
- Node.js 16.x or higher
- MongoDB 4.4 or higher
- 2GB RAM minimum (4GB recommended)
- 10GB disk space

### Client Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Android 8.0 or higher (for mobile app)

## Web Application Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-organization/condemnation-certificate-app.git
   cd condemnation-certificate-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/condemnation_certificate_app
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. **Initialize the database**
   ```bash
   # Start MongoDB service if not already running
   sudo service mongod start
   
   # Create database and initial collections
   npm run db:setup
   ```

5. **Start the backend server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

4. **Build the frontend**
   ```bash
   npm run build
   ```

5. **Start the frontend development server**
   ```bash
   npm start
   ```

## Production Deployment

### Backend Deployment

1. **Set up a production MongoDB instance**
   - Use MongoDB Atlas or set up a self-hosted MongoDB server
   - Update the MONGODB_URI in your .env file

2. **Configure for production**
   Update the .env file with production settings:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRE=30d
   ```

3. **Deploy using PM2**
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name condemnation-certificate-backend
   pm2 save
   ```

### Frontend Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to web server**
   Copy the contents of the `build` directory to your web server's public directory.

3. **Configure web server**
   
   For Nginx:
   ```
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/frontend/build;
           try_files $uri /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Android APK Installation

### Building the APK

1. **Install Android Studio**
   Download and install Android Studio from [developer.android.com](https://developer.android.com/studio)

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Add Android platform to Capacitor**
   ```bash
   npm install @capacitor/android
   npx cap add android
   ```

4. **Sync web content to Android project**
   ```bash
   npx cap sync android
   ```

5. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

6. **Build the APK in Android Studio**
   - Click on Build > Build Bundle(s) / APK(s) > Build APK(s)
   - The APK will be generated in `android/app/build/outputs/apk/debug/`

### Installing the APK

1. **Enable installation from unknown sources**
   - On your Android device, go to Settings > Security
   - Enable "Unknown sources" or "Install unknown apps"

2. **Transfer the APK to your device**
   - Use USB cable, email, or cloud storage to transfer the APK file

3. **Install the APK**
   - Open the APK file on your device
   - Follow the installation prompts

## Initial Setup

### First-time Configuration

1. **Create admin user**
   After installation, register the first user with the admin role:
   ```
   POST /api/v1/auth/register
   {
     "username": "admin",
     "email": "admin@hospital.com",
     "password": "securepassword",
     "fullName": "Admin User",
     "role": "admin"
   }
   ```

2. **Set up departments**
   Log in as admin and create the necessary departments.

3. **Add condemnation reasons**
   Add standard reasons for instrument condemnation.

## Troubleshooting

### Common Installation Issues

1. **MongoDB Connection Error**
   - Verify MongoDB is running: `sudo systemctl status mongod`
   - Check connection string in .env file
   - Ensure network connectivity to MongoDB server

2. **Node.js Version Conflict**
   - Use nvm to install the correct Node.js version:
     ```
     nvm install 16
     nvm use 16
     ```

3. **Port Already in Use**
   - Change the port in .env file
   - Check for processes using the port: `lsof -i :5000`
   - Kill the process if needed: `kill -9 <PID>`

4. **APK Build Failures**
   - Ensure Java JDK is installed and JAVA_HOME is set
   - Update Android SDK tools
   - Check Gradle version compatibility

## Updating the Application

### Backend Updates

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Install any new dependencies**
   ```bash
   npm install
   ```

3. **Apply database migrations**
   ```bash
   npm run db:migrate
   ```

4. **Restart the server**
   ```bash
   pm2 restart condemnation-certificate-backend
   ```

### Frontend Updates

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Install any new dependencies**
   ```bash
   npm install
   ```

3. **Rebuild the frontend**
   ```bash
   npm run build
   ```

4. **Deploy updated build files**
   Copy the contents of the `build` directory to your web server.

### Android App Updates

1. **Update web content**
   ```bash
   npm run build
   npx cap sync android
   ```

2. **Rebuild the APK**
   Open in Android Studio and build a new APK.

## Backup and Recovery

### Database Backup

1. **Create MongoDB backup**
   ```bash
   mongodump --uri="mongodb://localhost:27017/condemnation_certificate_app" --out=/path/to/backup/directory
   ```

2. **Automate regular backups**
   Add to crontab:
   ```
   0 0 * * * mongodump --uri="mongodb://localhost:27017/condemnation_certificate_app" --out=/path/to/backup/directory/$(date +\%Y-\%m-\%d)
   ```

### Database Restoration

1. **Restore from backup**
   ```bash
   mongorestore --uri="mongodb://localhost:27017/condemnation_certificate_app" /path/to/backup/directory
   ```

## Security Considerations

1. **Use HTTPS in production**
   - Obtain SSL certificate (Let's Encrypt recommended)
   - Configure web server for HTTPS

2. **Secure JWT secret**
   - Use a strong, unique JWT secret
   - Rotate the secret periodically

3. **Regular updates**
   - Keep Node.js, MongoDB, and all dependencies updated
   - Apply security patches promptly

4. **Access control**
   - Implement proper role-based access control
   - Regularly audit user accounts and permissions
