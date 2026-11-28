import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, ShieldCheck, Award, Globe, X, SearchX, RotateCw } from 'lucide-react';
import {
  getUniversitiesPayload,
  LISTING_SORT_FIELDS,
  countActiveFilters,
  FEE_BANDS,
  MODE_FILTERS,
} from '../services/universityApi';
import { BlogsListSection } from './BlogsListSection';
import { UniversitiesFaq } from './UniversitiesFaq';
import { AcademicExpertCounselingSection } from './AcademicExpertCounselingSection';
import { UniversityResultCard } from './university/UniversityResultCard';
import { UniversityFilters } from './university/UniversityFilters';
import { Button, Card, Chip, Sheet, Skeleton, SectionHeader } from './ui';

const LISTING_REQUEST_TIMEOUT_MS = 15000;

/* Filter state lives in the URL (?mode=online&approval=UGC-DEB&fee=under1&sort=lowestFee&page=2&q=mba)
   so results are shareable and survive back/forward navigation. */
const FILTER_KEYS = ['modes', 'approvals', 'naac', 'fee'];
const PARAM = { modes: 'mode', approvals: 'approval', naac: 'naac', fee: 'fee' };

const QUICK_FILTERS = [
  { key: 'modes', id: 'online', label: 'Online only' },
  { key: 'approvals', id: 'UGC-DEB', label: 'UGC-DEB entitled' },
  { key: 'naac', id: 'NAAC A++', label: 'NAAC A++' },
  { key: 'fee', id: 'under1', label: 'Under ₹1L' },
];

const filterLabel = (key, id) => {
  if (key === 'modes') return MODE_FILTERS.find((m) => m.id === id)?.label || id;
  if (key === 'fee') return FEE_BANDS.find((b) => b.id === id)?.label || id;
  return id;
};

function readFilters(params) {
  return Object.fromEntries(FILTER_KEYS.map((key) => [key, params.getAll(PARAM[key])]));
}

const VERIFICATION = [
  {
    icon: ShieldCheck,
    title: 'UGC-DEB entitlement',
    body: 'Check that the university is listed on deb.ugc.ac.in for your admission year. Only entitled universities can award valid online degrees.',
  },
  {
    icon: Award,
    title: 'NAAC grade or NIRF rank',
    body: 'Under UGC rules, universities generally need a NAAC score of 3.26 (A+) or higher, or a top-100 NIRF rank, to offer online degrees.',
  },
  {
    icon: Globe,
    title: 'Recognition abroad',
    body: 'If you plan to study or work outside India, check whether WES evaluates degrees from the university.',
  },
];

function ResultSkeleton() {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex gap-4">
        <Skeleton className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-1.5 pt-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      </div>
      <Skeleton className="mt-4 h-14 w-full rounded-lg" />
    </Card>
  );
}

