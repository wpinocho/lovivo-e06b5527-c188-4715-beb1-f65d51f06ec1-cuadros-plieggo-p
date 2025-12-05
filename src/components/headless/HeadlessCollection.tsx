import { useEffect, useState } from 'react';
import { supabase, type Collection, type Product } from '@/lib/supabase';
import { STORE_ID } from '@/lib/config';

/**
 * FORBIDDEN FILE - HeadlessCollection
 * 
 * Contiene toda la lógica de negocio para la página de detalle de colección.
 * No modificar - protege funcionalidades críticas del ecommerce.
 */

export interface UseCollectionLogicReturn {
  collection: Collection | null;
  products: Product[];
  loading: boolean;
  notFound: boolean;
}

export const useCollectionLogic = (handle: string): UseCollectionLogicReturn => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (handle) {
      fetchCollectionAndProducts(handle);
    }
  }, [handle]);

  const fetchCollectionAndProducts = async (collectionHandle: string) => {
    try {
      // Fetch collection
      const { data: collectionData, error: collectionError } = await supabase
        .from('collections')
        .select('*')
        .eq('handle', collectionHandle)
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .single();

      if (collectionError || !collectionData) {
        console.error('Error fetching collection:', collectionError);
        setNotFound(true);
        setLoading(false);
        return;
      }

      setCollection(collectionData);

      // Fetch collection products
      const { data: collectionProducts, error: cpError } = await supabase
        .from('collection_products')
        .select('product_id')
        .eq('collection_id', collectionData.id);

      if (cpError) {
        console.error('Error fetching collection products:', cpError);
        setLoading(false);
        return;
      }

      if (!collectionProducts || collectionProducts.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const productIds = collectionProducts.map(cp => cp.product_id);

      // Fetch actual products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds);

      if (productsError) {
        console.error('Error fetching products:', productsError);
        setLoading(false);
        return;
      }

      setProducts(productsData || []);
    } catch (error) {
      console.error('Error in fetchCollectionAndProducts:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    collection,
    products,
    loading,
    notFound,
  };
};

interface HeadlessCollectionProps {
  handle: string;
  children: (logic: UseCollectionLogicReturn) => React.ReactNode;
}

export const HeadlessCollection = ({ handle, children }: HeadlessCollectionProps) => {
  const logic = useCollectionLogic(handle);
  return <>{children(logic)}</>;
};