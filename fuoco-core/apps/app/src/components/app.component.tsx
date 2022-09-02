import React from 'react';

export class AppComponent extends React.Component {
  public override render(): React.ReactNode {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Welcome to app!</h1>
          <img
            width="450"
            src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
            alt="Nx - Smart, Fast and Extensible Build System"
          />
        </div>
      );
  }
}

export default AppComponent;
