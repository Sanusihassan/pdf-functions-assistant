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
    useEffect(() => {
        const loadAdSense = async () => {
            // if (!status) {
            //     const head = document.head;
            //     // dispatch(setField({ subscriptionStatus: status }))

            //     // Add meta tag if not present
            //     // if (!document.querySelector('meta[name="google-adsense-account"]')) {
            //     //     const metaTag = document.createElement('meta');
            //     //     metaTag.name = 'google-adsense-account';
            //     //     metaTag.content = 'ca-pub-7391414384206267';
            //     //     head.appendChild(metaTag);
            //     // }

            //     // // Add script tag if not present
            //     // if (!document.querySelector('script[src*="googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
            //     //     const scriptTag = document.createElement('script');
            //     //     scriptTag.async = true;
            //     //     scriptTag.src =
            //     //         'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7391414384206267';
            //     //     scriptTag.crossOrigin = 'anonymous';
            //     //     head.appendChild(scriptTag);
            //     // }
            // }
        };

        loadAdSense();
    }, []); // Empty dependency array ensures this runs once on mount
    return (
        <ReduxProvider store={store}>
            <ToolComponent {...props} />
        </ReduxProvider>
    );
}
