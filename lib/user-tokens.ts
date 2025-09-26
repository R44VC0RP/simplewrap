import { db } from './db';
import { account } from './schema';
import { eq, and } from 'drizzle-orm';
import type { TwitterTokens } from './twitter';

/**
 * Get Twitter access tokens for a user
 */
export async function getUserTwitterTokens(userId: string): Promise<TwitterTokens | null> {
  try {
    // Query the account table for Twitter OAuth tokens
    const twitterAccount = await db
      .select({
        accessToken: account.accessToken,
        refreshToken: account.refreshToken,
      })
      .from(account)
      .where(
        and(
          eq(account.userId, userId),
          eq(account.providerId, 'twitter')
        )
      )
      .limit(1);

    if (!twitterAccount.length || !twitterAccount[0].accessToken) {
      return null;
    }

    return {
      accessToken: twitterAccount[0].accessToken,
      refreshToken: twitterAccount[0].refreshToken || undefined,
    };
  } catch (error) {
    console.error('Error fetching user Twitter tokens:', error);
    return null;
  }
}

/**
 * Check if user has connected their Twitter account
 */
export async function hasTwitterAccount(userId: string): Promise<boolean> {
  try {
    const result = await db
      .select({ id: account.id })
      .from(account)
      .where(
        and(
          eq(account.userId, userId),
          eq(account.providerId, 'twitter')
        )
      )
      .limit(1);

    return result.length > 0;
  } catch (error) {
    console.error('Error checking Twitter account:', error);
    return false;
  }
}

/**
 * Update Twitter tokens in the database after refresh
 */
export async function updateTwitterTokens(
  userId: string, 
  tokens: TwitterTokens
): Promise<boolean> {
  try {
    const result = await db
      .update(account)
      .set({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken || null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(account.userId, userId),
          eq(account.providerId, 'twitter')
        )
      );

    console.log('Updated Twitter tokens for user:', userId);
    return true;
  } catch (error) {
    console.error('Error updating Twitter tokens:', error);
    return false;
  }
}

/**
 * Validate Twitter tokens for a user by making a test API call
 */
export async function validateTwitterTokens(userId: string): Promise<{
  valid: boolean;
  error?: string;
  user?: any;
}> {
  try {
    const tokens = await getUserTwitterTokens(userId);
    if (!tokens) {
      return { valid: false, error: 'No Twitter tokens found' };
    }

    // Import here to avoid circular dependency
    const { createTwitterClient } = await import('./twitter');
    const client = createTwitterClient(tokens, userId);
    
    const verification = await client.verifyCredentials();
    if (verification.valid) {
      return { valid: true, user: verification.user };
    } else {
      return { 
        valid: false, 
        error: typeof verification.error === 'string' 
          ? verification.error 
          : 'Token verification failed' 
      };
    }
  } catch (error: any) {
    return { 
      valid: false, 
      error: error.message || 'Token validation failed' 
    };
  }
}