export const UniversitiesView = ({ onOpenHelpDesk, onOpenBrochure }) => {
  const [params, setParams] = useSearchParams();
  const paramsKey = params.toString();
  const filters = useMemo(() => readFilters(params), [paramsKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const search = params.get('q') || '';
  const sort = LISTING_SORT_FIELDS[params.get('sort')] ? params.get('sort') : 'recommended';
  const page = Math.max(1, Number(params.get('page')) || 1);

  const [searchInput, setSearchInput] = useState(search);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [retry, setRetry] = useState(0);
  const [state, setState] = useState({
    loading: true,
    universities: [],
    pagination: null,
    facets: null,
    totalUnfiltered: 0,
    error: '',
  });

  useEffect(() => setSearchInput(search), [search]);

  /* Records are fetched once and cached in universityApi; filters, sort and paging run client-side. */
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(new Error('University listing request timed out.')), LISTING_REQUEST_TIMEOUT_MS);
    setState((prev) => ({ ...prev, loading: true }));

    getUniversitiesPayload({ page, search, sort, filters, signal: controller.signal })
      .then((payload) => {
        if (cancelled) return;
        setState({
          loading: false,
          universities: payload?.onlineUniversities || [],
          pagination: payload?.pagination || null,
          facets: payload?.facets || null,
          totalUnfiltered: payload?.totalUnfiltered || 0,
          error: payload?.error || '',
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setState((prev) => ({ ...prev, loading: false, universities: [], error: err?.message || 'The university list could not be loaded.' }));
      })
      .finally(() => clearTimeout(timeoutId));

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [paramsKey, retry]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateParams = (mutate, { push = false } = {}) => {
    const next = new URLSearchParams(params);
    mutate(next);
    setParams(next, { replace: !push, preventScrollReset: true });
  };

  const toggleFilter = (key, id) =>
    updateParams((next) => {
      const values = next.getAll(PARAM[key]);
      next.delete(PARAM[key]);
      (values.includes(id) ? values.filter((v) => v !== id) : [...values, id]).forEach((v) => next.append(PARAM[key], v));
      next.delete('page');
    });

  const resetFilters = () =>
    updateParams((next) => {
      FILTER_KEYS.forEach((key) => next.delete(PARAM[key]));
      next.delete('page');
    });

  const setSort = (value) =>
    updateParams((next) => {
      if (value === 'recommended') next.delete('sort');
      else next.set('sort', value);
      next.delete('page');
    });

  const runSearch = (event) => {
    event?.preventDefault();
    updateParams(
      (next) => {
        const query = searchInput.trim();
        if (query) next.set('q', query);
        else next.delete('q');
        next.delete('page');
      },
      { push: true }
    );
  };

  const gotoPage = (number) => {
    updateParams((next) => (number <= 1 ? next.delete('page') : next.set('page', String(number))), { push: true });
    document.getElementById('results-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const { loading, universities, pagination, facets, totalUnfiltered, error } = state;
  const activeCount = countActiveFilters(filters);
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages || 1;
  const activeChips = FILTER_KEYS.flatMap((key) => filters[key].map((id) => ({ key, id })));

  const filterPanel = (idPrefix) => (
    <UniversityFilters filters={filters} facets={facets} onToggle={toggleFilter} idPrefix={idPrefix} />
  );

  return (
    <div className="pb-24 md:pb-12">
      {/* ===== Heading + search ===== */}
      <section className="border-b border-line bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-5 sm:pt-10 sm:pb-8">
          <h1 className="font-display text-[26px] leading-tight sm:text-4xl font-bold text-ink-900 tracking-[-0.02em]">
            Online universities in India
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] text-ink-500">
            Compare fees, approvals and rankings for {totalUnfiltered || 'over 100'} universities offering online and distance degrees.
          </p>

          <form onSubmit={runSearch} role="search" className="mt-5 flex max-w-2xl gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search universities</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by university name"
                className="h-12 w-full rounded-lg border border-line-strong bg-white pl-10 pr-3 text-[15px] text-ink-900 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
              />
            </label>
            <Button type="submit" size="lg">Search</Button>
          </form>

          <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
            {QUICK_FILTERS.map((q) => (
              <Chip key={q.id} selected={filters[q.key].includes(q.id)} onClick={() => toggleFilter(q.key, q.id)}>
                {q.label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Filters + results ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block" aria-label="Filters">
            <Card className="sticky top-24 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-ink-900">Filters</h2>
                {activeCount > 0 && (
                  <button type="button" onClick={resetFilters} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                    Clear all
                  </button>
                )}
              </div>
              {filterPanel('d')}
            </Card>
          </aside>

          <section aria-labelledby="results-count" className="min-w-0">
            <div
              id="results-top"
              className="sticky top-[60px] z-20 -mx-4 sm:-mx-6 lg:mx-0 mb-3 flex items-center justify-between gap-2 border-b border-line bg-canvas/95 px-4 sm:px-6 lg:px-0 py-2.5 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:py-0 lg:mb-4 scroll-mt-20"
            >
              <p id="results-count" role="status" aria-live="polite" className="text-sm text-ink-700 whitespace-nowrap">
                {loading ? 'Loading universities…' : <><span className="font-semibold text-ink-900">{total}</span> {total === 1 ? 'university' : 'universities'}</>}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setSheetOpen(true)}>
                  <SlidersHorizontal aria-hidden="true" />
                  Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                </Button>
                <select
                  aria-label="Sort by"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 rounded-lg border border-line-strong bg-white pl-3 text-sm text-ink-900 outline-none focus:border-brand-600"
                >
                  {Object.entries(LISTING_SORT_FIELDS).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {activeChips.map(({ key, id }) => (
                  <button
                    key={`${key}-${id}`}
                    type="button"
                    onClick={() => toggleFilter(key, id)}
                    className="inline-flex h-8 items-center gap-1 rounded-full border border-brand-200 bg-brand-50 pl-3 pr-2 text-[13px] text-brand-700 hover:border-brand-600"
                    aria-label={`Remove filter ${filterLabel(key, id)}`}
                  >
                    {filterLabel(key, id)} <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ))}
                <button type="button" onClick={resetFilters} className="text-[13px] font-medium text-ink-500 hover:text-ink-900">
                  Clear all
                </button>
              </div>
            )}

            {loading ? (
              <div className="space-y-3">
                <ResultSkeleton />
                <ResultSkeleton />
                <ResultSkeleton />
              </div>
            ) : error ? (
              <Card className="p-8 text-center">
                <p className="text-ink-700">{error}</p>
                <Button variant="secondary" className="mt-4" onClick={() => setRetry((n) => n + 1)}>
                  <RotateCw aria-hidden="true" /> Try again
                </Button>
              </Card>
            ) : universities.length === 0 ? (
              <Card className="p-8 text-center">
                <SearchX className="mx-auto h-8 w-8 text-ink-400" aria-hidden="true" />
                <p className="mt-3 font-semibold text-ink-900">No universities match</p>
                <p className="mt-1 text-sm text-ink-500">Try removing a filter or searching for a different name.</p>
                {(activeCount > 0 || search) && (
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => updateParams((next) => { FILTER_KEYS.forEach((k) => next.delete(PARAM[k])); next.delete('q'); next.delete('page'); })}
                  >
                    Clear filters and search
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-3">
                {universities.map((u) => (
                  <UniversityResultCard key={u.id} university={u} onOpenBrochure={onOpenBrochure} />
                ))}
              </div>
            )}

            {!loading && !error && totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-3">
                <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => gotoPage(page - 1)}>
                  <ChevronLeft aria-hidden="true" /> Previous
                </Button>
                <span className="text-sm text-ink-500">
                  Page <span className="font-semibold text-ink-900">{page}</span> of {totalPages}
                </span>
                <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => gotoPage(page + 1)}>
                  Next <ChevronRight aria-hidden="true" />
                </Button>
              </nav>
            )}
          </section>
        </div>
      </div>

      {/* ===== Help choosing ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <SectionHeader
          title="How to check an online degree is valid"
          description="Degrees from UGC-entitled universities are equivalent to regular campus degrees for jobs and higher studies. Check these three things before you apply."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {VERIFICATION.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 space-y-12 sm:space-y-16">
        <AcademicExpertCounselingSection id="university-listing-counselling" />
        <BlogsListSection onOpenHelpDesk={onOpenHelpDesk} className="w-full rounded-xl border border-line bg-white p-5 md:p-6" horizontal autoScroll showDescriptionOnMobile fetchLivePosts />
        <UniversitiesFaq onOpenHelpDesk={onOpenHelpDesk} />
      </div>

      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={activeCount ? `Filters (${activeCount})` : 'Filters'}
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={resetFilters} disabled={!activeCount}>Clear</Button>
            <Button block onClick={() => setSheetOpen(false)}>
              {loading ? 'Show results' : `Show ${total} ${total === 1 ? 'university' : 'universities'}`}
            </Button>
          </div>
        }
      >
        {filterPanel('m')}
      </Sheet>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default UniversitiesView;
