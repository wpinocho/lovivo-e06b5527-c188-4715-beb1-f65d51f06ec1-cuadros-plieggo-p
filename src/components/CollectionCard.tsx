import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group">
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
          <h3 className="font-bold text-xl mb-2 text-foreground">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            onClick={() => onViewProducts(collection.id)}
            className="w-full"
          >
            Ver Cuadros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}