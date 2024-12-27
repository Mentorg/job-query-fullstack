## Job Query - Full Stack Setup Documentation

### Prerequisites

Before you begin, ensure that you have the following tools installed on your machine:

1. **PHP** (version 8.1 or higher)

   - Laravel requires PHP 8.1 or higher to run.

2. **Node.js and npm** (Node Package Manager)

   - Node.js should be installed, along with npm, which is used to manage JavaScript dependencies for the React frontend.

3. **Composer**
   - Composer is required to manage PHP dependencies for Laravel.

---

### Step 1: Clone the Repository

Clone the full-stack repository from GitHub to your local machine. Run the following command in your terminal or Git Bash:

```bash
git clone https://github.com/Mentorg/job-query-fullstack.git
```

Navigate to the project directory:

```bash
cd job-query-fullstack
```

Inside this directory, you will see two subdirectories:

- `job-query-api` (Laravel API)
- `job-query` (React frontend)

---

### Step 2: Set Up Laravel API (`job-query-api`)

After cloning the repository, you'll need to set up a `.env` file for both the backend (Laravel) and frontend (React).

1. **Navigate to the `job-query-api` directory**:

   ```bash
   cd job-query-api
   ```

2. **Start Laravel Herd**:

   If you are using Laravel Herd, ensure that you have it running. Laravel Herd should already be set up in the project folder (`C:\Users\(User)\Herd`). If you haven't already, follow the installation steps to get Herd running.

3. **Create the `.env` file**:

   Copy the `.env.example` file to a new `.env` file:

   ```bash
   copy .env.example .env
   ```

   Edit the `.env` file if necessary (e.g., set up your database credentials).

4. **Generate the application key**:

   Run the following command to generate a new application key for Laravel:

   ```bash
   php artisan key:generate
   ```

5. **Install Composer dependencies**:

   Run the following command to install the necessary PHP dependencies:

   ```bash
   composer install
   ```

6. **Run Migrations**:

   Run the following command to create the necessary tables in your database based on your migration files:

   ```bash
   php artisan migrate
   ```

7. **Run Seeders**:

   Run the following command to seed the database using the seeders defined in `DatabaseSeeder.php`:

   ```bash
   php artisan db:seed
   ```

   Alternatively, you can run both migrations and seeders in one command:

   ```bash
   php artisan migrate --seed
   ```

8. **Start the Laravel server**:

   Run the following command to start the Laravel API server:

   ```bash
   php artisan serve
   ```

   This will start the Laravel API on [http://127.0.0.1:8000](http://127.0.0.1:8000). Ensure this server is running as it serves the API for the frontend.

---

### Step 3: Set Up the React Frontend (`job-query`)

1. **Navigate to the `job-query` directory**:

   ```bash
   cd ../job-query
   ```

2. **Create the `.env` file**:

   Create a new `.env` file in the `job-query` directory and add the following content:

   ```env
   VITE_REACT_APP_API_URL = "http://localhost:5173"
   VITE_REACT_APP_API_BASE_URL = "http://127.0.0.1:8000"
   ```

   These variables define the URLs for the React frontend and the Laravel API backend. You can modify these URLs if you're running the servers on different ports or domains.

3. **Install Node.js dependencies**:

   In the `job-query` directory, run the following command to install the necessary JavaScript dependencies using npm:

   ```bash
   npm install
   ```

4. **Start the React development server**:

   Run the following command to start the React development server:

   ```bash
   npm run dev
   ```

   This will start the React frontend on [http://localhost:5173](http://localhost:5173). Ensure this server is running as it connects to the Laravel API for job search functionality.

---

### Step 4: Testing the Application

Once both the Laravel API server and React frontend server are running, you can test the full application by visiting:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:8000](http://localhost:8000)

You should be able to interact with the frontend and query job listings, which will communicate with the backend API running on Laravel.

---

### Troubleshooting

- **Error: "Port already in use"**  
   If the ports (`8000` for Laravel and `3000` for React) are already in use, you can change the port in both the backend and frontend:

  - For the Laravel API, run `php artisan serve --port=8001` to change the port to `8001`.
  - For React, you can change the port in the `package.json` file, under the `"scripts"` section, or by setting the environment variable `PORT=3001` before running `npm run dev`.

- **Cannot connect to the database**  
   Ensure that your `.env` file in the Laravel API has the correct database settings and that your Docker containers are running.

---

### Conclusion

This setup guide helps you get the full-stack **Job Query** application up and running on your local development machine. The app consists of two main components: a Laravel API backend and a React frontend, which must run on separate servers for proper interaction.

Feel free to reach out if you encounter any issues during the setup process!
