https://sba320-1.onrender.com/

## Mushroom Observer API Experiments

This section summarizes initial explorations with the Mushroom Observer API.

- **`/names` Endpoint:** Used to search and retrieve information about mushroom names.
    - Parameters like `text_name_has`, `rank`, and `location` can be used for filtering.
    - Specific name IDs can be retrieved using the `id` parameter. 
- **`/observations` Endpoint:** Used to access observations of mushrooms.
    - Parameters like `name`, `location`, `date`, and `has_images` are available for filtering.
    - The API uses default pagination.

**Key API Findings:**

- The API documentation is limited. Using `help=1` and requesting data in XML format (to see the SQL queries) was helpful in understanding API behavior.
- Rate limiting is crucial to prevent request blocking.
- Using CSV data dumps (like `names.csv`) can minimize API calls and improve performance.

# Mushroom Identifier

This React application allows users to search for mushrooms by name using data from the Mushroom Observer project.

## Technologies Used

* **HTML, CSS, JavaScript:** Foundational web technologies for structure, styling, and interactivity.
* **React:** JavaScript library for building user interfaces, managing state, and rendering dynamic content.
* **useReducer or Context API:**  For managing application state (parsed mushroom data, search term, filtered results).
    * `useReducer` manages more complex state with a reducer function.
    * The Context API shares data across components without prop drilling.

## Approach

1. **Data Source:** The application uses the `names.csv` file ([https://mushroomobserver.org/names.csv](https://mushroomobserver.org/names.csv)) from Mushroom Observer, which contains information about different mushroom species. 
2. **Component-Based Architecture:**
   * `SearchBar`: Handles user input for searches.
   * `ResultsList`: Displays the filtered search results.
   * `MushroomCard`: Represents an individual mushroom in the results list.
   * `DetailsView` (Optional): Shows more detailed information about a selected mushroom.
3. **State Management:** Manages the application's state (search term, filtered results, etc.) using either `useReducer` or the Context API.
4. **Search Functionality:** Allows users to search for mushrooms by common or scientific names and displays the filtered results.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mushroom-identifier.git

