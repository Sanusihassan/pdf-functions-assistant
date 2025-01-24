export interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    images?: Array<{
        url: string;
        width?: number;
        height?: number;
        alt?: string;
    }>;
    lang: string;
    keywords?: string[];
    noindex?: boolean;
    nofollow?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    type?: "website" | "article" | "video.other";
    locale?: string;
    structuredData?: Array<Record<string, any>>;
    twitter?: {
        handle?: string;
        site?: string;
        cardType?: "summary" | "summary_large_image" | "app" | "player";
    };
}