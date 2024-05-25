# Mushroom Identifier

This is a simple React application that allows users to search for mushrooms by name. It utilizes data from the Mushroom Observer project.

## Technologies Used

* **HTML, CSS, JavaScript:** The foundational web technologies used to build the structure, style, and interactivity of the application.
* **React:** A JavaScript library for building user interfaces. React allows us to create reusable components, manage application state efficiently, and render dynamic content.
* **Redux (or useReducer/Context API):** While Redux is a powerful state management library, for this simpler application, we will likely use either `useReducer` or React's Context API. 
    * **useReducer:** A React hook that provides a way to manage more complex state with a reducer function.
    * **Context API:**  Allows you to share data across your component tree without prop drilling, which can be useful for passing the mushroom data.

## Approach

1. **Data Source:**
   * We're using the `names.csv` file provided by Mushroom Observer ([https://mushroomobserver.org/names.csv](https://mushroomobserver.org/names.csv)). This file contains information about different mushroom species, including their scientific and common names. 
2. **Component-Based Architecture:**
   * The application is structured using React components to promote reusability and maintainability. 
   * Key components include:
      * `SearchBar`: Handles user input for searching.
      * `ResultsList`:  Displays the filtered results.
      * `MushroomCard`: Represents an individual mushroom in the results list.
      * `DetailsView`: (Optional)  Shows more information about a selected mushroom.
3. **State Management:**
   * `useReducer` or the Context API will be used to manage the application's state, including:
      * The parsed mushroom data from the CSV.
      * The current search term.
      * The filtered search results.
4. **Search Functionality:**
   * The search bar allows users to enter a term (common or scientific name).
   * The application filters the mushroom data based on the search term.
   * The filtered results are displayed in the results list.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mushroom-identifier.git
