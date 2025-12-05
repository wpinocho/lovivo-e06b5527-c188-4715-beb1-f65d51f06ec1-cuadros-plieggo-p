import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface Style {
  id: string
  name: string
  description: string
  image: string
  collectionsCount: number
  productsCount: number
}

interface StyleCardProps {
  style: Style
  onViewStyle: (styleId: string) => void
}

export const StyleCard = ({ style, onViewStyle }: StyleCardProps) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img 
            src={style.image} 
            alt={style.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-2xl mb-2 text-foreground">
            {style.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4">
            {style.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span>{style.collectionsCount} colecciones</span>
            <span>•</span>
            <span>{style.productsCount} cuadros</span>
          </div>
          
          <Button 
            onClick={() => onViewStyle(style.id)}
            className="w-full"
          >
            Explorar {style.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}