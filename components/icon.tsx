export function Icon({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`material-symbols-rounded select-none ${className}`} style={style} aria-hidden="true">
      {name}
    </span>
  );
}
