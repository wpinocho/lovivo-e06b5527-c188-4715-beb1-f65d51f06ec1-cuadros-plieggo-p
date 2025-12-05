import { HeadlessCollections } from '@/components/headless/HeadlessCollections';
import { CollectionsUI } from '@/pages/ui/CollectionsUI';

/**
 * ROUTE COMPONENT - Collections
 * 
 * Este componente solo conecta HeadlessCollections con CollectionsUI.
 * Toda la lógica está en HeadlessCollections y la presentación en CollectionsUI.
 */

const Collections = () => {
  return (
    <HeadlessCollections>
      {(logic) => <CollectionsUI logic={logic} />}
    </HeadlessCollections>
  );
};

export default Collections;