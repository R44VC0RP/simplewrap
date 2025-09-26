import { TwitterApi } from 'twitter-api-v2';
import { TwitterApiAutoTokenRefresher } from '@twitter-api-v2/plugin-token-refresher';

export interface TwitterTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface MediaItem {
  type: 'base64' | 'url';
  data: string; // base64 string or URL
  mediaType?: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'video/mp4';
}

export interface TokenUpdateCallback {
  (userId: string, tokens: TwitterTokens): Promise<void>;
}

export class TwitterClient {
  private client: TwitterApi;

  constructor(
    tokens: TwitterTokens, 
    userId: string,
    onTokenUpdate?: TokenUpdateCallback
  ) {
    const credentials = {
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    };

    // Create auto-refresher plugin if refresh token is available
    const plugins = [];
    if (tokens.refreshToken && onTokenUpdate) {
      const autoRefresherPlugin = new TwitterApiAutoTokenRefresher({
        refreshToken: tokens.refreshToken,
        refreshCredentials: credentials,
        onTokenUpdate: async (token) => {
          console.log('Twitter tokens refreshed for user:', userId);
          await onTokenUpdate(userId, {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          });
        },
        onTokenRefreshError: (error) => {
          console.error('Twitter token refresh error for user:', userId, error);
        },
      });
      plugins.push(autoRefresherPlugin);
    }

    // Initialize Twitter client with plugins
    this.client = new TwitterApi(tokens.accessToken, { plugins });
  }

  /**
   * Helper function to download media from URL
   */
  private async downloadMediaFromUrl(url: string): Promise<Buffer> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download media from URL: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Helper function to process media items and upload to Twitter
   */
  private async uploadMedia(mediaItems: MediaItem[]): Promise<string[]> {
    const mediaIds: string[] = [];
    
    for (const item of mediaItems) {
      let mediaBuffer: Buffer;
      let mediaType: string;

      // Process media based on type
      if (item.type === 'base64') {
        // Decode base64 data
        const base64Data = item.data.includes(',') 
          ? item.data.split(',')[1] 
          : item.data;
        mediaBuffer = Buffer.from(base64Data, 'base64');
        
        // Detect media type from base64 header or use provided type
        if (item.data.includes('data:')) {
          const mimeMatch = item.data.match(/data:([^;]+);/);
          mediaType = mimeMatch ? mimeMatch[1] : (item.mediaType || 'image/jpeg');
        } else {
          mediaType = item.mediaType || 'image/jpeg';
        }
      } else if (item.type === 'url') {
        // Download media from URL
        mediaBuffer = await this.downloadMediaFromUrl(item.data);
        
        // Try to detect media type from URL extension or use provided type
        const urlLower = item.data.toLowerCase();
        if (urlLower.includes('.png')) mediaType = 'image/png';
        else if (urlLower.includes('.jpg') || urlLower.includes('.jpeg')) mediaType = 'image/jpeg';
        else if (urlLower.includes('.gif')) mediaType = 'image/gif';
        else if (urlLower.includes('.webp')) mediaType = 'image/webp';
        else if (urlLower.includes('.mp4')) mediaType = 'video/mp4';
        else mediaType = item.mediaType || 'image/jpeg';
      } else {
        throw new Error(`Unsupported media type: ${item.type}`);
      }

      // Upload media to Twitter using v1.1 API
      try {
        const mediaUpload = await this.client.v1.uploadMedia(mediaBuffer, { 
          mimeType: mediaType 
        });
        mediaIds.push(mediaUpload);
      } catch (error: any) {
        throw new Error(`Failed to upload media: ${error.message}`);
      }
    }

    return mediaIds;
  }

  /**
   * Post a tweet using Twitter API v2 with optional media
   */
  async postTweet(text: string, media?: MediaItem[]) {
    try {
      let mediaIds: string[] = [];
      
      // Upload media if provided
      if (media && media.length > 0) {
        // Validate media count (Twitter allows max 4 images or 1 video)
        if (media.length > 4) {
          throw new Error('Maximum 4 media items allowed per tweet');
        }
        
        // Check for mixed media types (can't mix images and videos)
        const hasImages = media.some(m => m.mediaType?.startsWith('image/'));
        const hasVideos = media.some(m => m.mediaType?.startsWith('video/'));
        
        if (hasImages && hasVideos) {
          throw new Error('Cannot mix images and videos in the same tweet');
        }
        
        if (hasVideos && media.length > 1) {
          throw new Error('Only one video allowed per tweet');
        }
        
        mediaIds = await this.uploadMedia(media);
      }
      
      // Create tweet payload
      const tweetPayload: any = { text };
      if (mediaIds.length > 0) {
        tweetPayload.media = { media_ids: mediaIds };
      }
      
      const tweet = await this.client.v2.tweet(tweetPayload);
      
      return {
        id: tweet.data.id,
        text: tweet.data.text,
        created_at: new Date().toISOString(),
        status: 'posted' as const,
        media_count: mediaIds.length,
      };
    } catch (error: any) {
      // Handle specific Twitter API errors
      if (error.code === 401) {
        throw new Error('Twitter authentication failed. Token may be expired.');
      } else if (error.code === 403) {
        throw new Error('Twitter API access forbidden. Check account permissions.');
      } else if (error.code === 429) {
        throw new Error('Twitter API rate limit exceeded. Please try again later.');
      } else if (error.errors?.[0]?.code === 187) {
        throw new Error('Duplicate tweet detected. Cannot post the same content twice.');
      }
      
      throw new Error(`Twitter API error: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Verify the Twitter access token is still valid
   */
  async verifyCredentials() {
    try {
      const user = await this.client.v2.me();
      return { valid: true, user: user.data };
    } catch (error) {
      return { valid: false, error: error };
    }
  }
}

/**
 * Create a Twitter client instance with user tokens and auto-refresh capability
 */
export function createTwitterClient(
  tokens: TwitterTokens, 
  userId: string,
  onTokenUpdate?: TokenUpdateCallback
): TwitterClient {
  return new TwitterClient(tokens, userId, onTokenUpdate);
}
