// /public/js/components.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Toast HTML if not present
    if (!document.getElementById('toast')) {
        const toastHTML = `
            <div id="toast" class="fixed top-5 right-5 z-50 transform -translate-y-24 opacity-0 transition-all duration-300 ease-in-out bg-black text-white px-6 py-4 shadow-2xl flex items-center gap-3 border border-gray-700 pointer-events-auto">
                <svg id="toast-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span id="toast-message" class="text-xs font-bold uppercase tracking-widest">Notification</span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
    }

    // 2. Inject Custom Confirm Modal HTML if not present
    if (!document.getElementById('customConfirmModal')) {
        const modalHTML = `
            <div id="customConfirmModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
                <div class="bg-white border border-gray-400 p-8 max-w-md w-full shadow-2xl relative transform transition-all">
                    <!-- X Close Button -->
                    <button id="modalCloseXBtn" class="absolute top-4 right-4 text-gray-400 hover:text-black transition p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h3 id="modalTitle" class="font-newspaper text-2xl font-bold mb-3 pr-6">Are you certain?</h3>
                    <p id="modalMessage" class="text-gray-600 text-sm mb-6 font-serif">This action cannot be undone.</p>
                    
                    <div class="flex justify-end gap-4">
                        <button id="modalCancelBtn" class="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-gray-400 hover:bg-gray-100 transition">Cancel</button>
                        <button id="modalConfirmBtn" class="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-red-700 text-white hover:bg-red-800 transition">Delete Article</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
});

// Global function to trigger the toast anywhere
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

// Global Reusable Confirm Modal Function
function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('customConfirmModal');
        if (!modal) return resolve(false);

        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalMessage').innerText = message;

        modal.classList.remove('hidden');

        const cancelBtn = document.getElementById('modalCancelBtn');
        const confirmBtn = document.getElementById('modalConfirmBtn');
        const closeXBtn = document.getElementById('modalCloseXBtn');

        const handleClose = () => {
            modal.classList.add('hidden');
            cleanup();
            resolve(false);
        };

        const handleConfirm = () => {
            modal.classList.add('hidden');
            cleanup();
            resolve(true);
        };

        const cleanup = () => {
            cancelBtn.removeEventListener('click', handleClose);
            closeXBtn.removeEventListener('click', handleClose);
            confirmBtn.removeEventListener('click', handleConfirm);
        };

        cancelBtn.addEventListener('click', handleClose, { once: true });
        closeXBtn.addEventListener('click', handleClose, { once: true });
        confirmBtn.addEventListener('click', handleConfirm, { once: true });
    });
}