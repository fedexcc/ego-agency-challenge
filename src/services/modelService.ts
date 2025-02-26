import axios from 'axios';

const BASE_URL = 'https://challenge.egodesign.dev/api';

export interface ModelBasic {
  id: number;
  name: string;
  segment: string;
  year: number;
  price: number;
  thumbnail: string;
  photo: string;
}

export interface ModelFeature {
  name: string;
  description: string;
  image: string;
}

export interface ModelHighlight {
  title: string;
  content: string;
  image: string;
}

export interface ModelDetail extends ModelBasic {
  title: string;
  description: string;
  model_features: ModelFeature[];
  model_highlights: ModelHighlight[];
}

export const modelService = {
  // Get all models
  getAllModels: async (): Promise<ModelBasic[]> => {
    try {
      console.log('Making API call to get all models...');
      const response = await axios.get(`${BASE_URL}/models/`);
      console.log('API response for all models:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getAllModels:', error);
      throw error;
    }
  },

  // Get model details by ID
  getModelById: async (id: number): Promise<ModelDetail> => {
    try {
      console.log(`Making API call to get model ${id} details...`);
      const response = await axios.get(`${BASE_URL}/models/${id}/`);
      console.log('API response for model details:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in getModelById for id ${id}:`, error);
      throw error;
    }
  }
};

export default modelService; 