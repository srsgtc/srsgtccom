export default function ChipGroup({ options, active, onSelect, ariaLabel }) {
  return (
    <div className="chips" role="group" aria-label={ariaLabel}>
      {options.map(([val, label, n]) => (
        <button
          key={val}
          className="chip"
          aria-pressed={active === val}
          data-v={val}
          onClick={() => onSelect(val)}
        >
          {label}<span className="n">{n}</span>
        </button>
      ))}
    </div>
  );
}