export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Plieggo - Inicio" className="ml-2 flex items-center gap-3">
      <img 
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/e06b5527-c188-4715-beb1-f65d51f06ec1/plieggo-logo-transparent-v2.png" 
        alt="Plieggo Logo"
        className="h-10 w-auto object-contain" 
      />
      <span className="text-2xl font-bold text-foreground">Plieggo</span>
    </a>
  )
}