import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from './button';

export default function LoginForm() {
  return (
    <form action="/auth/dashboard" method="post" className="space-y-4">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-6 pt-8">
        <h1 className={`${lusitana.className} mb-4 text-2xl font-semibold`}>
          Please log in to continue.
        </h1>
        <div className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                aria-label="Email address"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}
