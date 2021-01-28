
import './App.css';
import { Router } from '@reach/router'

import Dashboard from './views/dashboard'
import EditRental from './views/EditRental'
import NewRental from './views/NewRental'

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard path="/rentals" />
        <EditRental path="/rentals/:id/edit" />
        <NewRental path="/rentals/new" />
      </Router>
    </div>
  );
}

export default App;
