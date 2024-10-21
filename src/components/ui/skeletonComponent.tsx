import { cn } from '../../utils/twMerge.js';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-slate-200', className)} {...props} />;
}

export { Skeleton };
