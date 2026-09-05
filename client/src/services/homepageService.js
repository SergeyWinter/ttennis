import axios from 'axios';

export const getHomepageData = async () => {
    const response = await fetch('http://localhost:5001/api/homepage');
    return response.json();
};