import { For, createSignal, onMount, Show } from 'solid-js';
import L from 'leaflet';
import { Portal } from 'solid-js/web';
import { SuccessPage } from '../../../../pages/general/login/success_page';

const JobHeaderSection = (props: any) => {
    // Destructure props for easy access, with defaults based on your HTML
    const job = () => ({
        title: props.title || 'Carpenter needed for wardrobe repair',
        category: props.category || 'Electrical', // Note: HTML says Electrical but Title says Carpenter
        subCategory: props.subCategory || 'Home services',
        address:
            props.address || '2 Admiralty way, Lekki-Phase 1, Lagos, Nigeria',
        timeline: props.timeline || 'Within 3 days',
        budget: props.budget || '$50',
        postedAt: props.postedAt || '2 days ago',
    });

    return (
        <div class="w-full flex flex-col md:flex-row justify-between items-start gap-6 font-['Geist'] pb-8">
            {/* --- Job Information --- */}
            <div class="flex flex-col gap-4 max-w-[577px]">
                {/* Title */}
                <h1 class="text-[#0D121C] text-2xl font-medium leading-[38.4px]">
                    {job().title}
                </h1>

                {/* Breadcrumbs & Metadata */}
                <div class="flex flex-col gap-2">
                    {/* Categories and Address */}
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="text-[#4B5565] text-base font-normal leading-relaxed">
                            {job().category}
                        </span>
                        <div class="w-2 h-2 bg-[#D1D1D1] rounded-full" />
                        <span class="text-[#4B5565] text-base font-normal leading-relaxed">
                            {job().subCategory}
                        </span>
                        <div class="w-2 h-2 bg-[#D1D1D1] rounded-full" />
                        <span class="text-[#4B5565] text-base font-normal leading-relaxed">
                            {job().address}
                        </span>
                    </div>

                    {/* Timeline, Budget, and Timestamp */}
                    <div class="flex flex-wrap items-center gap-4">
                        <div class="text-base font-normal leading-relaxed">
                            <span class="text-[#4B5565]">Timeline:</span>{' '}
                            <span class="text-[#34A853] font-medium">
                                {job().timeline}
                            </span>
                        </div>

                        <div class="text-base font-normal leading-relaxed">
                            <span class="text-[#4B5565]">Budget:</span>{' '}
                            <span class="text-[#1376A1] font-medium">
                                {job().budget}
                            </span>
                        </div>

                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-[#D1D1D1] rounded-full" />
                            <span class="text-[#4B5565] text-base font-normal leading-relaxed">
                                Posted {job().postedAt}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div class="flex items-center gap-[21px]">
                <button
                    onClick={() => props.onApply?.()}
                    class="px-4 py-3 bg-[#1376A1] text-white rounded-lg text-base font-semibold leading-relaxed hover:bg-[#0e5a7b] transition-all active:scale-95 shadow-sm"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

const ClientProfileSection = (props: any) => {
    // Use props for dynamic data, or defaults for the specific part you shared
    const jobImages = props.images || ['https://placehold.co/504x338'];
    const [currentImgIndex, setCurrentImgIndex] = createSignal(0);

    return (
        <div class="w-full flex flex-col xl:flex-row justify-start items-center gap-[40px] font-['Geist'] pb-8">
            {/* --- Image Carousel Section --- */}
            <div class="flex justify-start items-center gap-5">
                {/* Previous Arrow */}
                <button
                    onClick={() =>
                        setCurrentImgIndex((prev) =>
                            prev > 0 ? prev - 1 : jobImages.length - 1,
                        )
                    }
                    class="w-11 h-11 bg-[#EEF2F6] rounded-[40px] flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#121926"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Main Image */}
                <div class="relative">
                    <img
                        src={jobImages[currentImgIndex()]}
                        alt="Job visual"
                        class="w-full max-w-[504px] h-[338px] object-cover rounded-xl shadow-sm"
                    />
                </div>

                {/* Next Arrow */}
                <button
                    onClick={() =>
                        setCurrentImgIndex((prev) =>
                            prev < jobImages.length - 1 ? prev + 1 : 0,
                        )
                    }
                    class="w-11 h-11 bg-[#EEF2F6] rounded-[40px] flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#121926"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* --- Client Card Section --- */}
            <div class="w-full p-6 bg-white rounded-xl border border-gray-100 flex flex-col gap-5 shadow-sm">
                <div class="flex flex-col gap-4">
                    {/* Client Identity */}
                    <div class="flex items-start gap-3">
                        <img
                            src="https://placehold.co/80x80"
                            alt="Stanley Agu"
                            class="w-20 h-20 rounded-[70px] object-cover"
                        />
                        <div class="flex flex-col gap-1 flex-1">
                            <div class="flex justify-between items-center w-full">
                                <span class="text-[#1E1E1E] text-base font-semibold leading-relaxed">
                                    Stanley Agu
                                </span>
                                <div class="px-2 py-1 bg-[rgba(52,168,83,0.12)] rounded-[20px] flex items-center justify-center">
                                    <span class="text-[#34A853] text-xs font-normal">
                                        Verified
                                    </span>
                                </div>
                            </div>
                            <span class="text-[#697586] text-sm font-medium">
                                Joined May 2021
                            </span>
                        </div>
                    </div>

                    {/* Client Stats */}
                    <div class="flex flex-col gap-2">
                        <div class="text-sm">
                            <span class="text-[#121926] font-medium">12 </span>
                            <span class="text-[#697586] font-medium">
                                reviews
                            </span>
                        </div>
                        <div class="text-[#697586] text-sm font-medium">
                            Response rate: 95%
                        </div>
                        <div class="text-[#697586] text-sm font-medium">
                            Average response: within an hour
                        </div>
                        <div class="text-[#697586] text-sm font-medium leading-tight">
                            Language: English, German, Spanish
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div class="flex items-center gap-4">
                    <button class="flex-1 h-12 bg-[#1376A1] text-white rounded-lg font-semibold text-base hover:bg-[#0e5a7b] transition-all active:scale-95">
                        Start chat
                    </button>
                    <button class="flex-1 h-12 border border-[#1376A1] text-[#1376A1] rounded-lg font-semibold text-base hover:bg-blue-50 transition-all active:scale-95">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
};

const JobMainContent = () => {
    const reviews = [
        {
            name: 'Shayna',
            date: 'November 2021',
            text: 'Easy to work with, gave clear access and instructions.',
            rating: 5,
        },
        {
            name: 'Jose',
            date: 'March 2022',
            text: 'Easy to work with, gave clear access and instructions.',
            rating: 5,
        },
        {
            name: 'Luke',
            date: 'August 2022',
            text: 'Easy to work with, gave clear access and instructions.',
            rating: 5,
        },
    ];

    return (
        <div class="flex flex-col gap-10 w-full max-w-[632px] font-['Geist']">
            {/* --- Job Overview Card --- */}
            <div class="bg-white p-6 rounded-xl flex flex-col gap-8 shadow-sm border border-gray-50">
                <div class="flex flex-col gap-4">
                    <h2 class="text-[#121926] text-xl font-semibold">
                        Job Overview
                    </h2>
                    <p class="text-[#364152] text-base leading-relaxed">
                        We need a certified electrician to inspect and fix
                        faulty wiring in a 3-bedroom apartment. The work
                        includes checking sockets, replacing damaged cables, and
                        installing two extra sockets in the living room. Please
                        indicate experience with similar jobs and estimated
                        time.
                    </p>
                </div>

                <div class="flex flex-wrap gap-10">
                    {/* Attachments */}
                    <div class="flex flex-col gap-4">
                        <h3 class="text-[#4B5565] text-lg font-medium">
                            Attachments
                        </h3>
                        <div class="flex gap-3">
                            {['Wiring_photo.jpg', 'floor_plan.pdf'].map(
                                (file) => (
                                    <div class="flex items-center gap-2 bg-[#EEF2F6] px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#9AA4B2"
                                            stroke-width="2"
                                        >
                                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                                        </svg>
                                        <span class="text-[#697586] text-sm">
                                            {file}
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div class="flex flex-col gap-4">
                        <h3 class="text-[#4B5565] text-lg font-medium">
                            Skills / Tags
                        </h3>
                        <div class="flex gap-3">
                            {['Wiring', 'Repair', 'Emergency'].map((tag) => (
                                <div class="bg-[#EEF2F6] px-3 py-2 rounded-lg">
                                    <span class="text-[#697586] text-sm">
                                        {tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button class="text-[#1376A1] text-left font-medium hover:underline">
                    Show full details
                </button>
            </div>

            {/* --- Client Reviews Card --- */}
            <div class="bg-white p-6 rounded-xl flex flex-col gap-5 shadow-sm border border-gray-50">
                <div class="flex justify-between items-center">
                    <h2 class="text-[#121926] text-xl font-semibold">
                        Client Reviews
                    </h2>
                    <span class="text-[#4B5565] text-sm">12 reviews</span>
                </div>

                <div class="flex flex-col gap-4">
                    <For each={reviews}>
                        {(rev) => (
                            <div class="p-4 rounded-xl border border-[#CDD5DF] flex flex-col gap-3">
                                <div class="flex justify-between items-start">
                                    <div class="flex items-center gap-4">
                                        <img
                                            src="https://placehold.co/60x60"
                                            class="w-[60px] h-[60px] rounded-full"
                                        />
                                        <div>
                                            <p class="text-[#0D121C] font-medium">
                                                {rev.name}
                                            </p>
                                            <p class="text-[#4B5565] text-sm">
                                                {rev.date}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Star Rating */}
                                    <div class="flex gap-1">
                                        <For each={[...Array(5)]}>
                                            {() => (
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="#FDD835"
                                                >
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            )}
                                        </For>
                                    </div>
                                </div>
                                <p class="text-[#202939] text-base">
                                    {rev.text}
                                </p>
                            </div>
                        )}
                    </For>
                </div>
                <button class="text-[#1376A1] font-semibold mt-2 hover:underline">
                    See all reviews
                </button>
            </div>
        </div>
    );
};

const ApplyJobModal = (props: any) => {
    const [proposal, setProposal] = createSignal('');

    // Close on backdrop click
    const handleBackdropClick = (e: any) => {
        if (e.target === e.currentTarget) props.onClose();
    };

    return (
        <Show when={props.isOpen}>
            <Portal>
                {/* Backdrop: Grey overlay beneath */}
                <div
                    onClick={handleBackdropClick}
                    class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#121926]/60 backdrop-blur-sm p-4"
                >
                    {/* Modal Card */}
                    <div
                        class="w-full max-w-[655px] bg-white rounded-[16px] p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 class="text-[#121926] text-xl font-semibold font-['Geist'] leading-8">
                            Apply for this Job
                        </h2>

                        <div class="flex flex-col gap-8">
                            <div class="flex flex-col gap-5">
                                {/* Proposal Textarea */}
                                <div class="relative w-full h-[170px]">
                                    <textarea
                                        value={proposal()}
                                        onInput={(e) =>
                                            setProposal(e.currentTarget.value)
                                        }
                                        placeholder="Write a short proposal"
                                        class="w-full h-full p-3 rounded-lg border border-[#CDD5DF] text-[#121926] text-sm font-['Geist'] focus:outline-none focus:border-[#1376A1] focus:ring-1 focus:ring-[#1376A1] resize-none placeholder:text-[#697586]"
                                    />
                                </div>

                                {/* Image Upload Placeholder */}
                                <button class="w-full h-[115px] p-3 rounded-lg border border-[#CDD5DF] border-dashed flex flex-col justify-center items-center gap-3 hover:bg-gray-50 transition-colors group">
                                    <span class="text-[#697586] text-sm font-['Geist'] group-hover:text-[#1376A1]">
                                        Add image to your proposal
                                    </span>
                                    <div class="w-4 h-4 relative">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#9AA4B2"
                                            stroke-width="2"
                                            class="group-hover:stroke-[#1376A1]"
                                        >
                                            <rect
                                                x="3"
                                                y="3"
                                                width="18"
                                                height="18"
                                                rx="2"
                                                ry="2"
                                            />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                    </div>
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div class="flex justify-end items-center gap-6">
                                <button
                                    onClick={props.onClose}
                                    class="px-4 py-3 rounded-lg border border-[#1376A1] text-[#1376A1] text-base font-semibold font-['Geist'] hover:bg-blue-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        props.onSubmit(proposal());
                                        props.onClose();
                                        props.setIsSuccess(true);
                                        console.log(
                                            'setIsSuccesssetIsSuccesssetIsSuccess',
                                        );
                                    }}
                                    class="px-4 py-3 bg-[#1376A1] text-white rounded-lg text-base font-semibold font-['Geist'] hover:bg-[#0e5a7b] transition-all active:scale-95 shadow-md shadow-blue-900/10"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        </Show>
    );
};

const JobSidebar = () => {
    let mapContainerRef: HTMLDivElement | undefined;

    onMount(() => {
        // Standard Leaflet Init
        const map = L.map(mapContainerRef!, { zoomControl: false }).setView(
            [6.4698, 3.5852],
            14,
        );

        // Light-themed tiles for industrial UI consistency
        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        ).addTo(map);

        // Circular "Area" indicator to protect client privacy
        L.circle([6.4698, 3.5852], {
            color: '#1376A1',
            fillColor: '#1376A1',
            fillOpacity: 0.2,
            radius: 500,
        }).addTo(map);
    });

    const actions = [
        {
            label: 'Save job',
            icon: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z',
        },
        { label: 'Report job', icon: 'M12 2L2 7l10 5 10-5-10-5z' },
        {
            label: 'Share',
            icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
        },
    ];

    return (
        <div class="flex flex-col gap-10 w-full font-['Geist']">
            {/* --- Map Card --- */}
            <div class="bg-white p-6 rounded-xl flex flex-col gap-6 shadow-sm border border-gray-50">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <h2 class="text-[#121926] text-xl font-semibold">
                            Location
                        </h2>
                        <span class="text-[#9AA4B2] text-xs font-normal">
                            (Only available if turned on by client)
                        </span>
                    </div>
                    <p class="text-[#4B5565] text-base leading-relaxed">
                        2 Admiralty way, Lekki-Phase 1, Lagos, Nigeria
                    </p>
                </div>

                {/* Leaflet Map Div */}
                <div
                    ref={mapContainerRef}
                    class="w-full h-[480px] rounded-lg overflow-hidden border border-gray-100 z-0"
                />
            </div>

            {/* --- Quick Actions Card --- */}
            <div class="bg-white p-6 rounded-xl flex flex-col gap-5 shadow-sm border border-gray-50">
                <h2 class="text-[#121926] text-xl font-semibold">
                    Quick actions
                </h2>
                <div class="flex flex-col gap-4">
                    <For each={actions}>
                        {(action) => (
                            <button class="w-full flex items-center gap-4 p-3 rounded-lg border border-[#CDD5DF] text-[#4B5565] hover:bg-gray-50 transition-all active:scale-95">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d={action.icon} />
                                </svg>
                                <span class="text-base">{action.label}</span>
                            </button>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
};

const ThingsToKnow = () => {
    // Data structure to handle the three columns of rules
    const guidelines = [
        [
            'Bring your own tools',
            'Show proof of certification',
            'Payment released after inspection',
        ],
        [
            'Health & safety: Follow basic precautions',
            'COVID-19: Masks encouraged',
            'Flexible schedule',
        ],
        [
            'Cancellation: Clients may cancel before start',
            'Dispute process available',
            'Local travel fee negotiation',
        ],
    ];

    return (
        <div class="w-full self-stretch px-5 py-6 bg-white rounded-xl flex flex-col justify-start items-start gap-5 font-['Geist'] shadow-sm border border-gray-50">
            {/* Section Title */}
            <h2 class="self-stretch text-[#121926] text-xl font-semibold leading-8">
                Things to know
            </h2>

            {/* Grid Layout for Guidelines */}
            <div class="self-stretch flex flex-wrap lg:flex-nowrap justify-start items-start gap-11">
                <For each={guidelines}>
                    {(column) => (
                        <div class="flex flex-col justify-start items-start gap-6 min-w-[215px] flex-1">
                            <For each={column}>
                                {(item) => (
                                    <div class="flex justify-start items-center gap-3 self-stretch">
                                        {/* Bullet Point Circle */}
                                        <div class="w-2 h-2 bg-[#9AA4B2] rounded-full shrink-0" />

                                        {/* Guideline Text */}
                                        <div class="flex flex-col justify-center text-[#4B5565] text-base font-normal leading-relaxed">
                                            {item}
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export const JobDetailPage = (props: any) => {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [isSuccess, setIsSuccess] = createSignal(false);
    const handleApply = (proposalData: any) => {
        console.log('Applying with:', proposalData);
        // Your API call logic here
    };

    return (
        <div class="mx-auto p-4 md:p-8 font-['Geist'] bg-white min-h-screen">
            {isSuccess() && (
                <SuccessPage
                    isOpen={isSuccess()}
                    handleAction={() => setIsSuccess(false)}
                    texts={{
                        title: 'Success!',
                        details: 'You have successfully applied to this job',
                        action: 'Close',
                    }}
                />
            )}

            <JobHeaderSection onApply={() => setIsModalOpen(true)} />
            <ApplyJobModal
                isOpen={isModalOpen()}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleApply}
                setIsSuccess={setIsSuccess}
            />
            {/* 1. Header Navigation */}
            <button
                onClick={props.onBack}
                class="flex items-center gap-2 text-[#667085] hover:text-[#1376A1] transition-colors mb-6 group"
            >
                <svg
                    class="group-hover:-translate-x-1 transition-transform"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M15.8333 10H4.16663M4.16663 10L9.16663 15M4.16663 10L9.16663 5"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span class="font-medium text-lg">Back to jobs</span>
            </button>
            {/* <JobHeaderSection /> */}
            <ClientProfileSection />
            <div class="w-full flex flex-col md:flex-row justify-between items-start gap-6 font-['Geist'] pb-8">
                <JobMainContent />
                <JobSidebar />
            </div>
            <ThingsToKnow />
        </div>
    );
};
