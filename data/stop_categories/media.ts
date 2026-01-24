
import { StopData } from '../../types';
import { moviesData } from './media_movies';
import { songsData } from './media_songs';
import { sportsData } from './media_sports';

// This file aggregates all media data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const mediaData: StopData = {};

alphabet.forEach(letter => {
    mediaData[letter] = {
        ...(moviesData[letter] || {}),
        ...(songsData[letter] || {}),
        ...(sportsData[letter] || {})
    };
});
