import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create the Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, 
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, 
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
  // token: process.env.SANITY_API_TOKEN,  
});

// Create the image URL builder using the client
const builder = imageUrlBuilder(client);

// Function to generate URLs for Sanity images
export function urlFor(source: any) {
  return builder.image(source);
}
