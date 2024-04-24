# FullStack-CRUD: .NET & Angular

This repository contains a Full Stack CRUD application built using .NET for the backend API and Angular for the frontend.

![1](https://github.com/shadyK7alifa/FullStack-CRUD/assets/167312255/1540cde8-1769-4e52-a3ee-7d87d249d7f1)

## How to Run

Please follow the steps below to run the application:

### Step 1: Change Server Configuration (Optional)

If you want to use a different server for the backend API, you can modify the server configuration in the `appsettings.json` file. Locate the `appsettings.json` file and update the server settings accordingly. If you are using the same server as provided, you can skip this step.

### Step 2: Update Database

To update the database, open the package manager console or terminal and execute the necessary command. This will apply any pending migrations and update the database schema accordingly. Make sure you are in the project directory before running the following command:

bash "dotnet ef database update" <br/>
package manager console "update-database" <br/>

### Step 3: Run the API

To run the backend API, execute the following command in your terminal or command prompt: dotnet run <br/>

### Step 4: Install Client Dependencies
Navigate to the client directory in your terminal or command prompt and run the following command to install the client-side dependencies: npm Install

### Step 5: Run the Client
Once the dependencies are installed, run the following command to start the client: ng serve <br/>
This command will compile the Angular application and start the development server. You can access the application in your browser at http://localhost:4200.

That's it! You have successfully set up and run the FullStack-CRUD application. You can now explore and interact with the CRUD functionality provided by the application.

If you encounter any issues or errors during the setup process, please refer to the project documentation or consult the project's issue tracker for assistance.

Happy coding!
