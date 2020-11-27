import React, {useState, useEffect} from 'react';
import {Table, ProgressBar, Button} from 'react-bootstrap';
import axios from 'axios';

function Jackets() {
  const parseString = require('xml2js').parseString;
  const refreshPage = ()=> {
    window.location.reload();
  }

  const [jackets, setJackets] = useState([]);
  const [now, setNow] = useState(0);
  const [reps, setReps] = useState([]);
  const [xoon, setXoon] = useState([]);
  const [abiplos, setAbiplos] = useState([]);
  const [nouke, setNouke] = useState([]);
  const [derp, setDerp] = useState([]);

  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);


  // Fetch all the jackets data
  useEffect(() => {
    const url = "https://bad-api-assignment.reaktor.com/products/jackets";
    axios.get(url)
        .then(res => {
          console.log("JSON-data aluksi", res.data);
          setJackets(res.data);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        })

  }, []);


  // Fetch the data of all the different manufacturers to separate jsons.
  useEffect(() => {
    const url0 = "https://bad-api-assignment.reaktor.com/availability/reps";
    axios.get(url0)
        .then(res => {
          setReps(res.data.response);
          setNow(now => now + 20);
          console.log(now);
          console.log("reps");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

  useEffect(() => {
      const url1 = "https://bad-api-assignment.reaktor.com/availability/xoon";
      axios.get(url1)
          .then(res => {
            setXoon(res.data.response);
            setNow(now => now + 20);
            console.log(now);
            console.log("xoon");
          })
          .catch(error => {
            setError(true);
            console.log(error);
          });
  }, []);

  useEffect(() => {
    const url2 = "https://bad-api-assignment.reaktor.com/availability/abiplos";
    axios.get(url2)
        .then(res => {
          setAbiplos(res.data.response);
          setNow(now => now + 20);
          console.log("abiplos");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

  useEffect(() => {
    const url3 = "https://bad-api-assignment.reaktor.com/availability/nouke";
      axios.get(url3)
        .then(res => {
          setNouke(res.data.response);
          setNow(now => now + 20);
          console.log("nouke");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);

  useEffect(() => {
    const url4 = "https://bad-api-assignment.reaktor.com/availability/derp";
      axios.get(url4)
        .then(res => {
          setDerp(res.data.response);
          setNow(now => now + 20);
          console.log("derp");
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
  }, []);


  // If all the manufacturer jsons are ready, add the availability data to the original jackets data.
  // Take into account the failure opportunity of API sending an empty array "[]".
useEffect(() => {
  if (reps.length > 2 && xoon.length > 2 && abiplos.length > 2 && nouke.length > 2 && derp.length > 2) {

    // let final = [];
    for (let i in jackets) {
      let availability = "";

      if (jackets[i].manufacturer === "reps") {
        for (let j in reps) {
          if (jackets[i].id === reps[j].id.toLowerCase()) {
            parseString(reps[j].DATAPAYLOAD, function(err, result) {
              availability = result['AVAILABILITY']['INSTOCKVALUE'];
            });
          }
        }
      } else if (jackets[i].manufacturer === "xoon") {
        for (let j in xoon) {
          if (jackets[i].id === xoon[j].id.toLowerCase()) {
            parseString(xoon[j].DATAPAYLOAD, function(err, result) {
              availability = result['AVAILABILITY']['INSTOCKVALUE'];
            });
          }
        }
      } else if (jackets[i].manufacturer === "abiplos") {
        for (let j in abiplos) {
          if (jackets[i].id === abiplos[j].id.toLowerCase()) {
            parseString(abiplos[j].DATAPAYLOAD, function(err, result) {
              availability = result['AVAILABILITY']['INSTOCKVALUE'];
            });
          }
        }
      } else if (jackets[i].manufacturer === "nouke") {
        for (let j in nouke) {
          if (jackets[i].id === nouke[j].id.toLowerCase()) {
            parseString(nouke[j].DATAPAYLOAD, function(err, result) {
              availability = result['AVAILABILITY']['INSTOCKVALUE'];
            });
          }
        }
      } else if (jackets[i].manufacturer === "derp") {
        for (let j in derp) {
          if (jackets[i].id === derp[j].id.toLowerCase()) {
            parseString(derp[j].DATAPAYLOAD, function(err, result) {
              availability = result['AVAILABILITY']['INSTOCKVALUE'];
            });
          }
        }
      }
      jackets[i].stock = availability;
    }
    console.log(reps.length, ", ", xoon.length, ", ", abiplos.length, ", ", nouke.length, ", ", derp.length);
    setLoaded(true);
    console.log("JSON-data lopuksi ", jackets);
  }

  // Sometimes manufacturer API sends an array of "[]" with the length of 2. It is apparently built-in intentional failure.
  else if (reps.length === 2 || xoon.length === 2 || abiplos.length === 2 || nouke.length === 2 || derp.length === 2)(
      setError(true)
  )
  }, [reps, xoon, abiplos, nouke, derp]); // Check after every manufacturer json has been loaded


  return (
      <div>
      <h1>Jackets page</h1>
        <p>Found <>{jackets.length}</> jackets</p>

        {!isLoaded &&
        <p className="loadingText">Loading jackets data<span className="loadingDot">.</span>
          <span className="loadingDot">.</span><span className="loadingDot">.</span></p>
        }
        {(error && isLoaded) &&
        <p>
          Error in loading process!
        </p>}
        {error && !isLoaded &&
        <>
          <p>
            Error in retrieving data!
          </p>
          <Button variant="warning" className="tryagain" onClick={refreshPage}>Try again</Button>
        </>
        }
        <ProgressBar now={now} label={`${now}%`} />

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
        {isLoaded &&
          jackets.map(jacket => (
              <tr>
                <td>
                  {jacket.id}
                </td>
                <td>
                  {jacket.name}
                </td>
                <td>
                  {jacket.color.length !== 1 &&
                      <>
                      {jacket.color[0]} & {jacket.color[1]}
                      </>
                  }
                  {jacket.color.length === 1 && jacket.color}
                </td>
                <td>
                  {jacket.price}
                </td>
                <td>
                  {jacket.manufacturer}
                </td>
                <td>
                  {jacket.stock}
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