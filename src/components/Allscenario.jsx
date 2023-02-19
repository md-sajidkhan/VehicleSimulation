import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Allscenario() {
  const [dataset, setDataset] = useState([]);
  const [numberOfVehicles, setNumberOfVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://localhost:3005/scenarios?_embed=vehicles')
      .then(res => {
        setDataset(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchData();
  },[])

  return (
    <div className='component allscenario'>
      <div className='allscenario-top'>
        <p>All Scenarios</p>
        <div>
        <button className='btncss btn-blue' onClick={() => navigate('/addscenario')}>New Scenario</button>
        <button className='btncss btn-green' onClick={() => navigate('/addvehicle')}>Add Vehicle</button>
        <button className='btncss btn-orange'>Delete All</button>
        </div>
        
      </div>
      
      <table className="table-scenarios">
        <thead>
          <tr>
              <th>Scenario id</th>
              <th>Scenario Name</th>
              <th>Scenario Time</th>
              <th>Number of vehicles</th>
              <th>Add Vehicle</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
        </thead>
        <tbody>
          {
            dataset.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.scenarioName}</td>
                <td>{d.scenarioTime}s</td>
                <td>{d.vehicles.length}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 icon">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                  </svg>
                </td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 icon">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 icon" onClick={() => handleDelete(d.id)}>
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Allscenario