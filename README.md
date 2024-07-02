# SpendSmart - Financial Management Made Easy!

SpendSmart is a simple expense tracker application that helps you manage your expenses by tracking your transactions in real time.

## Features

- **Add Transactions**: Record income and expenses with descriptions and timestamps.
- **Delete Transactions**: Easily remove transactions.
- **Real-Time Updates**: Automatically updates your balance as transactions are added or deleted.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Live Demo

Checkout the live demo of SpendSmart [here](https://spendsmart-eta.vercel.app/).


https://github.com/AadityaChachra/SpendSmart/assets/72193745/ae1bd7ab-baa5-4bc7-9d93-f0e1478c8b91



## Tech Stack

SpendSmart is built using the MERN stack:

- **Frontend**: React.js (deployed on Vercel) for a responsive and dynamic user interface.
- **Backend**: Node.js and Express.js (deployed on Render) for handling API requests and server-side logic.
- **Database**: MongoDB with Mongoose for data persistence and modeling.
- **Deployment**: Frontend hosted on Vercel, backend hosted on Render.

## Installation

### Prerequisites

To run SpendSmart locally, you will need:

- Node.js and npm installed on your machine.
- A MongoDB database (either local or hosted).
- Accounts on Vercel and Render for deployment.

### Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/yourusername/spendsmart.git
cd spendsmart
```

### Setup Environment Variables

Create a `.env file` in the server directory with the following content:

#### Server/.env:
```bash
MONGO_URL=<your-mongo-url>
PORT=<your-localhost-port>
```
Replace `<your-mongo-url>` with your actual MongoDB connection string and `<your-localhost-port>` with your system local port.

### Install Dependencies

Navigate to each directory and install the required dependencies:

#### Client:
```bash
cd client
npm install <dependencies>
```

#### Server:
```bash
cd server
npm install <dependencies>
```

### Running Locally

#### Start the Backend Server

To start the backend server, run:

```bash
cd server
nodemon index.js
```

#### Start the Frontend React-App

To start the frontend react-app, run:

```bash
cd client
npm start
```
The application will be available at `http://localhost:3000`

## Deployment

### Deploying on Render (Backend)

#### Create a new Web Service:

- Log in to your Render account and create a new Web Service.
- Connect your GitHub repository and select the `server` directory.
- Add the environment variable `MONGO_URL` in the Render dashboard settings.
- Deploy the backend.

### Deploying on Vercel (Frontend)

#### Create a new project:

- Log in to your Vercel account and create a new project.
- Connect your GitHub repository and select the `client` directory.
- Deploy the frontend.

## Usage

- **Add Transaction**: To add a new transaction, enter the amount (e.g., +200 for income, -50 for expenses), a brief description (e.g., Salary, Groceries), and select the date. Click "Add new transaction" to save it.
- **Delete Transaction**: To delete a transaction, click the delete button next to the transaction. The balance will update automatically.
- **View Balance**: The balance displayed at the top shows your total savings or expenses. It updates instantly as you add or delete transactions.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch:

   ```bash
   git checkout -b feature/YourFeature
   
4. Commit your changes:
   
   ```bash
   git commit -m 'Add some feature'
   
6. Push to the branch:
   
   ```bash
   git push origin feature/YourFeature
   
8. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/AadityaChachra/SpendSmart/blob/main/LICENSE) file for details.


## Contact

For any questions or feedback, feel free to contact me at [chachraaaditya@gmail.com](mailto:chachraaaditya@gmail.com).
