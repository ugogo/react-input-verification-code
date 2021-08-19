import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactInputVerificationCode from 'react-input-verification-code';

import './index.css';

ReactDOM.render(
  <ReactInputVerificationCode autoFocus onChange={console.log} />,
  document.getElementById('root')
);
