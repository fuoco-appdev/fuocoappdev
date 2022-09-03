import React from 'react';
import { Outlet } from "react-router-dom";

export class WindowComponent extends React.Component {
  public override render(): React.ReactNode {
      return (<div><Outlet/></div>);
  }
}

export default WindowComponent;