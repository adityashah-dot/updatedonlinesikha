import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ChevronDown, MapPin } from 'lucide-react';

const POPULAR_HUBS = [
    { value: 'All India', label: 'All India' },
    { value: 'Delhi/NCR', label: 'Delhi / NCR' },
    { value: 'Bangalore', label: 'Bengaluru / Bangalore' },
    { value: 'Mumbai', label: 'Mumbai / Navi Mumbai' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad / Gandhinagar' },
    { value: 'Jaipur', label: 'Jaipur' },
    { value: 'Chandigarh', label: 'Chandigarh / Mohali' },
    { value: 'Lucknow', label: 'Lucknow / Uttar Pradesh' },
    { value: 'Kochi', label: 'Kochi / Kerala' },
];

const initialsOf = (college) => {
    const source = String(college?.logoLetter || college?.name || 'U');
    return source.slice(0, 2).toUpperCase();
};

export const TopCollegesByLocation = ({ onOpenBrochure, colleges = [] }) => {
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState('All India');
    const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

    const toggleBookmark = (id) => {
        setBookmarkedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filteredColleges = (colleges || []).filter((c) => {
        if (selectedLocation === 'All India') return true;
        const locLower = selectedLocation.toLowerCase().trim();
        const cityLower = String(c.city || '').toLowerCase();
        const stateLower = String(c.state || '').toLowerCase();
        const catLower = String(c.locationCategory || '').toLowerCase();
        if (catLower === locLower || catLower.includes(locLower) || locLower.includes(catLower)) return true;
        if (cityLower === locLower || cityLower.includes(locLower) || locLower.includes(cityLower)) return true;
        if (stateLower === locLower || stateLower.includes(locLower) || locLower.includes(stateLower)) return true;
        if ((locLower.includes('bangalore') || locLower.includes('bengaluru'))
            && (cityLower.includes('bangalore') || cityLower.includes('bengaluru') || catLower.includes('bangalore'))) {
            return true;
        }
        if (locLower.includes('delhi') && (catLower.includes('delhi') || cityLower.includes('delhi') || stateLower.includes('delhi'))) {
            return true;
        }
        if (locLower.includes('mumbai') && (catLower.includes('mumbai') || cityLower.includes('mumbai'))) {
            return true;
        }
        return false;
    });

    const visibleColleges = filteredColleges.slice(0, 6);

    return (<section className="scroll-mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[620px]">
            <p className="text-sm font-medium text-[#115eaf]">By location</p>
            <h2 className="mt-2 text-[26px] font-bold tracking-[-0.015em] text-[#101828] sm:text-3xl">Online universities by city</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#475467]">
              Filter by the city you live in, then check fees and accreditation before shortlisting.
            </p>
          </div>
          <div className="w-full sm:w-[220px]">
            <label htmlFor="location-select" className="mb-1.5 block text-sm font-medium text-[#344054]">Choose a city</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]"/>
              <select id="location-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#d0d5dd] bg-white pl-9 pr-9 text-sm text-[#101828] outline-none transition-colors focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15">
                {POPULAR_HUBS.map((hub) => (<option key={hub.value} value={hub.value}>{hub.label}</option>))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]"/>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleColleges.map((college) => (<article key={college.id} className="flex h-full flex-col rounded-xl border border-[#e4e7ec] bg-white p-5 transition-colors hover:border-[#c7d7ee]">
              <div className="flex items-start gap-3">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e4e7ec] bg-white">
                  <span className="text-[11px] font-semibold text-[#667085]">{initialsOf(college)}</span>
                  {college.logoImage ? (<img src={college.logoImage} alt="" className="absolute inset-0 h-full w-full object-contain p-1.5" onError={(e) => { e.currentTarget.style.display = 'none'; }}/>) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#101828]">{college.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#667085]">
                    <MapPin className="h-3 w-3"/>
                    {[college.city, college.state].filter(Boolean).join(', ') || 'India'}
                  </p>
                </div>
                <button type="button" onClick={() => toggleBookmark(college.id)} aria-pressed={bookmarkedIds.has(college.id)} aria-label={`Save ${college.name}`} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${bookmarkedIds.has(college.id) ? 'text-[#115eaf]' : 'text-[#98a2b3] hover:text-[#475467]'}`}>
                  <Bookmark className="h-4 w-4" fill={bookmarkedIds.has(college.id) ? 'currentColor' : 'none'}/>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#667085]">
                {college.nirf ? <span>{college.nirf}</span> : null}
                {college.courses ? <span>{college.courses}</span> : null}
              </div>

              <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#eaecf0] pt-4">
                <div>
                  <p className="text-xs text-[#667085]">Total fee</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#101828]">{college.totalFees || 'Check with advisor'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={onOpenBrochure} className="text-sm font-medium text-[#475467] hover:text-[#115eaf]">Brochure</button>
                  <button type="button" onClick={() => college.slug && navigate(`/universities/${college.slug}`)} className="inline-flex h-10 items-center justify-center rounded-lg bg-[#115eaf] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#084a8c]">View details</button>
                </div>
              </div>
            </article>))}
        </div>

        {filteredColleges.length === 0 ? (<p className="mt-6 rounded-lg border border-[#e4e7ec] bg-white px-4 py-6 text-center text-sm text-[#667085]">
            No universities listed in this city yet. Talk to an advisor and we will suggest the closest options.
          </p>) : null}
      </section>);
};
