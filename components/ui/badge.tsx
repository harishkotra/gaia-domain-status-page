export function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <span className={`text-sm px-3 py-1 rounded-full font-semibold ${className}`}>{children}</span>;
}
  