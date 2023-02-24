import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';


function Addscenario() {
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonText, setButtonText] = useState('Add');
  const [scenarioId, setScenarioId] = useState(null);
  const [scenarioData, setScenarioData] = useState({
    scenarioName: '',
    scenarioTime: '',
  });

  const [errors, setErrors] = useState({});
  const error = {};

  useEffect(() => {
    if (location.state && location.state.scenario) {
      let { scenarioName, scenarioTime, id } = location.state.scenario;
      setScenarioData({
        scenarioName: scenarioName,
        scenarioTime: scenarioTime
      });
      setScenarioId(id);
      setButtonText('Update');
    }
    window.history.replaceState( {} , '/addscenario' );
  }, [location.state]);

  useEffect(() => {
    if(buttonClicked){
      handleScenariosubmit();
    }
    setButtonClicked(false)
  },[buttonClicked])

  const handleAddClick = () => {
    setButtonClicked(true);
    setButtonText(scenarioId ? 'Update' : 'Add');
  }

  const handleScenariosubmit = async () => {
    handleValidation();
    if(Object.keys(error).length > 0){
      setErrors(error);
      return;
    }

    if (scenarioId) {
    await axios.put(`http://localhost:3005/scenarios/${scenarioId}`, scenarioData)
      .then(res => { 
        toast.success("Updated Successfully", {
          position: "bottom-right",
          theme: 'colored',
          autoClose: 3000,
        });
        setButtonText("Add");
       })
      .catch(err => { 
        toast.error("Error", {
          position: "bottom-right",
          theme: 'colored',
          autoClose: 3000,
        });
       });
  } 
  else
  {
    await axios.post('http://localhost:3005/scenarios', scenarioData)
      .then(res => { 
        toast.success("Added Successfully", {
          position: "bottom-right",
          theme: 'colored',
          autoClose: 3000,
       });
      })
      .catch(err => { 
        toast.error("Error", {
          position: "bottom-right",
          theme: 'colored',
          autoClose: 3000,
        });
       });
      }
  handleReset();
  }

  const handleValidation = () => {
    if(scenarioData.scenarioName.length < 1){
      error.scenarioName = "Scenario is required"
    }
    if(scenarioData.scenarioTime <= 0){
      error.scenarioTime = "Scenario is required"
    }
  }

  const handleReset = () => {
    setScenarioData({
      scenarioName: '',
      scenarioTime: '',
    })
    setErrors({});
  }

  const handleChange = (e) => {
    setScenarioData({
      ...scenarioData,
      [e.target.name] : e.target.value,
    })
  }

  
  return (
    <div className='component'>
      <p>Scenario / add</p>
      <h2>Add Scenario</h2>
      <form className='input-container input-scenario' onSubmit={handleScenariosubmit}>
        <div>
          <label>Scenario Name</label>
          <input type="text" placeholder='Test Scenario' name='scenarioName' value={scenarioData.scenarioName} onChange={handleChange} className='scenario-input'/>
          {errors.scenarioName && <span className='error-message'>{errors.scenarioName}</span> }
        </div>
        <div>
          <label>Scenario Time(Seconds)</label>
          <input type="number" placeholder='10' name='scenarioTime' value={scenarioData.scenarioTime} onChange={handleChange} className='scenario-input'/>
          {errors.scenarioTime && <span className='error-message'>{errors.scenarioTime}</span> }
        </div>
      </form>
      <button className='btncss btn-green' type='submit' onClick={handleAddClick}>{buttonText}</button>
      <button className='btncss btn-orange' onClick={handleReset}>Reset</button>
      <button className='btncss btn-blue' onClick={() => navigate('/')}>Go Back</button>
      <ToastContainer/>
    </div>
  )
}

export default Addscenario