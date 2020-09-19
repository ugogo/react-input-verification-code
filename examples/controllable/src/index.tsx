import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactInputVerificationCode from 'react-input-verification-code';

import './index.css';

const App = () => {
  const [value, setValue] = React.useState('');
  const clearValue = () => setValue('');

  return (
    <>
      <ReactInputVerificationCode onChange={setValue} value={value} />
      <button onClick={clearValue}>Clear</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
