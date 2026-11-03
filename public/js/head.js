// 1. Create a synchronous script tag for Tailwind
const tailwind = document.createElement('script');
tailwind.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwind);

// 2. Create a synchronous script tag for Axios
const axiosScript = document.createElement('script');
axiosScript.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

// This is the magic line. It tells the browser to wait for the download.
axiosScript.async = false; 

// Only after Axios is loaded, load our api.js
axiosScript.onload = () => {
    const apiScript = document.createElement('script');
    apiScript.src = "/js/api.js";
    document.head.appendChild(apiScript);
};

document.head.appendChild(axiosScript);

// 3. Load Poppins font
const fonts = document.createElement('style');
fonts.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`;
document.head.appendChild(fonts);