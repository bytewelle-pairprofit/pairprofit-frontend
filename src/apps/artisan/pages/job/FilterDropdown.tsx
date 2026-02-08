import {
    createSignal,
    For,
    Show,
    onMount,
    onCleanup,
    Component,
    Setter,
    Accessor,
} from 'solid-js';

export const FilterDropdown: Component<{
    label: string;
    placeholder: string;
    options: string[];
    selected: Accessor<string[]>;
    onChanged: Setter<string[]>;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef:
        | HTMLDivElement
        | ((el: HTMLDivElement) => void)
        | undefined;

    const handleClickOutside = (e: any) => {
        // @ts-ignore
        if (containerRef && !containerRef.contains(e.target)) setIsOpen(false);
    };

    onMount(() => document.addEventListener('click', handleClickOutside));
    onCleanup(() => document.removeEventListener('click', handleClickOutside));

    const toggleOption = (option: string) => {
        const current = props.selected();
        if (current.includes(option)) {
            props.onChanged(current.filter((i) => i !== option));
        } else {
            props.onChanged([...current, option]);
        }
    };

    const getButtonText = () => {
        const selected = props.selected();
        if (selected.length === 0) return props.placeholder;
        if (selected.length === 1) return selected[0];
        return `${selected[0]} +${selected.length - 1}`;
    };

    return (
        <div class="flex flex-col gap-1 w-full relative" ref={containerRef}>
            <label class="text-[#364152] text-sm font-normal font-['Geist']">
                {props.label}
            </label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen())}
                class="w-full h-10 px-4 bg-white rounded-full border border-[#E3E8EF] flex justify-between items-center hover:bg-gray-50 transition-all"
            >
                <span
                    class={`text-sm truncate ${props.selected().length > 0 ? 'text-[#0D121C] font-medium' : 'text-[#9AA4B2]'}`}
                >
                    {getButtonText()}
                </span>
                <svg
                    class={`transition-transform duration-200 ${isOpen() ? 'rotate-180' : ''}`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                >
                    <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#374151"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
            <Show when={isOpen()}>
                <div class="absolute top-full left-0 z-50 mt-2 w-full md:w-[202px] p-2 bg-white shadow-[0px_12px_32px_rgba(117,117,117,0.16)] rounded-xl flex flex-col gap-1 border border-gray-100">
                    <For each={props.options}>
                        {(option) => {
                            const isActive = () =>
                                props.selected().includes(option);
                            return (
                                <div
                                    onClick={() => toggleOption(option)}
                                    class={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive() ? 'bg-[#EEF2F6]' : 'hover:bg-gray-50'}`}
                                >
                                    <div
                                        class={`w-5 h-5 flex items-center justify-center rounded-[4px] border transition-all ${isActive() ? 'bg-[#1376A1] border-[#1376A1]' : 'border-[#0D121C]'}`}
                                    >
                                        <Show when={isActive()}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                stroke-width="4"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </Show>
                                    </div>
                                    <span class="text-[#202939] text-sm font-['Geist'] whitespace-nowrap">
                                        {option}
                                    </span>
                                </div>
                            );
                        }}
                    </For>
                </div>
            </Show>
        </div>
    );
};
