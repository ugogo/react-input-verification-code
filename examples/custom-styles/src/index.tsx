import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactInputVerificationCode from 'react-input-verification-code';

import './index.css';

ReactDOM.render(
  <div className='custom-styles'>
    <ReactInputVerificationCode placeholder='' onChange={console.log} />
  </div>,
  document.getElementById('root')
);
