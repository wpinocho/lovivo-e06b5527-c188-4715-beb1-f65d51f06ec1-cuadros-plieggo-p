import { useParams } from 'react-router-dom';
import { HeadlessCollection } from '@/components/headless/HeadlessCollection';
import { CollectionUI } from '@/pages/ui/CollectionUI';

/**
 * ROUTE COMPONENT - Collection
 * 
 * Este componente solo conecta HeadlessCollection con CollectionUI.
 * Toda la lógica está en HeadlessCollection y la presentación en CollectionUI.
 */

const Collection = () => {
  const { handle } = useParams<{ handle: string }>();

  if (!handle) {
    return null;
  }

  return (
    <HeadlessCollection handle={handle}>
      {(logic) => <CollectionUI logic={logic} />}
    </HeadlessCollection>
  );
};

export default Collection;