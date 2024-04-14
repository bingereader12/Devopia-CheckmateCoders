import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const RiskAnalysis = () => {
  const [formData, setFormData] = useState({
    user: '',
    age: '',
    gender: '',
    maritalStatus: '',
    haveChild: '',
    education: ''
  });
  const [outputData, setOutputData] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform API call with formData
    const response = await fetch('http://127.0.0.1:5000/recommendation/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    setOutputData(data); // Update state with the output data
    setShowOutput(true); // Show the output
  };

  return (
    <section className='bg-primaryBlack text-white h-screen overflow-y-auto no-scrollbar flex flex-row'>
        <Sidebar/>
        <div className='flex w-full flex-col'>
        <h1 className="text-primaryYellow text-4xl font-medium p-4 pl-8">Risk Analysis</h1>
        <div className='flex w-full justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col rounded-lg w-80 bg-[#1e1e1e] p-8 gap-4 h-full'>
            {/* Input fields */}
            <div>
            <label className='flex flex-col' htmlFor="user">UserName:</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-[#1e1e1e]" type="text" id="user" name="user" value={formData.user} onChange={handleChange} />
            </div>
            <div>
            <label className='flex flex-col' htmlFor="age">Age:</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-[#1e1e1e]" type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div>
            <label className='flex flex-col' htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-[#1e1e1e]">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </select>
            </div>
            <div>
            <label className='flex flex-col' htmlFor="maritalStatus">Marital Status:</label>
            <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-[#1e1e1e]">
                <option value="">Select Marital Status</option>
                <option value="MARRIED">Married</option>
                <option value="SINGLE">Single</option>
                <option value="DIVORCED">Divorced</option>
                {/* Add more options as needed */}
            </select>
            </div>
            <div>
            <label className='flex flex-col' htmlFor="haveChild">Have Child:</label>
            <select id="haveChild" name="haveChild" value={formData.haveChild} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-[#1e1e1e]">
                <option value="">Select Option</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
            </select>
            </div>
            <div>
            <label className='flex flex-col' htmlFor="education">Education:</label>
            <select id="haveChild" name="haveChild" value={formData.haveChild} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-[#1e1e1e]">
                <option value="">Select Option</option>
                <option value="SECONDARY">SECONDARY</option>
                <option value="UNIVERSITY">University</option>
            </select>
            </div>
            <button type="submit">Submit</button>
        </form>
        {showOutput && (
            <div>
            <h2>Output</h2>
            <div>
                {outputData.map((item, index) => (
                <div key={index} className="card">
                    <p>Product Name: {item.product_name}</p>
                    <p>Probability (%): {item['probability (%)']}</p>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
        </div>
    </section>
  );
};

export default RiskAnalysis;
