import Cookies from 'js-cookie';
import { SubscriptionPlan } from 'fetch-subscription-status';

interface UsageData {
    [date: string]: number;
}

/**
 * Tracks usage of the application based on subscription type
 * and returns whether the user can continue using the app today.
 * 
 * @param plan The user's subscription plan (TRIAL or PREMIUM)
 * @param pageCount Optional number of pages for document-based operations
 * @returns Boolean indicating if usage is allowed
 */
export const trackSubscriptionUsage = (
    plan: SubscriptionPlan,
    pageCount: number | null = null
): boolean => {
    const today = new Date().toISOString().split('T')[0];
    const COOKIE_NAME = 'subscriptionUsage';

    // Maximum daily usages based on subscription type
    const MAX_DAILY_USES = {
        [SubscriptionPlan.TRIAL]: 10,
        [SubscriptionPlan.MONTHLY]: 80,
        // Add other plan types as needed
    };

    // Read existing usage data from cookies
    const usageData: UsageData = JSON.parse(
        Cookies.get(COOKIE_NAME) || '{}'
    );

    // Initialize today's usage count if not exists
    if (!usageData[today]) {
        usageData[today] = 0;
    }

    // Get max uses for the current plan
    const maxDailyUses = MAX_DAILY_USES[plan] || MAX_DAILY_USES[SubscriptionPlan.TRIAL];

    // Calculate usage increment based on plan type and document size
    let usageIncrement = 1;

    if (plan === SubscriptionPlan.TRIAL && pageCount !== null) {
        // Trial plan has special rules for document sizes
        if (pageCount > 100) {
            return false; // Don't allow large documents for trial users
        }

        // Small documents (≤50 pages) count as 1, larger ones count as 2
        usageIncrement = pageCount <= 50 ? 1 : 2;
    }

    // Check if adding this usage would exceed the daily limit
    if (usageData[today] + usageIncrement > maxDailyUses) {
        return false;
    }

    // If we've reached here, usage is allowed - update the count
    usageData[today] += usageIncrement;

    // Save updated usage data (expires in 1 day)
    Cookies.set(COOKIE_NAME, JSON.stringify(usageData), {
        expires: 1,
        path: '/'
    });

    return true;
}

/**
 * Returns the remaining usage for today based on subscription plan
 * 
 * @param plan The user's subscription plan
 * @returns Number of remaining uses for today
 */
export const getRemainingUsage = (plan: SubscriptionPlan): number => {
    const today = new Date().toISOString().split('T')[0];
    const COOKIE_NAME = 'subscriptionUsage';

    // Maximum daily usages based on subscription type
    const MAX_DAILY_USES = {
        [SubscriptionPlan.TRIAL]: 10,
        [SubscriptionPlan.MONTHLY]: 80,
        // Add other plan types as needed
    };

    // Read existing usage data from cookies
    const usageData: UsageData = JSON.parse(
        Cookies.get(COOKIE_NAME) || '{}'
    );

    // Get today's usage or default to 0
    const todayUsage = usageData[today] || 0;

    // Get max uses for the current plan
    const maxDailyUses = MAX_DAILY_USES[plan] || MAX_DAILY_USES[SubscriptionPlan.TRIAL];

    return Math.max(0, maxDailyUses - todayUsage);
}