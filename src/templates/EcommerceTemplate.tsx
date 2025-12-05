import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ChevronDown } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { ScrollLink } from '@/components/ScrollLink'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { collections, hasCollections, loading: loadingCollections } = useCollections()

  const header = (
    <div className={`py-2 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                <NavigationMenuItem>
                  <ScrollLink 
                    to="/#styles" 
                    className="text-foreground/70 hover:text-foreground transition-colors font-medium px-4 py-2 inline-block"
                  >
                    Estilos
                  </ScrollLink>
                </NavigationMenuItem>

                {!loadingCollections && hasCollections && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground/70 hover:text-foreground transition-colors font-medium">
                      Colecciones
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {collections.map((collection) => (
                          <li key={collection.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/collections/${collection.handle}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {collection.name}
                                </div>
                                {collection.description && (
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {collection.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                  <ScrollLink 
                    to="/#products" 
                    className="text-foreground/70 hover:text-foreground transition-colors font-medium px-4 py-2 inline-block"
                  >
                    Cuadros
                  </ScrollLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/blog" 
                    className="text-foreground/70 hover:text-foreground transition-colors font-medium px-4 py-2 inline-block"
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-secondary text-white py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/e06b5527-c188-4715-beb1-f65d51f06ec1/plieggo-logo-transparent-v2.png" 
                alt="Plieggo Logo"
                className="h-10 w-auto object-contain" 
              />
              <h3 className="font-bold text-xl text-white">Plieggo</h3>
            </div>
            <p className="text-white/80 mb-4">
              Arte origami mexicano hecho a mano con técnica tradicional y papel de alta calidad.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p>✓ 100% Hecho a Mano</p>
              <p>✓ Artesanía Mexicana</p>
              <p>✓ Papel Premium</p>
            </div>
          </div>
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Enlaces</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-white/70 hover:text-white transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-white/70 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Síguenos</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/70">
          <p>&copy; 2024 Plieggo. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}