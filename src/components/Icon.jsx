export default function Icon({ id, className = 'ic', ...rest }) {
  return (
    <svg className={className} aria-hidden="true" {...rest}>
      <use href={`#${id}`} />
    </svg>
  );
}