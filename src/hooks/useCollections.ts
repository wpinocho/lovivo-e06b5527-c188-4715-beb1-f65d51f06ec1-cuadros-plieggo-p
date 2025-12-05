import { useEffect, useState } from 'react';
import { supabase, type Collection } from '@/lib/supabase';
import { STORE_ID } from '@/lib/config';

/**
 * Hook to check if collections exist and fetch them
 */
export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [hasCollections, setHasCollections] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching collections:', error);
        setHasCollections(false);
        return;
      }

      setCollections(data || []);
      setHasCollections((data || []).length > 0);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setHasCollections(false);
    } finally {
      setLoading(false);
    }
  };

  return { collections, hasCollections, loading };
};