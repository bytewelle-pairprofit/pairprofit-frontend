import {
    createSignal,
    createMemo,
    For,
    Show,
    onMount,
    Switch,
    Match,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { FilterDropdown } from './FilterDropdown';
import L from 'leaflet';
import { JobDetailPage } from './JobDetail';
import { JobRequestsEmptyState } from './EmptyState';

export const JobRequestsPage = () => {
    const [activeTab, setActiveTab] = createSignal('Best Matches');
    const [selectedServices, setSelectedServices] = createSignal<string[]>([]);
    const [selectedLocations, setSelectedLocations] = createSignal<string[]>(
        [],
    );
    const [selectedPrices, setSelectedPrices] = createSignal<string[]>([]);
    const [selectedTimelines, setSelectedTimelines] = createSignal<string[]>(
        [],
    );

    // Pagination State
    const [currentPage, setCurrentPage] = createSignal(1);
    const itemsPerPage = 4; // Change this to 10 or 20 for production
    const generateMockJobs = (count: number) => {
        const services = [
            'Carpenter',
            'Plumber',
            'Electrician',
            'Painter',
            'AC Technician',
        ];
        const locations = [
            { name: 'Lekki', lat: 6.4698, lng: 3.5852 },
            { name: 'Ikeja', lat: 6.592, lng: 3.3422 },
            { name: 'Victoria Island', lat: 6.4281, lng: 3.4219 },
            { name: 'Yaba', lat: 6.5143, lng: 3.3858 },
            { name: 'Surulere', lat: 6.5, lng: 3.35 },
        ];
        const timelines = [
            'Urgent',
            'Within 3 days',
            'Within a week',
            'Flexible',
        ];
        const tabs = ['Best Matches', 'Recent Jobs', 'Saved jobs'];

        return Array.from({ length: count }, (_, i) => {
            const service =
                services[Math.floor(Math.random() * services.length)];
            const location =
                locations[Math.floor(Math.random() * locations.length)];

            return {
                id: i + 1,
                title: `${service} needed for ${service.toLowerCase()} work`,
                budget: `$${Math.floor(Math.random() * 200) + 20}`,
                location: location.name,
                lat: location.lat + (Math.random() - 0.5) * 0.01, // Jitter for map markers
                lng: location.lng + (Math.random() - 0.5) * 0.01,
                posted: `${Math.floor(Math.random() * 24)}h ago`,
                timeline:
                    timelines[Math.floor(Math.random() * timelines.length)],
                service: service,
                tab: tabs[Math.floor(Math.random() * tabs.length)],
                hasImage: Math.random() > 0.5,
                isFavorited: false,
            };
        });
    };
    const [jobs, setJobs] = createStore(generateMockJobs(20));
    const [mapSearch, setMapSearch] = createSignal('');
    const toggleFavorite = (jobId: number) => {
        setJobs(
            (job) => job.id === jobId,
            'isFavorited',
            (val) => !val,
        );
    };

    const [viewMode, setViewMode] = createSignal('list'); // 'list' or 'map'
    // 1. Get ALL jobs that match current filters
    const filteredJobsCount = createMemo(() => {
        return jobs.filter((job) => {
            const matchTab = job.tab === activeTab();
            const matchService =
                selectedServices().length === 0 ||
                selectedServices().includes(job.service);
            const matchLocation =
                selectedLocations().length === 0 ||
                selectedLocations().includes(job.location);
            const matchTimeline =
                selectedTimelines().length === 0 ||
                selectedTimelines().includes(job.timeline);
            return matchTab && matchService && matchLocation && matchTimeline;
        });
    });
    // 2. Calculate Total Pages
    const totalPages = createMemo(() =>
        Math.ceil(filteredJobsCount().length / itemsPerPage),
    );
    const [selectedJob, setSelectedJob] = createSignal(null);

    // 3. Get only the jobs for the CURRENT page
    const paginatedJobs = createMemo(() => {
        const start = (currentPage() - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredJobsCount().slice(start, end);
    });

    const pathData =
        'M10.0337 16.7085C9.70417 16.3812 9.44311 15.9916 9.2657 15.5624C9.08829 15.1332 8.99808 14.6729 9.00033 14.2085C9.00033 13.2692 9.37346 12.3684 10.0377 11.7042C10.7018 11.04 11.6027 10.6668 12.542 10.6668C13.8587 10.6668 15.0087 11.3835 15.617 12.4502H16.5503C16.8596 11.9077 17.3071 11.4569 17.8472 11.1437C18.3874 10.8304 19.0009 10.6659 19.6253 10.6668C20.5646 10.6668 21.4655 11.04 22.1297 11.7042C22.7939 12.3684 23.167 13.2692 23.167 14.2085C23.167 15.1835 22.7503 16.0835 22.1337 16.7085L16.0837 22.7502L10.0337 16.7085ZM22.717 17.3002C23.5087 16.5002 24.0003 15.4168 24.0003 14.2085C24.0003 13.0482 23.5394 11.9354 22.7189 11.1149C21.8984 10.2944 20.7856 9.83351 19.6253 9.83351C18.167 9.83351 16.8753 10.5418 16.0837 11.6418C15.6796 11.0806 15.1475 10.6238 14.5316 10.3093C13.9156 9.99479 13.2336 9.83351 12.542 9.83351C11.3817 9.83351 10.2689 10.2944 9.4484 11.1149C8.62793 11.9354 8.16699 13.0482 8.16699 14.2085C8.16699 15.4168 8.65866 16.5002 9.45033 17.3002L16.0837 23.9335L22.717 17.3002Z';

    // Leaflet Map Logic
    let mapContainer: HTMLDivElement | undefined;
    let mapInstance: L.Map;

    const handleJobClick = (job: any) => {
        // 1. Pan the map
        if (viewMode() === 'map' && mapInstance) {
            mapInstance.flyTo([job.lat, job.lng], 14, { animate: true });

            // 2. Automatically open the popup with the button
            L.popup()
                .setLatLng([job.lat, job.lng])
                .setContent(
                    `
                    <div class="p-2 font-['Geist']">
                    <h4 class="font-bold text-sm">${job.title}</h4>
                    <p class="text-xs text-gray-600 mb-2">${job.budget}</p>
                    <button 
                        onclick="window.dispatchEvent(new CustomEvent('jobAction', {detail: ${job.id}}))"
                        class="w-full bg-[#0D121C] text-white text-[10px] py-1 px-2 rounded hover:bg-gray-800"
                    >
                        View Details
                    </button>
                    </div>
                `,
                )
                .openOn(mapInstance);
        }
        setSelectedJob(job);
    };

    const focusJobOnMap = (job: any) => {
        if (viewMode() === 'list') setViewMode('map'); // Switch on mobile
        setTimeout(() => {
            if (!mapInstance) initMap();
            mapInstance.flyTo([job.lat, job.lng], 14);

            L.popup()
                .setLatLng([job.lat, job.lng])
                .setContent(
                    `
                    <div class="p-2 font-['Geist']">
                        <p class="font-bold text-sm mb-1">${job.title}</p>
                        <button 
                        onclick="window.dispatchEvent(new CustomEvent('mapJobAction', {detail: ${job.id}}))"
                        class="w-full bg-[#0D121C] text-white text-xs py-2 rounded-lg mt-2 font-medium"
                        >
                        View Details
                        </button>
                    </div>
                `,
                )
                .openOn(mapInstance);
        }, 100);
    };

    const createPriceIcon = (price: string) =>
        L.divIcon({
            className: 'custom-price-marker',
            html: `<div style="background: #1376A1; color: white; padding: 4px 12px; border-radius: 99px; font-weight: 700; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); white-space: nowrap;">
            ${price}
            </div>`,
            iconSize: [60, 32],
            iconAnchor: [30, 16],
        });

    window.addEventListener('mapJobAction', (e: any) => {
        console.log('Job ID clicked from map:', e.detail);
        // Add your logic here (e.g., navigate to job page)
        setSelectedJob(e);
    });

    const initMap = () => {
        if (mapInstance) return;
        mapInstance = L.map(mapContainer!).setView([6.4698, 3.5852], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
        }).addTo(mapInstance);

        // Add Markers for jobs
        jobs.forEach((job) => {
            L.marker([job.lat, job.lng], {
                icon: createPriceIcon(job.budget),
            })
                .addTo(mapInstance)
                .bindPopup(
                    `
                    <div class="p-2 font-['Geist']">
                    <h4 class="font-bold text-sm">${job.title}</h4>
                    <p class="text-xs text-gray-600 mb-2">${job.budget}</p>
                    <button 
                        // onclick="window.dispatchEvent(new CustomEvent('jobAction', {detail: ${job.id}}))"
                        onClick="console.log(12334344)"
                        class="w-full bg-[#0D121C] text-white text-[10px] py-1 px-2 rounded hover:bg-gray-800"
                    >
                        View Details
                    </button>
                    </div>
                `,
                )
                .on('click', () => focusJobOnMap(job));
        });
    };

    // Re-size map when toggled
    onMount(() => {
        if (viewMode() === 'map') initMap();
    });

    const toggleView = () => {
        setViewMode((v) => (v === 'list' ? 'map' : 'list'));
        if (viewMode() === 'map') {
            setTimeout(initMap, 100); // Small timeout to ensure container is rendered
        }
    };

    return (
        <Switch
            fallback={
                <div class="mx-auto p-4 md:p-8 flex flex-col min-h-screen font-['Geist'] bg-white">
                    {/* Header */}
                    <section class="flex flex-col gap-6 mb-10">
                        <div class="flex justify-between items-center">
                            <h1 class="text-[#0D121C] text-2xl font-medium">
                                Job Requests
                            </h1>
                            <button
                                onClick={toggleView}
                                class="text-[#1376A1] text-xl font-medium hover:underline"
                            >
                                {viewMode() === 'list'
                                    ? 'Map View'
                                    : 'List View'}
                            </button>
                        </div>
                        <div class="flex flex-col lg:flex-row lg:items-center gap-6">
                            <span class="text-[#4B5565] text-base font-medium whitespace-nowrap">
                                Filter by
                            </span>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                <FilterDropdown
                                    label="Services"
                                    placeholder="Services"
                                    options={[
                                        'Carpentry',
                                        'Plumbing',
                                        'Electrical',
                                    ]}
                                    selected={selectedServices}
                                    onChanged={(v) => {
                                        setSelectedServices(v);
                                        setCurrentPage(1);
                                    }}
                                />
                                <FilterDropdown
                                    label="Location"
                                    placeholder="Location"
                                    options={[
                                        'Lekki',
                                        'Ikeja',
                                        'Victoria Island',
                                    ]}
                                    selected={selectedLocations}
                                    onChanged={(v) => {
                                        setSelectedLocations(v);
                                        setCurrentPage(1);
                                    }}
                                />
                                <FilterDropdown
                                    label="Prices"
                                    placeholder="All prices"
                                    options={[
                                        'Under $50',
                                        '$50 - $100',
                                        'Over $100',
                                    ]}
                                    selected={selectedPrices}
                                    onChanged={(v) => {
                                        setSelectedPrices(v);
                                        setCurrentPage(1);
                                    }}
                                />
                                <FilterDropdown
                                    label="Timeline"
                                    placeholder="All timelines"
                                    options={[
                                        'Urgent',
                                        'Within 3 days',
                                        'Within a week',
                                        'Within a month',
                                        'Flexible',
                                    ]}
                                    selected={selectedTimelines}
                                    onChanged={(v) => {
                                        setSelectedTimelines(v);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Tabs */}
                    <section class="flex-1 flex flex-col gap-8">
                        <div class="flex border-b border-[#CDD5DF] overflow-x-auto no-scrollbar">
                            <For
                                each={[
                                    'Best Matches',
                                    'Recent Jobs',
                                    'Saved jobs',
                                ]}
                            >
                                {(tab) => (
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        class={`px-4 py-2 text-base ${activeTab() === tab ? 'border-b-2 border-[#1376A1] font-medium' : 'text-[#364152]'}`}
                                    >
                                        {tab}
                                    </button>
                                )}
                            </For>
                        </div>

                        {/* Main Content Area: Flex layout for Side-by-Side */}
                        {/* <div class="flex flex-col lg:flex-row gap-6 flex-1 min-h-0"> */}
                        <div class="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
                            {/* Left Side: Job List */}
                            {/* <div
                        class={`flex flex-col gap-5 transition-all duration-300 ${viewMode() === 'map' ? 'lg:w-[60%]' : 'w-full'}`}
                    > */}
                            <section
                                class="flex flex-col gap-4 transition-all duration-500"
                                // Hide list on mobile if we are in map mode to save space
                                classList={{
                                    'hidden lg:flex lg:w-[55%]':
                                        viewMode() === 'map',
                                    'w-full': viewMode() === 'list',
                                }}
                            >
                                <For each={paginatedJobs()}>
                                    {(job) => (
                                        <div
                                            onClick={() => handleJobClick(job)}
                                        >
                                            <div
                                                class={`p-5 rounded-xl border flex gap-4 transition-all ${job.isFavorited ? 'bg-[#EEF2F6] border-[#CDD5DF]' : 'bg-white border-gray-100 shadow-sm'}`}
                                            >
                                                <Show when={job.hasImage}>
                                                    <div class="w-[120px] h-[120px] bg-[#D0E4EC] rounded-lg shrink-0" />
                                                </Show>
                                                <div class="flex-1">
                                                    <h3 class="text-[#0D121C] text-lg font-medium leading-tight mb-2">
                                                        {job.title}
                                                    </h3>
                                                    <div class="text-[#697586] text-sm mb-2">
                                                        Est Budget: {job.budget}{' '}
                                                        - Location:{' '}
                                                        {job.location}
                                                    </div>
                                                    <p class="text-[#202939] text-sm line-clamp-2">
                                                        Hello, we are looking
                                                        for a professional to
                                                        fix our wardrobe...
                                                    </p>
                                                </div>
                                                <div class="flex flex-col justify-start">
                                                    <button
                                                        onClick={() =>
                                                            toggleFavorite(
                                                                job.id,
                                                            )
                                                        }
                                                        class="self-center"
                                                    >
                                                        <svg
                                                            width="33"
                                                            height="33"
                                                            viewBox="0 0 33 33"
                                                        >
                                                            <rect
                                                                x="0.5"
                                                                y="0.5"
                                                                width="32"
                                                                height="32"
                                                                rx="16"
                                                                stroke="#CDD5DF"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d={pathData}
                                                                fill={
                                                                    job.isFavorited
                                                                        ? '#1376A1'
                                                                        : '#9AA4B2'
                                                                }
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </For>

                                {/* Pagination (Inside left col when map is active) */}
                                <div class="mt-auto py-6 flex justify-center lg:justify-start items-center gap-4">
                                    <button
                                        disabled={currentPage() === 1}
                                        onClick={() =>
                                            setCurrentPage((p) => p - 1)
                                        }
                                        class="disabled:opacity-20 underline text-sm"
                                    >
                                        Prev
                                    </button>
                                    <For
                                        each={Array.from(
                                            { length: totalPages() },
                                            (_, i) => i + 1,
                                        )}
                                    >
                                        {(p) => (
                                            <button
                                                onClick={() =>
                                                    setCurrentPage(p)
                                                }
                                                class={`w-10 h-10 rounded-full ${currentPage() === p ? 'bg-[#0D121C] text-white' : 'text-gray-500'}`}
                                            >
                                                {p}
                                            </button>
                                        )}
                                    </For>
                                    <button
                                        disabled={
                                            currentPage() === totalPages()
                                        }
                                        onClick={() =>
                                            setCurrentPage((p) => p + 1)
                                        }
                                        class="disabled:opacity-20 underline text-sm"
                                    >
                                        Next
                                    </button>
                                </div>
                            </section>

                            {/* Right Side: Map Container */}
                            <Show when={viewMode() === 'map'}>
                                <div class="lg:w-[40%] h-[400px] lg:h-auto min-h-[500px] relative rounded-xl overflow-hidden border border-gray-200">
                                    <div
                                        ref={mapContainer!}
                                        class="w-full h-full z-0"
                                    />

                                    {/* Map Overlay: Search Checkbox */}
                                    <div class="absolute top-4 left-4 z-[1001] bg-white p-3 rounded-lg shadow-md flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked
                                            class="w-4 h-4 accent-black"
                                        />
                                        <span class="text-sm font-medium">
                                            Search as I move the map
                                        </span>
                                    </div>

                                    <div class="absolute top-4 left-4 right-4 z-[1001] flex flex-col gap-2">
                                        <div class="relative w-full lg:max-w-[320px]">
                                            <input
                                                type="text"
                                                placeholder="Search location..."
                                                value={mapSearch()}
                                                onInput={(e) =>
                                                    setMapSearch(
                                                        e.currentTarget.value,
                                                    )
                                                }
                                                class="w-full h-12 pl-12 pr-4 bg-white rounded-xl shadow-lg border-none focus:ring-2 focus:ring-[#1376A1]"
                                            />
                                            <div class="absolute left-4 top-3.5 text-gray-400">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* "SEARCH AS I MOVE" CHECKBOX */}
                                        <div class="bg-white/90 backdrop-blur-sm self-start px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="moveSearch"
                                                checked
                                                class="w-4 h-4 rounded accent-[#1376A1]"
                                            />
                                            <label
                                                for="moveSearch"
                                                class="text-xs font-semibold text-[#364152]"
                                            >
                                                Search as I move the map
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Show>
                        </div>
                    </section>
                </div>
            }
        >
            <Match when={filteredJobsCount().length === 0}>
                <JobRequestsEmptyState />
            </Match>
            <Match when={filteredJobsCount().length !== 0 && selectedJob()}>
                <JobDetailPage
                    job={selectedJob()}
                    onBack={() => setSelectedJob(null)}
                />
            </Match>
        </Switch>
    );
};
