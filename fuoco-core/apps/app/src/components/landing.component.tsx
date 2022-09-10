import React from 'react';
import styles from './landing.module.scss';

class LandingComponent extends React.Component {
  public override render(): React.ReactNode {
      return (
        <div className={styles["root"]}>
          
        </div>
      );
  }
}

export default function ReactiveLandingComponent(): JSX.Element {
    return (<LandingComponent />);
}