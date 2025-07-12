import { useState, useEffect } from 'react';

export interface PostData {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  type?: string; 
  slug?: string; 
}

export interface PostGrabberProps {
  folderPath?: string;
  formatFunction?: (data: any) => PostData;
}

/**
 * Utility function to grab and format JSON files from a folder
 * Note: This requires the folder to have a manifest.json file listing all JSON files
 * @param folderPath - Path to folder containing JSON files and manifest.json
 * @param formatFunction - Optional custom formatting function
 * @returns Promise<PostData[]> - Formatted list of posts
 */
export const grabJsonFiles = async (
  folderPath: string,
  formatFunction?: (data: any) => PostData
): Promise<PostData[]> => {
  if (!folderPath) {
    throw new Error('Folder path is required');
  }

  // Default formatter
  const defaultFormatter = (data: any): PostData => ({
    id: data.id || Math.random().toString(36).substr(2, 9),
    title: data.title || 'Untitled',
    subtitle: data.subtitle || '',
    content: data.content || '',
    ...data
  });

  const formatter = formatFunction || defaultFormatter;

  try {
    // Fetch the manifest file that lists all JSON files
    const manifestUrl = `${folderPath}/manifest.json`;
    console.log('Fetching manifest from:', manifestUrl);
    
    const manifestResponse = await fetch(manifestUrl);
    if (!manifestResponse.ok) {
      throw new Error(`Failed to fetch manifest from ${manifestUrl}: ${manifestResponse.status} ${manifestResponse.statusText}`);
    }
    
    const manifest = await manifestResponse.json();
    console.log('Manifest loaded:', manifest);
    
    const fileList = manifest.files || [];
    
    if (!Array.isArray(fileList)) {
      throw new Error('Manifest must contain a "files" array');
    }

    if (fileList.length === 0) {
      console.warn('No files found in manifest');
      return [];
    }

    const formattedPosts: PostData[] = [];
    
    // Process each file listed in the manifest
    for (const fileName of fileList) {
      try {
        const fileUrl = `${folderPath}/${fileName}`;
        console.log(`Fetching file: ${fileUrl}`);
        
        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) {
          console.warn(`Failed to fetch file ${fileName}: ${fileResponse.status} ${fileResponse.statusText}`);
          continue; // Skip this file and continue with others
        }
        
        const data = await fileResponse.json();
        console.log(`Loaded data from ${fileName}:`, data);
        
        const formattedData = formatter(data);
        formattedPosts.push(formattedData);
      } catch (fileError) {
        console.warn(`Error processing file ${fileName}:`, fileError);
        continue; // Skip this file and continue with others
      }
    }
    
    console.log('Final formatted posts:', formattedPosts);
    return formattedPosts;
  } catch (error) {
    console.error('Error grabbing JSON files:', error);
    throw error;
  }
};

/**
 * React hook to grab and format JSON files from a folder
 * @param folderPath - Path to folder containing JSON files (e.g., '/posts')
 * @param formatFunction - Optional custom formatting function
 * @returns Object with data, loading, and error states
 */
export const useJsonGrabber = (
  folderPath: string,
  formatFunction?: (data: any) => PostData
) => {
  const [data, setData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!folderPath) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await grabJsonFiles(folderPath, formatFunction);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folderPath, formatFunction]);

  return { data, loading, error };
};
