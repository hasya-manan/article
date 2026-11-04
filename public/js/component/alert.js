

// 1. Inject the Toast HTML automatically into the page body upon load
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById('toast')) {
        const toastHTML = `
            <div id="toast" class="fixed top-5 right-5 z-50 transform -translate-y-24 opacity-0 transition-all duration-300 ease-in-out bg-black text-white px-6 py-4 shadow-2xl flex items-center gap-3 border border-gray-700 pointer-events-none">
                <svg id="toast-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span id="toast-message" class="text-xs font-bold uppercase tracking-widest">Notification</span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
    }
});

// 2. Global function to trigger the toast anywhere
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toastMsg.innerText = message;

    if (isError) {
        toast.classList.remove('bg-black', 'border-gray-700');
        toast.classList.add('bg-red-700', 'border-red-900');
        toastIcon.innerHTML = `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>`;
        toastIcon.className = "h-5 w-5 text-white";
    } else {
        toast.classList.remove('bg-red-700', 'border-red-900');
        toast.classList.add('bg-black', 'border-gray-700');
        toastIcon.className = "h-5 w-5 text-green-400";
    }

    // Slide down into view
    toast.classList.remove('-translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    // Hide automatically after 3 seconds
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-24', 'opacity-0');
    }, 3000);
}