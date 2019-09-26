import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [owners, setOwners] = useState(["matt", "brock", "kevin"]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/owners");
      console.log(result);
      setOwners(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {owners.map((owner, index) => (
        <Owner key={index} owner={owner} />
      ))}
    </div>
  );
}

export default App;

function Owner({ owner }) {
  return (
    <div>
      <h3>
        {owner.id} - {owner.name}
      </h3>
      <ul>
        {owner.fantasy_teams &&
          owner.fantasy_teams.length > 0 &&
          owner.fantasy_teams.map(team => (
            <li key={team.id}>
              {team.id} - {team.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
