import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactInputVerificationCode from 'react-input-verification-code';

import 'react-input-verification-code/dist/index.css';
import './index.css';

ReactDOM.render(
  <main>
    <h1>Authenticate your account</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      gravida ligula nulla, eu molestie dui vehicula non. Sed volutpat mollis
      sapien sit amet eleifend. Sed vitae molestie lectus
    </p>
    <ReactInputVerificationCode placeholder='' onChange={console.log} />
  </main>,
  document.getElementById('root')
);
