export const JobRequestsEmptyState = () => {
    return (
        <div class="w-full max-w-[1060px] flex flex-col gap-6 font-['Geist']">
            {/* Section Header */}
            <h2 class="text-[#0D121C] text-24px font-medium leading-[38.4px]">
                Job Requests
            </h2>

            {/* Main Container */}
            <div class="w-full min-h-[784px] px-6 py-5 rounded-[20px] border border-[#CDD5DF] bg-white flex flex-col justify-center items-center gap-8 shadow-sm">
                {/* Illustration Container */}
                <div class="w-72 h-72 relative flex items-center justify-center">
                    <svg
                        width="288"
                        height="288"
                        viewBox="0 0 288 288"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Background elements */}
                        <rect y="220" width="288" height="1" fill="#E3E8EF" />
                        <rect
                            x="22"
                            y="32"
                            width="118"
                            height="163"
                            fill="#E3E8EF"
                        />
                        <rect
                            x="146"
                            y="32"
                            width="118"
                            height="163"
                            fill="#E3E8EF"
                        />

                        {/* Person Illustration Simplified to SVG Paths for performance */}
                        <rect
                            x="170"
                            y="89"
                            width="70"
                            height="150"
                            fill="#1376A1"
                        />
                        <rect
                            x="170"
                            y="89"
                            width="67"
                            height="150"
                            fill="white"
                            fill-opacity="0.2"
                        />
                        <rect
                            x="120"
                            y="151"
                            width="29"
                            height="89"
                            fill="#263238"
                        />
                        <rect
                            x="120"
                            y="124"
                            width="25"
                            height="27"
                            fill="#1376A1"
                        />

                        {/* Floating Notification/Search Icon */}
                        <circle cx="203" cy="74" r="10" fill="#1376A1" />
                        <circle
                            cx="203"
                            cy="74"
                            r="7"
                            stroke="white"
                            stroke-opacity="0.4"
                            stroke-width="2"
                        />

                        {/* Ground Lines */}
                        <rect
                            x="32"
                            y="233"
                            width="223"
                            height="13"
                            fill="#F5F5F5"
                        />
                    </svg>
                </div>

                {/* Text Content */}
                <div class="flex flex-col items-center gap-1 max-w-[500px]">
                    <h3 class="text-[#121926] text-[28px] font-medium leading-[44.8px] text-center">
                        No job requests right now!
                    </h3>
                    <p class="text-[#364152] text-lg font-normal leading-[28.8px] text-center">
                        Check back later or make sure your profile is updated
                        for more visibility.
                    </p>
                </div>
            </div>
        </div>
    );
};
