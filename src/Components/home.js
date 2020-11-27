import React from 'react';

function Home() {
  return (
      <>
        <h1>Warehouse app</h1>
        <p>
          <div>This is a simple app for showing product
            and availability information </div><div>of three categories:
          jackets, shirts and accessories.</div>
          <p>
          Here's the API documentation
          from <a href="https://www.reaktor.com/junior-dev-assignment/" target="_blank">
            Reaktor website</a>:</p>
          <p>
          <div>
          API documentation is as follows
            <div>
          GET /products/:category – Return a listing of products in a given category.
              <div>
          GET /availability/:manufacturer – Return a list of availability info.
              </div>
            </div>
          The APIs are running at https://bad-api-assignment.reaktor.com/.
          </div>
          </p>
          <p>
            Created by Kimmo Perälä
          </p>
        </p>
      </>
  );
}

export default Home;