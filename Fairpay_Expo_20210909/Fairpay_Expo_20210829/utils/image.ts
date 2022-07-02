import Constants from 'expo-constants';
export const pathToUri = (path: string) => `${Constants.manifest?.extra?.MEDIA_ENDPOINT}/${path}`;
