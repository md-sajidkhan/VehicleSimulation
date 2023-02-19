import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Addvehicle() {
  const navigate = useNavigate();
  const directions = ["Towards","Backwards", "Upwards", "Downwards"];
  const [scenarios, setScenarios] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [vehicleData, setVehicleData] = useState({
    scenarioId: 0,
    vehicleName: '',
    speed: "",
    positionX: "",
    positionY: "",
    direction: '',
    color : `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
  })
  const error = {};

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
    if(buttonClicked){
      handleSubmit();
    }
    setButtonClicked(false)
  },[buttonClicked])
  
  const handleChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name] : e.target.name === 'scenarioId' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const handleReset = () => {
    setVehicleData({
    scenarioId: 0,
    vehicleName: '',
    speed: "",
    positionX: "",
    positionY: "",
    direction: '',
    color : `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    })
    setErrors({})
  }

  const handleSubmit = async () => {
    handleValidation();
    if(Object.keys(error).length > 0){
      setErrors(error);
      return;
    }
    // console.log(vehicleData);
    await axios.post('http://localhost:3005/vehicles', vehicleData)
    .then(res => { console.log(res) })
    .catch(err => { console.log(err) })
    handleReset();
  }

  const handleAddClick = () => {
    setButtonClicked(true);
  }

  const handleValidation = () => {
    if(vehicleData.scenarioId === 0){
      error.scenario = "Scenario is required"
    }
    if(vehicleData.vehicleName.length === 0){
      error.vehicleName = "vehicle name is required"
    }
    if(vehicleData.speed <= 0){
      error.speed = "Enter number greater than 0"
    }

    if(vehicleData.positionX === "" || vehicleData.positionX > 800 || vehicleData.positionX < 0){
      error.positionX = "Position X should not be > 800 and < 0"
    }

    if(vehicleData.positionY === "" || vehicleData.positionY > 400 || vehicleData.positionY < 0){
      error.positionY = "Position Y should not be > 400 and < 0"
    }
    
    if(vehicleData.direction === ""){
      error.direction = "Direction is required"
    }

  }
  return (
    <div className='component'>
      <p>Vehicle / add</p>
      <h2>Add Vehicle</h2>
      <div className='input-container vehicle' onSubmit={handleSubmit}>
        <div className='vehicle-top'>
          <div className='input-block'>
            <label>Scenario List</label>
            {/* <input type="text" placeholder='Select Scenario' className='scenario-input'/> */}
            <select value={vehicleData.scenarioId} name='scenarioId' onChange={handleChange} className="scenario-input">
              <option value="">Select Scenario</option>
              {
                scenarios.map((scenario) => (
                  <option value={scenario.id} key={scenario.id}>{scenario.scenarioName}</option>
                ))
              }
            </select>
            { errors.scenario && <span className='error-message'>{errors.scenario}</span>}
          </div>
          <div className='input-block'>
            <label>Vehicle Name</label>
            <input type="text" placeholder='Target abc' name='vehicleName' value={vehicleData.vehicleName} onChange={handleChange} className='scenario-input'/>
            { errors.vehicleName && <span className='error-message'>{errors.vehicleName}</span>}
          </div>
          <div className='input-block'>
            <label>Speed</label>
            <input type="text" placeholder='2' name='speed' value={vehicleData.speed} onChange={handleChange} className='scenario-input'/>
            { errors.speed && <span className='error-message'>{errors.speed}</span>}
          </div>
        </div>
        <div className='vehicle-bottom'>
          <div className='input-block'>
            <label>Position X</label>
            <input type="text" placeholder='10' name='positionX' value={vehicleData.positionX} onChange={handleChange} className='scenario-input'/>
            { errors.positionX && <span className='error-message'>{errors.positionX}</span>}
          </div>
          <div className='input-block'>
            <label>Position Y</label>
            <input type="text" placeholder='20' name='positionY' value={vehicleData.positionY} onChange={handleChange} className='scenario-input'/>
            { errors.positionY && <span className='error-message'>{errors.positionY}</span>}
          </div>
          <div className='input-block'>
            <label>Direction</label>
            <select value={vehicleData.direction} name="direction" onChange={handleChange} className="scenario-input">
              <option value="">Select Direction</option>
              {
                directions.map((direction, index) => (
                  <option value={direction} key={index}>{direction}</option>
                ))
              }
            </select>
            { errors.direction && <span className='error-message'>{errors.direction}</span>}
          </div>
        </div>
      </div>
      <button className='btncss btn-green' type='submit' onClick={handleAddClick}>Add</button>
      <button className='btncss btn-orange' onClick={handleReset}>Reset</button>
      <button className='btncss btn-blue' onClick={() => navigate('/')}>Go Back</button>
    </div>
  )
}

export default Addvehicle