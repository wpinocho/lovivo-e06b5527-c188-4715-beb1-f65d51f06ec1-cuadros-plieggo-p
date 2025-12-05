import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { UseCollectionLogicReturn } from '@/components/headless/HeadlessCollection';

/**
 * EDITABLE UI - CollectionUI
 * 
 * Interfaz completamente editable para la página de detalle de colección.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface CollectionUIProps {
  logic: UseCollectionLogicReturn;
}

export const CollectionUI = ({ logic }: CollectionUIProps) => {
  const { collection, products, loading, notFound } = logic;

  if (notFound) {
    return <Navigate to="/collections" replace />;
  }

  if (loading) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-96 bg-muted rounded-lg mb-8"></div>
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </EcommerceTemplate>
    );
  }

  if (!collection) {
    return <Navigate to="/collections" replace />;
  }

  return (
    <EcommerceTemplate showCart={true}>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/collections">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Colecciones
          </Button>
        </Link>
      </div>

      {/* Collection Hero */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-border">
              {collection.image ? (
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {collection.name}
              </h1>
              
              {collection.description && (
                <p className="text-lg text-muted-foreground mb-6">
                  {collection.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                <span>{products.length} {products.length === 1 ? 'cuadro' : 'cuadros'} disponibles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Cuadros de esta Colección
          </h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Esta colección aún no tiene productos.
              </p>
            </div>
          )}
        </div>
      </section>
    </EcommerceTemplate>
  );
};