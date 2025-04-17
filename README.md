# RideMate Client Application

RideMate is a console-based and RESTAPI-enabled ride-hailing application written in Java using **Spring Boot**. It supports both **CLI commands** and **REST API endpoints** for managing rides, drivers, and riders.
The client-side application was built using React (with Vite).

---

## Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/Abheelash-Mishra/ridemate-client.git
cd ridemate
```

### **2. Install Dependencies**

Make sure you have **Node.js** installed.

Then, install the project dependencies using:

```bash
npm ci
```

> This command installs the exact versions from `package-lock.json`, ensuring consistency.

You'll also need to have the **RideMate backend API** running locally. You can find the backend repo [here](https://github.com/Abheelash-Mishra/RideMate).

---

### **3. Set Up Environment Variables**

Before starting the app, create a `.env` file in the project root to configure your **local API URL**:

```dotenv
VITE_BASE_URL=http://localhost:8080/riderapp
```

For production builds, create a `.env.production` file with your **live API URL**:

```dotenv
VITE_BASE_URL=https://your-production-domain.com/riderapp
```

---

### **4. Start the Application**

Once your backend is running and your `.env` is configured, start the React app using:

```bash
npm run dev
```

You can now access the app at: `http://localhost:5173`

To access the production build of the application and use the live API, create the production build using:

```bash
npm run prod
```
> This runs `npm run build` first and then `npm run preview` to initialize the application.
 


