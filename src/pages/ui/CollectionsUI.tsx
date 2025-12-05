import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import type { UseCollectionsLogicReturn } from '@/components/headless/HeadlessCollections';

/**
 * EDITABLE UI - CollectionsUI
 * 
 * Interfaz completamente editable para la página de colecciones.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface CollectionsUIProps {
  logic: UseCollectionsLogicReturn;
}

export const CollectionsUI = ({ logic }: CollectionsUIProps) => {
  const { collections, loading } = logic;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="bg-background py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestras Colecciones
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora nuestras colecciones únicas de arte origami. Cada colección tiene su propia personalidad y estética.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : collections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link 
                  key={collection.id} 
                  to={`/collections/${collection.handle}`}
                  className="block"
                >
                  <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group h-full">
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden">
                        {collection.image ? (
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <span className="text-muted-foreground text-sm">Sin imagen</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        
                        {collection.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No hay colecciones disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </EcommerceTemplate>
  );
};