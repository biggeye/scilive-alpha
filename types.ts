export interface UserProfile {
    id: string | null;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
    website: string | null;
    email: string | null;
  };
  
export interface UserState {
    profile: boolean;
    loading: boolean;
    error: string | null;
  };
  
export interface UserContextType {
    userState: UserState;
    setUserState: React.Dispatch<React.SetStateAction<UserState>>;
    userProfile: UserProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
    supabase: any;
  };

export interface SelectedModel {
  id: string,
  name: string,
  friendlyname: string,
  example?: string,
  url?: string,
  shortdesc: string,
};

export interface IceServer {
  urls: string[];
};

export type StreamId = string;
export type SessionId = string;
export type SdpOffer = string; // or an object if it's more complex
export type IceServers = IceServer[]; // Array of IceServer objects
export type SessionClientAnswer = string; // or an object if it's more complex
export type Candidate = string; // or an object if it's more complex
export type SdpMid = string;
export type SdpMLineIndex = number; // Assuming it's a number

export type AuthProvider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'keycloak'
  | 'linkedin'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos';

export type ContentItem = {
  content_id: string;
  url: string;
  content_type: string | null;
  prompt: string | "";
};

export type currentIndex = {
  url: string;
  content_type: string; 
  prompt: string;
};