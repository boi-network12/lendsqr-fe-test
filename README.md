# Lendsqr Frontend Engineer Assessment

## Project Overview
This project is my submission for the Lendsqr Frontend Engineer Assessment V2. It consists of four pages—**Login**, **Dashboard**, **Users**, and **User Details**—built to match the provided Figma design. The application is developed using **React**, **TypeScript**, and **SCSS**, with a mock API from JSON Generator providing 500 user records. User details are stored and retrieved using **localStorage** for the User Details page. The app is fully **mobile responsive** and includes unit tests for key functionality.

## Live Demo
 https://boi-network12-lendsqr-fe-test.vercel.app

https://kamdi-lendsqr-fe-test.vercel.app



## Tech Stack
- **React**: For building reusable and dynamic UI components.
- **TypeScript**: For type-safe development and better code reliability.
- **SCSS**: For modular, maintainable, and responsive styling.
- **JSON Generator**: To simulate a mock API with 500 user records.
- **localStorage**: To store and retrieve user details on the User Details page.
- **React Router**: For navigation between pages.
- **Jest/React Testing Library**: For unit testing positive and negative scenarios.

## Features
- **Login Page**: A form with email and password fields, including password visibility toggle and error validation (e.g., "Please enter a valid email").
- **Dashboard**: Displays key metrics and data, styled to match the Figma design and responsive across devices.
- **Users Page**: Lists 500 user records fetched from the mock API, with pagination and filtering capabilities.
- **User Details Page**: Shows detailed user information (e.g., personal info, account balance, bank details), stored in localStorage for faster retrieval.
- **Responsive Design**: Optimized for both mobile and desktop screens using SCSS media queries.
- **Unit Tests**: Covers positive scenarios (e.g., successful login, data fetching) and negative scenarios (e.g., invalid input, API errors).

## Setup Instructions
To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/boi-network12/lendsqr-fe-test.git
   ```

2. **Navigate to the project folder:**:
   ```bash
   cd lendsqr-fe-test
   ```

3. **install dependencies**: 
   ```bash
   npm install
   ```

4. **start the development server**:
   ```bash
   npm start
   ```

##  Approach and Decisions

**React Structure**: Used functional components and hooks (e.g., useState, useEffect) for state management and side effects. React Router was used for seamless navigation.

**TypeScript**: Implemented interfaces like UserDataItem to ensure type safety for user data (e.g., firstName, lastName, accountBalance, bankName).

**SCSS Styling**: Organized styles into modular SCSS files for maintainability, with media queries for responsiveness. Used modern design elements like rounded corners and subtle shadows for a clean UI.

**Mock API**: Created a mock API with JSON Generator to simulate 500 user records, including fields like account balance, account number, and bank name.

**Storage**: Chose localStorage over IndexedDB for simplicity in storing and retrieving user details on the User Details page, ensuring quick access without repeated API calls.

**Testing**: Wrote unit tests with Jest and React Testing Library to cover key scenarios, such as form validation, API fetching, and navigation.

**Visual Fidelity**: Ensured the app closely matches the Figma design, with pixel-perfect rendering for all pages and responsive layouts.

# Deviations from Design

- **Added a password visibility toggle** to the Login page for better user experience, not explicitly required in the Figma design.
- **Included additional user data fields** (e.g., account balance, bank name) in the mock API to enhance the User Details page, as these were implied but not fully detailed in the design.

# Testing

**Unit Tests**: Located in the `__tests__` folder, covering positive scenarios (e.g., successful login, user data display) and negative scenarios (e.g., invalid email, API failure).

Tests ensure robust functionality and error handling across components like Login, Users, and UserDetails.

# video walkthrough

watch the loom video comparing the figma design with my project https://us05web.zoom.us/clips/share/mRKPxKaiToObKdIn3cCprQ

# Document
For a detailed review of my approach, decisions, and comparison with the Figma design, see my documentation: https://docs.google.com/document/d/1QCXIYJr8XlEkFIMYFQORj4H1G5dr6wHCbunGUgkU2_8/edit?tab=t.0

# contact
For questions or support, reach out to me via kamdilichukwu2020@gmail.com  or contact Lendsqr at careers@lendsqr.com.

