import React from 'react';
import WorldController from '../controllers/world.controller';

class LoadingComponent extends React.Component {
    public override componentDidMount(): void {
        WorldController.updateIsVisible(false);
    }

    public override componentWillUnmount(): void {
        WorldController.updateIsVisible(true);
    }

    public override render(): React.ReactNode {
        return (
            <div></div>
        );
    }
}

export default function ReactiveLoadingComponent(): JSX.Element {
    return (<LoadingComponent />);
}