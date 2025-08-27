import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import toolReducer from '../src/store';
import { Tool as ToolComponent, type ToolProps } from './Tool';
import { type _howToSchema } from '../src/how-to/how-to';
import { Features } from './Features';
import type { WithContext, HowTo as HowToType } from 'schema-dts';
import HowTo from './HowTo';

export const store = configureStore({
    reducer: {
        tool: toolReducer,
    },
});

type ToolWrapperProps = ToolProps & {
    features: {
        title: string;
        description: string;
    }[],
    howTo: WithContext<HowToType>,
    seoTitle: string;
    to: string;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function ToolWrapper(props: ToolWrapperProps) {
    return (
        <ReduxProvider store={store}>
            <ToolComponent {...props} />
        </ReduxProvider>
    );
}
