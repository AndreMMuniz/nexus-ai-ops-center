import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold text-gray-900">Sign In to Nexus Ops</h3>
                    <p className="text-sm text-gray-500">
                        Use your administrator password to access the panel.
                    </p>
                </div>
                <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                    <form
                        action={async (formData) => {
                            "use server";
                            await signIn("credentials", formData);
                        }}
                        className="flex flex-col space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs text-gray-600 uppercase"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-gray-200 bg-black text-sm text-white transition-all hover:bg-gray-800"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
