import './App.css';
import { useState } from "react";


function App() {

  return (
    <div className="App">
      <div className='container'>
      
        <Box2 />
        <Footer />

      </div>
    </div>
  );

}

function Box1(props) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();
  let day = weekday[d.getDay()];

  var dd = d.getDate();
  var mm = month[d.getMonth()];
  var yyyy = d.getFullYear();
  var date = d.getDate() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear();

  var ico;
  props.data == null ? ico = '03d' : ico = props.data.weather[0]['icon'];

  return (
    <div className='box1'>
      <div>
        <h2><i className="fa fa-map-marker"> </i> {props.data != null ? props.data.name : '___'}, {props.data != null ? props.data.sys?.country : '___'}</h2>
        <p style={{ fontSize: '20px', marginBottom: '5px' }}>{day}</p>
        <p style={{ fontSize: '16px', marginTop: '0px' }}>{date}</p>
      </div>
      <div className="subitem2">
        <img src={'http://openweathermap.org/img/wn/' + ico + '@2x.png'} alt="" />
        <h1 id="temp">{props.data != null ? Math.floor(props.data.main['temp']) + ' °C' : '__°C'}</h1>
        <h3 id="desc">{props.data != null ? props.data.weather[0]['description'] : '___'}</h3>
      </div>
    </div>
  )
}

function Box2() {
  const [city, setCity] = useState('');
  const [d, setD] = useState(null);

  const getData = (city) => {

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API key}&units=metric`;
    fetch(api)
      .then((res) => res.json())
      .then((result) => setD(result))
      .catch((e) => {
        console.log("Something went wrong");
      });
    console.log(d);
  };


  return (
    <>
      <Box1 data={d} />
      <div className='box2'>
        <div className="search">
          <input type="text" name="city" value={city}
            onChange={(e) => setCity(e.target.value)} spellcheck="false" id="city" placeholder="enter city name.." required />
          <button type="submit" id="get_btn" onClick={() => getData(city)}><i className="fa fa-search"></i></button>
        </div>

        <div className="details">
          <h4>Details</h4>
          <hr />

          <table cellspacing="10">

            <Details title='Feels like' value={d != null ? Math.floor(d.main['feels_like']) + ' °C' : '__°C'} />

            <Details title='Wind' value={d != null ? d.wind['speed'] + ' m/s' : '__m/s'} />

            <Details title='Humidity' value={d != null ? d.main['humidity'] + ' %' : '__%'} />

            <Details title='Pressure' value={d != null ? d.main['pressure'] + ' hPa' : '__hPa'} />
          </table>
        </div>

      </div>
    </>
  )
}

function Details(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td><b>{props.value}</b></td>
    </tr>
  )
}

function Footer() {
  return (
    <div className='footer'>
      <p>Developed by <a href='https://fixwithumend.web.app' target={'_blank'}>Umendra Pardhi</a> <a href='https://github.com/umendra-pardhi/Weather-React-App.git' target={'_blank'}><i className="fa fa-github git"></i></a></p>
    </div>
  )
}


export default App;
