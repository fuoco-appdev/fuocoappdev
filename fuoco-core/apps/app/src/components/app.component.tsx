import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {WindowComponent} from './window.component';

export class AppComponent extends React.Component {
  public override render(): React.ReactNode {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WindowComponent />}>

            </Route>
          </Routes>
        </BrowserRouter>
      );
  }
}

export default AppComponent;
