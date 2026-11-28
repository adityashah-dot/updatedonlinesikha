import { MODE_FILTERS, APPROVAL_FILTERS, NAAC_FILTERS, FEE_BANDS } from "../../services/universityApi";

const GROUPS = [
  { key: "modes", title: "Mode", options: MODE_FILTERS.map((m) => ({ id: m.id, label: m.label })) },
  { key: "approvals", title: "Approvals", options: APPROVAL_FILTERS.map((a) => ({ id: a, label: a })) },
  { key: "naac", title: "NAAC grade", options: NAAC_FILTERS.map((g) => ({ id: g, label: g.replace("NAAC ", "") })) },
  { key: "fee", title: "Starting fee", options: FEE_BANDS.map((b) => ({ id: b.id, label: b.label })) },
];

/**
 * Filter checklist. Counts come from the live data (`facets`), so every number
 * matches what selecting that option would show.
 */
export function UniversityFilters({ filters, facets, onToggle, idPrefix = "f" }) {
  return (
    <div className="divide-y divide-line">
      {GROUPS.map((group) => (
        <div key={group.key} role="group" aria-labelledby={`${idPrefix}-${group.key}-title`} className="py-4 first:pt-0 last:pb-0">
          <h3 id={`${idPrefix}-${group.key}-title`} className="mb-2 text-sm font-semibold text-ink-900">{group.title}</h3>
          <div className="space-y-0.5">
            {group.options.map((option) => {
              const id = `${idPrefix}-${group.key}-${option.id}`.replace(/[^a-zA-Z0-9-]/g, "");
              const checked = filters[group.key]?.includes(option.id) || false;
              const count = facets?.[group.key]?.[option.id];
              const disabled = !checked && count === 0;
              return (
                <label
                  key={option.id}
                  htmlFor={id}
                  className={`flex min-h-10 items-center gap-3 rounded-lg px-2 -mx-2 ${disabled ? "opacity-40" : "cursor-pointer hover:bg-canvas"}`}
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onToggle(group.key, option.id)}
                    className="h-4 w-4 shrink-0 rounded border-line-strong accent-brand-600"
                  />
                  <span className="flex-1 text-sm text-ink-700">{option.label}</span>
                  {count != null && <span className="text-xs tabular-nums text-ink-500">{count}</span>}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UniversityFilters;
