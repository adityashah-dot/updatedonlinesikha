/** White surface with a neutral border. `interactive` adds a hover state for clickable cards. */
export function Card({ as: Tag = "div", interactive = false, className = "", children, ...props }) {
  return (
    <Tag
      className={`bg-white border border-line rounded-xl ${interactive ? "transition-[box-shadow,border-color] hover:border-line-strong hover:shadow-md" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Card;
