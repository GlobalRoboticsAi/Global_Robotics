import React from 'react'
import Footer from './Footer'
import "../Styles/EVCard.css"
import SiteSurvey from "../Images/Site_Survey.png"
import InstallationEV from "../Images/InstallationEv.png"
import Maintenance from "../Images/Maintenance.png"
import System from "../Images/System.png"

export default function EVServiceCrads() {
  return (
    <div>
        <div className="block">
      <div className="EvHomeCardSection">
                <h4>SERVICES WE PROVIDE</h4>
                <h6>Our Purpose is To Deliver Excellence in Service and Execution</h6>
                <div className="EvCard">
                    <div className="EVServiceCard">
                            <img className="cardLogo" src={SiteSurvey}/>
                        <div className="EVcardText">
                            <h3>📍 Site Survey & Feasibility Analysis</h3>
                            <p>We assess your location and power infrastructure to determine the best EV charging solution.</p>
                        </div>
                    </div>

                    <div className="EVServiceCard">
                        <img className="cardLogo" src={InstallationEV}/>
                        <div className="EVcardText">
                            <h3>⚙️ Installation of AC & DC Chargers</h3>
                            <p>From residential chargers to high-speed commercial DC fast chargers.</p>
                        </div>
                    </div>

                    <div className="EVServiceCard">
                        <img className="cardLogo" src={Maintenance}/>
                        <div className="EVcardText">
                            <h3>🔧 Maintenance & Support</h3>
                            <p>We provide end-to-end service, including periodic inspections and technical support.</p>
                        </div>
                    </div>

                    <div className="EVServiceCard">
                     <img className="cardLogo" src={System}/>
                        <div className="EVcardText">
                            <h3>🌐 Smart Charging Integration</h3>
                            <p>Integration with Belectriq’s smart systems for usage tracking, billing, and remote access.</p>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    
    </div>
  )
}
