import { AppContext } from './AppContext';
import React from 'react';

export function withAppContext(WrapperComponent) {
    return function AppContextComponent(props) {
        return (
            <AppContext.Consumer>
                {
                    appContext => <WrapperComponent {...props} appContext={appContext} />
                }
            </AppContext.Consumer>
        );
    };
}