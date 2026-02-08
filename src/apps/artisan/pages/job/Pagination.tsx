import { createSignal } from 'solid-js';

export const Pagination = () => {
    const [currentPage, setCurrentPage] = createSignal(2);

    return (
        <div class="flex justify-center md:justify-end items-center gap-[17px] mt-10 w-full">
            {/* Prev Arrow */}
            <button class="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors group">
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none">
                    <path
                        d="M6 1.5L1.5 6.5L6 11.5"
                        stroke="#0D121C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>

            {/* Page 1 */}
            <button
                onClick={() => setCurrentPage(1)}
                class="w-10 h-10 p-4 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50"
            >
                <span
                    class={`text-xl font-['Geist'] leading-8 ${currentPage() === 1 ? 'text-[#0D121C] font-semibold' : 'text-[#4B5565] font-normal'}`}
                >
                    1
                </span>
            </button>

            {/* Page 2 (Active Style) */}
            <button
                onClick={() => setCurrentPage(2)}
                class={`w-10 h-10 p-4 rounded-full flex items-center justify-center transition-all ${
                    currentPage() === 2
                        ? 'bg-[#0D121C] text-white'
                        : 'hover:bg-gray-50 text-[#4B5565]'
                }`}
            >
                <span class="text-xl font-['Geist'] font-semibold leading-8">
                    2
                </span>
            </button>

            {/* Page 3 */}
            <button
                onClick={() => setCurrentPage(3)}
                class="w-10 h-10 p-4 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50"
            >
                <span
                    class={`text-xl font-['Geist'] leading-8 ${currentPage() === 3 ? 'text-[#0D121C] font-semibold' : 'text-[#4B5565] font-normal'}`}
                >
                    3
                </span>
            </button>

            {/* Next Arrow */}
            <button class="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors group">
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none">
                    <path
                        d="M1 1.5L5.5 6.5L1 11.5"
                        stroke="#0D121C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};
