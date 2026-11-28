/** Grey placeholder block shown while content loads. Size it with className. */
export function Skeleton({ className = "", ...props }) {
  return <div aria-hidden="true" className={`rounded-md bg-line animate-pulse ${className}`} {...props} />;
}

export default Skeleton;
