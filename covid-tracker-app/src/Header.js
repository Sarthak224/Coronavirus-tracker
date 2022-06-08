import { getDefaultNormalizer } from '@testing-library/react';
import { useEffect,useState } from 'react';
import './App.css'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,BarElement
    } from 'chart.js';
import image from './image.png';
function Header(){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,BarElement
        );
    var flag=false;
    const [covidData,setCovidData]=useState({confirmed:{value:0},deaths:{value:0},recovered:{value:0},lastUpdate:'Loading...'});
    const getData= async()=>{
     var data=await fetch('https://covid19.mathdro.id/api')
    data=await data.json();
    setCovidData(data);
    flag=true;
   // console.log(data);
    }
    useEffect(()=>{
        getData();
    })
    return(
        <div>
        <div className='head'>
        <img src={image} style={{width:'300px',height:'80px'}}/>
           <h1>Global</h1>
           <div className='bottom-head'>

            <div className='card'>
                <h1>Confirmed:</h1>
                
                <p>{covidData.confirmed.value}</p>
                <p>Updated at {covidData.lastUpdate}</p>
                <p>Tells about no of infected people</p>
                <div className='d1'></div>
            </div>
             <div className='card'>
                <h1>Deaths:</h1>
                
                <p>{covidData.deaths.value}</p>
                <p>Updated at {covidData.lastUpdate}</p>
                <p>Tells about total deaths</p>
                <div className='d2'></div>
            </div>
            <div className='card'>
                <h1>Recovered:</h1>
                
                <p>{covidData.recovered.value}</p>
                <p>Updated at {covidData.lastUpdate}</p>
                <p>Tels about total Recovered</p>
                <div className='d3'></div>
            </div>
           </div>
        </div>
        <Bar
        data={{ labels: ['Confirmed','Deaths','Recovered'],
        datasets: [{
            label: 'Covid Graph',
            data: [covidData.confirmed.value,covidData.deaths.value,covidData.recovered.value],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
         
            ],
            borderWidth: 1
        }]

    
            }}
        height={20}
        width={60}
        options={{
            
            responsive:true,
        }}
        />
        </div>
             
        
    )
}
export default Header;