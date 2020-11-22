import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Jackets() {
  var parseString = require('xml2js').parseString;

  const [jackets, setJackets] = useState([]);

  const [reps, setReps] = useState([]);
  const [xoon, setXoon] = useState([]);
  const [abiplos, setAbiplos] = useState([]);
  const [nouke, setNouke] = useState([]);
  const [derp, setDerp] = useState([]);


  const [final, setFinal] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/products/jackets";

    axios.get(url)
        .then(res => {
          console.log(res.data);
          setJackets(res.data);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        })

  }, []);


  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/availability/reps";
    axios.get(url)
        .then(res => {
            console.log(res.data.response);
            setReps(res.data.response);
          })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

  useEffect(() => {
    const url2 = "https://bad-api-assignment.reaktor.com/availability/xoon";
      axios.get(url2)
          .then(res => {
            console.log(res.data.response);
            setXoon(res.data.response);
          })
          .catch(error => {
            setError(true);
            console.log(error);
          });
  }, []);

  useEffect(() => {
    const url3 = "https://bad-api-assignment.reaktor.com/availability/abiplos";
    axios.get(url3)
        .then(res => {
          console.log(res.data.response);
          setAbiplos(res.data.response);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);


  useEffect(() => {
      const url4 = "https://bad-api-assignment.reaktor.com/availability/nouke";
      axios.get(url4)
        .then(res => {
          console.log(res.data.response);
          setNouke(res.data.response);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);


  useEffect(() => {
      const url5 = "https://bad-api-assignment.reaktor.com/availability/derp";
      axios.get(url5)
        .then(res => {
          console.log(res.data.response);
          setDerp(res.data.response);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

useEffect(() => {
    var final = [];
    for (var i in jackets){
      var obj = {id: jackets[i].id, name: jackets[i].name, color: jackets[i].color,
        price: jackets[i].price, manufacturer: jackets[i].manufacturer};

      if (jackets[i].manufacturer === "reps"){
        for (var j in reps) {
          if (jackets[i].id === reps[j].id.toLowerCase()){
            let data="";
            parseString(reps[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      }
      else if (jackets[i].manufacturer === "xoon"){
        for (var j in xoon) {
          if (jackets[i].id === xoon[j].id.toLowerCase()){
            let data="";
            parseString(xoon[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      }
      else if (jackets[i].manufacturer === "abiplos"){
        for (var j in abiplos) {
          if (jackets[i].id === abiplos[j].id.toLowerCase()){
            let data="";
            parseString(abiplos[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      }
      else if (jackets[i].manufacturer === "nouke"){
        for (var j in nouke) {
          if (jackets[i].id === nouke[j].id.toLowerCase()){
            let data="";
            parseString(nouke[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      }
      else if (jackets[i].manufacturer === "derp"){
        for (var j in derp) {
          if (jackets[i].id === derp[j].id.toLowerCase()){
            let data="";
            parseString(derp[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      }
      final.push(obj);
    }
    setFinal(final);
    console.log("Final ", final);
  }, [reps, xoon, abiplos, nouke]);


  return (
      <div>
      <h1>Jackets page</h1>
        {!isLoaded &&
        <p>
          Loading...
        </p>}
        {error &&
        <p>
          Error in loading process!
        </p>}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>color</th>
            <th>price</th>
            <th>manufacturer</th>
            <th>in stock</th>
          </tr>
        </thead>
        <tbody>
        {final !== [] &&
          final.map(final => (
              <tr>
                <td>
                  {final.id}
                </td>
                <td>
                  {final.name}
                </td>
                <td>
                  {final.color}
                </td>
                <td>
                  {final.price}
                </td>
                <td>
                  {final.manufacturer}
                </td>
                <td>
                  {final.stock}
                </td>
              </tr>
              )
          )
        }

        </tbody>
      </table>
      </div>
  );
}

export default Jackets