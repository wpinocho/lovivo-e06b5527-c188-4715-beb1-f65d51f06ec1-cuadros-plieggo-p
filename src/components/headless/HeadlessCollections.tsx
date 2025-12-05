import { useEffect, useState } from 'react';
import { supabase, type Collection } from '@/lib/supabase';
import { STORE_ID } from '@/lib/config';

/**
 * FORBIDDEN FILE - HeadlessCollections
 * 
 * Contiene toda la lógica de negocio para la página de colecciones.
 * No modificar - protege funcionalidades críticas del ecommerce.
 */

export interface UseCollectionsLogicReturn {
  collections: Collection[];
  loading: boolean;
}

export const useCollectionsLogic = (): UseCollectionsLogicReturn => {
  const [collections, setCollections] = useState<Collection[]>([]);
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
        throw error;
      }

      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    collections,
    loading,
  };
};

interface HeadlessCollectionsProps {
  children: (logic: UseCollectionsLogicReturn) => React.ReactNode;
}

export const HeadlessCollections = ({ children }: HeadlessCollectionsProps) => {
  const logic = useCollectionsLogic();
  return <>{children(logic)}</>;
};