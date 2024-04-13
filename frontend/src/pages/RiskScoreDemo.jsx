import React, { useEffect, useState } from 'react'

const RiskScoreDemo = () => {
  const [risk,setRisk] = useState(0)

    async function riskScore() {
        const response = await fetch("http://localhost:3000/api/investment/risk")
        const res = await response.json();
        setRisk(res)
    }

    useEffect(()=>{
      riskScore()
    },[])


  return (
    <div className=''>0</div>
  )
}

export default RiskScoreDemo