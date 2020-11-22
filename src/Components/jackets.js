import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
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


  // Fetch all the jackets data
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


  // Fetch the data of all the different manufacturers to separate jsons.
  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/availability/reps";
    axios.get(url)
        .then(res => {
          setReps(res.data.response);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

  useEffect(() => {
      const url = "https://bad-api-assignment.reaktor.com/availability/xoon";
      axios.get(url)
          .then(res => {
            setXoon(res.data.response);
            console.log("xoon");
          })
          .catch(error => {
            setError(true);
            console.log(error);
          });
  }, []);

  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/availability/abiplos";
    axios.get(url)
        .then(res => {
          setAbiplos(res.data.response);
          console.log("abiplos");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);


  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/availability/nouke";
      axios.get(url)
        .then(res => {
          setNouke(res.data.response);
          console.log("nouke");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/availability/derp";
      axios.get(url)
        .then(res => {
          setDerp(res.data.response);
          console.log("derp");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);


  // If all the manufacturers jsons are ready, add the availability data to the original jackets data.
useEffect(() => {
  if (reps.length > 0 && xoon.length > 0 && abiplos.length > 0 && nouke.length > 0 && derp.length > 0) {

    var final = [];
    for (var i in jackets) {
      var obj = {
        id: jackets[i].id, name: jackets[i].name, color: jackets[i].color,
        price: jackets[i].price, manufacturer: jackets[i].manufacturer
      };

      if (jackets[i].manufacturer === "reps") {
        for (let j in reps) {
          if (jackets[i].id === reps[j].id.toLowerCase()) {
            let data = "";
            parseString(reps[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      } else if (jackets[i].manufacturer === "xoon") {
        for (let j in xoon) {
          if (jackets[i].id === xoon[j].id.toLowerCase()) {
            let data = "";
            parseString(xoon[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      } else if (jackets[i].manufacturer === "abiplos") {
        for (let j in abiplos) {
          if (jackets[i].id === abiplos[j].id.toLowerCase()) {
            let data = "";
            parseString(abiplos[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      } else if (jackets[i].manufacturer === "nouke") {
        for (let j in nouke) {
          if (jackets[i].id === nouke[j].id.toLowerCase()) {
            let data = "";
            parseString(nouke[j].DATAPAYLOAD, function(err, result) {
              data = result['AVAILABILITY']['INSTOCKVALUE'];
            });
            obj.stock = data;
          }
        }
      } else if (jackets[i].manufacturer === "derp") {
        for (let j in derp) {
          if (jackets[i].id === derp[j].id.toLowerCase()) {
            let data = "";
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
    setLoaded(true);
    console.log("Final ", final);
  }
  }, [reps, xoon, abiplos, nouke, derp]);


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

        <Table striped bordered >
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>color</th>
            <th>price</th>
            <th>manufacturer</th>
            <th>availability</th>
          </tr>
        </thead>
        <tbody>
        {final.length > 0 &&
          final.map(final => (
              <tr>
                <td>
                  {final.id}
                </td>
                <td>
                  {final.name}
                </td>
                <td>
                  {final.color.length !== 1 &&
                  <ul>
                      {final.color.map(color => (
                          <li>
                            {color}
                          </li>
                      ))}
                  </ul>}
                  {final.color.length === 1 && final.color}
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
      </Table>
      </div>
  );
}

export default Jackets