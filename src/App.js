import './App.css';
import React from 'react';
import { GetBasicModel } from './Models/basicModel'
import { SusceptibleRatex2Model } from './Models/susceptibleRatex2Model'
import { BigModel } from './Models/bigModel/bigModel'
import * as functions from './Models/utils'

function App() {

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 75 }}>
      <div class="nah" onClick={() => { 
        document.getElementsByClassName('nah')[0].className = "test"
        setTimeout(() => {
          document.getElementsByClassName('test')[0].className = "test2"
        }, 1000)
      }}>alo</div>
      <div style={{ width: '60%', }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 200, }}>
          <h1>Insights from multiple pandemic simulators</h1>
          <h3 style={{ marginTop: -10 }}>An interactive report by Anh Chau</h3>
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>

          <div style={{ display: 'flex', flex: 0.1, flexDirection: 'row', marginBottom: 50 }}>
            <div style={{ display: 'flex', flex: 0.5, flexDirection: 'column', textAlign: 'start', flexWrap: 'wrap' }}>
              <h2>Simulating a pandemic</h2>
              <p>
                The simulations model in this project should be seen as a oversimplified version of an actual 
                community. It serves well as a starting point for further investigation of how the disease will 
                spread given the conditions and behaviours of people within the community.
              </p>  
              <text>The people are represented as:</text>
              <ol>
                <li>
                  <div style={{display: 'flex'}}>
                    {functions.renderHealthy()}
                    Healthy individual
                  </div>
                </li>
                <li>
                  <div style={{display: 'flex'}}>
                    {functions.renderInfected()}
                    Infected individual
                  </div>
                </li>

                <li>
                  <div style={{display: 'flex'}}>
                    {functions.renderRecovered()}
                    Recovered (Removed) individual
                  </div>
                </li>
              </ol>
              <i>(To get a fully customizable model with a graphical report, visit my other pandemic simulator project <a href={'https://tuananhc.github.io/pandemic_simulator/'}>here</a>)</i>
            </div>
            <div style={{ display: 'flex', flex: 0.5, justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', flex: 0.5, justifyContent: 'flex-end' }}>
              {GetBasicModel()}
            </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flex: 0.1, flexDirection: 'row' }}>
            <div style={{ display: 'flex', flex: 0.5, flexDirection: 'column', textAlign: 'start', flexWrap: 'wrap' }}>
              <p>The model above are relatively small, merely more than 50 people, which can only represent a small block in a neighbourhood.</p>  
              <p>
                Let's see how the disease spread in a bigger community with 200 people, there is an initial infected proportion of 3% and a chance of
                10% that those who came in contact with an infected individual contract with the disease.
              </p>
            </div>
            <div style={{ display: 'flex', flex: 0.5, justifyContent: 'flex-end' }}>
              {BigModel()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
