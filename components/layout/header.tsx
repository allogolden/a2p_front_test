export function Header() {
  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Welcome to MyApp Dashboard</div>
          <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}
