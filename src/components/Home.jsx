import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

function Home() {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const canvasRef = useRef();
  
  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://localhost:3005/scenarios')
      .then(res => {
        setScenarios(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchData();
  },[])


  useEffect(() => {
    if(selectedScenario != ""){
      const fetchVehicle = async () => {
        await axios.get(`http://localhost:3005/vehicles?scenarioId=${selectedScenario}`)
        .then(res => { setVehicles(res.data)})
        .catch(err => { console.log(err)})
      } 
      fetchVehicle();
    }
  },[selectedScenario])

  // useEffect(() => {
  //   // Generate a unique color for each vehicle
  //   const newVehicles = vehicles.map(vehicle => {
  //     const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  //     return { ...vehicle, color: color };
  //   });
  //   setVehicles(newVehicles);
  // }, [isSimulating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const boxWidth = 80;
    const boxHeight = 67;
    const centerX = boxWidth / 2;
    const centerY = boxHeight / 2;
    const radius = Math.min(boxWidth, boxHeight) / 2;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 6; y++) {
        const color = `rgba(30,30,30,255)`;
        ctx.fillStyle = color;
        ctx.strokeStyle = 'rgba(92,184,92,10)';
        ctx.lineWidth = 0.1;
        ctx.fillRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight);
        ctx.strokeRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight);
      }
    }
        
    for(const vehicle of vehicles){
      // console.log(d.PositionX, d.PositionY)
      let x = (parseInt(vehicle.positionX));
      let y = (parseInt(vehicle.positionY));
      console.log(x,y, centerX, centerY);
      ctx.beginPath();
      ctx.arc(x,y,10,0,2*Math.PI);
      const colorfill = vehicle.color;
      ctx.fillStyle = colorfill;
      ctx.fill()
      ctx.fillStyle = 'white';
      ctx.font = '10px Arial'
      ctx.textAlign = 'center';
      ctx.fillText(vehicle.id, x, y+3)
    }
  }, [vehicles])

  useEffect(() => {
            console.log("working")
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const boxWidth = 80;
            const boxHeight = 67;
            const centerX = boxWidth / 2;
            const centerY = boxHeight / 2;
            const radius = Math.min(boxWidth, boxHeight) / 2;

            let intervalId = null;

            const moveVehicles = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 6; y++) {
                  const color = `rgba(30,30,30,255)`;
                  ctx.fillStyle = color;
                  ctx.strokeStyle = 'rgba(92,184,92,10)';
                  ctx.lineWidth = 0.1;
                  ctx.fillRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight);
                  ctx.strokeRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight);
                }
              }
              const newVehicles = vehicles.map(vehicle => {
                let x = parseInt(vehicle.positionX);
                let y = parseInt(vehicle.positionY);
                const speed = parseInt(vehicle.speed);
                console.log(x,y,speed)
                switch (vehicle.direction) {
                  case 'Downwards':
                    y += speed;
                    break;
                  case 'Upwards':
                    y -= speed;
                    break;
                  case 'Backwards':
                    x -= speed;
                    break;
                  case 'Towards':
                    x += speed;
                    break;
                }

                ctx.beginPath();
                ctx.arc(x, y, 10, 0, 2 * Math.PI);
                const colorfill = vehicle.color;
                ctx.fillStyle = colorfill;
                ctx.fill()
                ctx.fillStyle = 'white';
                ctx.font = '10px Arial'
                ctx.textAlign = 'center';
                ctx.fillText(vehicle.id, x, y +3)

                // Return the updated vehicle
                return { ...vehicle, positionX: x, positionY: y };
              });
              setVehicles(newVehicles);
            }
    if(isSimulating){
      for(let scenario of scenarios){
        if(scenario.id === parseInt(selectedScenario)){
          const intervalDuration = (scenario.scenarioTime * 1000) / 60;
          intervalId = setInterval(moveVehicles, intervalDuration);
        }
      }
    }
    return () => clearInterval(intervalId);
  },[isSimulating, scenarios, selectedScenario, vehicles])




  const handleScenario = (value) => {
    setSelectedScenario(value);
  }

  const handleSimulation = (value) => {
    setIsSimulating(value)
  }


  return (
    <div className='component'>
      <div className="home-scenario">
        <label>Scenario List</label>
          <select value={selectedScenario} onChange={(e) => handleScenario(e.target.value)} className="scenario-input">
            <option value="">Select Scenario</option>
              {
                scenarios.map((scenario) => (
                  <option value={scenario.id} key={scenario.id}>{scenario.scenarioName}</option>
                ))
              }
          </select>
        </div>
        <div className="home-table">
        <table  className="table-scenarios">
          <thead>
            <tr>
              <th>Vehicle Id</th>
              <th>Vehicle Name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            vehicles.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.vehicleName}</td>
                <td>{d.positionX}</td>
                <td>{d.positionY}</td>
                <td>{d.speed}s</td>
                <td>{d.direction}</td>
                <td>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 icon">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>

                </td>
                <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 icon">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                </td>
              </tr>
            ))
          }
        </tbody>
        </table>
        <div className='home-btn'>
        <button className='btncss btn-green' onClick={() => handleSimulation(true)}>Start Simulation</button>
        <button className='btncss btn-blue' onClick={() => handleSimulation(false)}>Stop Simulation</button>
        </div>
        </div>
        <canvas id="vehicle-graph" ref={canvasRef} height={400} width={800}></canvas>
    </div>
  )
}

export default Home