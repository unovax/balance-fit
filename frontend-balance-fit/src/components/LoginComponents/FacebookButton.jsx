export default function FacebookButton(){
    return (
        <div>
            <a href="#" className="flex items-center justify-center w-[250px] px-4 py-2 space-x-3 text-sm text-center bg-blue-500 text-white transition-colors duration-200 transform rounded-lg dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                <span className="text-sm text-white dark:text-gray-200">Iniciar sesión con Facebook</span></a>
        </div>
    )
}