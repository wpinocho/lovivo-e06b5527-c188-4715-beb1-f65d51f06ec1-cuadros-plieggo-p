import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { StyleCard, type Style } from '@/components/StyleCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);

  // Scroll when style is selected and collections section is rendered
  useEffect(() => {
    if (selectedStyleId) {
      // Small delay to ensure React has rendered the collections section
      setTimeout(() => {
        const collectionsSection = document.getElementById('collections');
        if (collectionsSection) {
          collectionsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [selectedStyleId]);

  // Scroll when collection is selected and products section is rendered
  useEffect(() => {
    if (selectedCollectionId) {
      // Small delay to ensure React has rendered the products section
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [selectedCollectionId]);

  // Define los estilos disponibles
  const styles: Style[] = [
    {
      id: 'acordeon',
      name: 'Acordeón',
      description: 'Diseño clásico con pliegues en zigzag que crean profundidad y textura. Elegante y versátil.',
      image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/e06b5527-c188-4715-beb1-f65d51f06ec1/style-acordeon.jpg',
      collectionsCount: 3,
      productsCount: 17
    },
    {
      id: 'splash',
      name: 'Splash',
      description: 'Diseño dinámico con explosiones de color y formas orgánicas. Moderno y vibrante.',
      image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/e06b5527-c188-4715-beb1-f65d51f06ec1/style-splash.jpg',
      collectionsCount: 2,
      productsCount: 0
    },
    {
      id: 'reguilete',
      name: 'Reguilete',
      description: 'Diseño geométrico inspirado en molinillos de viento. Simétrico y alegre.',
      image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/e06b5527-c188-4715-beb1-f65d51f06ec1/style-reguilete.jpg',
      collectionsCount: 0,
      productsCount: 0
    }
  ];

  const handleViewStyle = (styleId: string) => {
    setSelectedStyleId(styleId);
    // Scroll is now handled by useEffect above
  };

  const handleResetStyle = () => {
    setSelectedStyleId(null);
  };

  // Filtrar colecciones por estilo
  // Si no hay estilo seleccionado, mostrar todas las colecciones
  // Si hay estilo seleccionado, filtrar por ese estilo
  const filteredCollectionsByStyle = selectedStyleId 
    ? (selectedStyleId === 'acordeon' ? collections : [])
    : collections;

  const showCollections = !loadingCollections && filteredCollectionsByStyle.length > 0;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section with Video */}
      <section className="relative bg-background py-20 border-b border-border overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 opacity-20">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/hero-origami-poster.jpg"
          >
            <source src="/videos/hero-origami.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Content over video */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Arte en Papel
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Cada pieza es única, elaborada por artesanos mexicanos con técnica origami tradicional y papel de alta calidad.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              <span>100% Hecho a Mano</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              <span>Artesanía Mexicana</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              <span>Papel Premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section id="styles" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Nuestros Estilos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre las diferentes técnicas de origami que utilizamos. Cada estilo tiene su propia personalidad y estética única.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styles.map((style) => (
              <StyleCard 
                key={style.id} 
                style={style} 
                onViewStyle={handleViewStyle}
              />
            ))}
          </div>

          {selectedStyleId && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={handleResetStyle}
              >
                Ver Todos los Estilos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Collections Section */}
      {showCollections && (
        <section id="collections" className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                {selectedStyleId 
                  ? `Colecciones - Estilo ${styles.find(s => s.id === selectedStyleId)?.name}`
                  : 'Nuestras Colecciones'
                }
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {selectedStyleId 
                  ? `Explora nuestras colecciones de ${styles.find(s => s.id === selectedStyleId)?.name.toLowerCase()}, cada una con su propia paleta de colores y personalidad única`
                  : 'Descubre todas nuestras colecciones de arte origami, cada una con su propia paleta de colores y personalidad única'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredCollectionsByStyle.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {selectedCollectionId 
                ? `Colección ${collections.find(c => c.id === selectedCollectionId)?.name || ''}` 
                : 'Nuestros Cuadros'
              }
            </h2>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="mt-4"
              >
                Ver Todos los Cuadros
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No hay productos disponibles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};