export function LoadingFallback() {
  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}
