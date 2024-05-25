
# Mushroom Identifier

This is a simple React application that allows users to search for mushrooms by name, view thumbnail images and hover for descriptions. It utilizes data from the Mushroom Observer project. It was bootstrapped with Vite

## Technologies Used

* **HTML, CSS, JavaScript:** The foundational web technologies used to build the structure, style, and interactivity of the application.
* **React:** A JavaScript library for building user interfaces. React allows us to create reusable components, manage application state efficiently, and render dynamic content.
* **AJAX:** Asynchronous JavaScript and XML, used to fetch data from the Mushroom Observer API.

## Approach

1. **Data Source:**
   * We're using the Mushroom Observer API to fetch data about mushroom species.
2. **Component-Based Architecture:**
   * The application is structured using React components to promote reusability and maintainability.
   * Key components include:
      * `SearchBar`: Handles user input for searching.
      * `ResultsList`:  Displays the filtered results.
      * `MushroomCard`: Represents an individual mushroom in the results list.
      * `DetailsView`: (Optional)  Shows more information about a selected mushroom.
3. **State Management:**
   * Redux Toolkit is used to manage the application's state, including:
      * The fetched mushroom data from the API.
      * The current search term.
      * The filtered search results.
4. **Search Functionality:**
   * The search bar allows users to enter a term (common or scientific name).
   * The application filters the mushroom data based on the search term.
   * The filtered results are displayed in the results list.

## Live Site

[Link to your deployed site]()

## Usage

1. Clone repo:
   git clone https://github.com/your-username/mushroom-identifier.git
2. cd ./backend 
3. Install dependencies:
   npm i
4. Start express server
   node server.js
5. cd ../frontend/src
   npm vite
6. Visit http://localhost:5173   

## Unsolved Problems/Future Improvements

* Implement pagination for search results.
* Add error handling for API requests.
* Improve the styling and layout of the application.
* Implement a more robust search algorithm that can handle misspellings and partial matches.

