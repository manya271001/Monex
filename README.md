Key Components and Functionality:
Sign-Up Page (signup function):

Collects Name, Email, and Password inputs and stores them in localStorage as an object.
The data is accessed later for login verification.

Login Page (login function):
verifies the user's email and password against the data stored in localStorage.
Redirects to the dashboard.html upon successful login.

Dashboard Contains:
A navbar with options for Dashboard, Analytics, and Transactions.
Displays user balance and transaction details in a styled layout.
Includes a doughnut chart for visual representation of spending categories.
Implements CRUD operations for transactions using a local JSON database or mock server (http://localhost:3000).

CRUD Operations:
READ: Fetches transaction data and renders it dynamically in a table.
DELETE: Deletes a specific transaction based on its id.
UPDATE: Populates a form with existing data for editing and updates the database upon submission.
CREATE: Inserts a new transaction using a separate form.

