import {
  Bars4Icon,
  BuildingOffice2Icon,
  CalendarIcon,
  CreditCardIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { User } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useUserSettings } from "../../../services/hooks/userSettings";
import { clsx } from "../../shared/clsx";

const monthMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const items = [
  {
    title: "Manage Plan",
    description:
      "View your Stripe subscription and update your payment method.",
    icon: CreditCardIcon,
    background: "bg-green-500",
    href: "https://billing.stripe.com/p/login/test_8wMcQm0acgy585W5kk",
  },
  {
    title: "Enterprise",
    description: "Need a custom plan? Contact us to learn more.",
    icon: BuildingOffice2Icon,
    background: "bg-sky-500",
    href: "https://calendly.com/d/x5d-9q9-v7x/helicone-discovery-call",
  },
];

interface UsagePageV2Props {
  user: User;
}

const UsagePageV2 = (props: UsagePageV2Props) => {
  const { user } = props;

  const month = new Date().getMonth();

  const { isLoading, userSettings } = useUserSettings(user.id);

  const capitalizeHelper = (str: string) => {
    const words = str.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  return (
    <div className="mt-8 flex flex-col text-gray-900 max-w-2xl space-y-8">
      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl font-semibold tracking-wide">
          {monthMap[month]}
        </h1>
        <p className="text-md">
          Below is a summary of your monthly usage and your plan. Contact us at
          help@helicone.ai if you have any questions.
        </p>
      </div>
      <div className="border-2 p-4 text-sm rounded-md flex flex-col text-gray-600 border-gray-300 w-full gap-4">
        <div className="flex flex-row items-center text-gray-600 w-fit gap-4">
          <LightBulbIcon className="h-4 w-4 text-gray-600 hidden sm:inline" />
          Your first 100,000 requests are free every month. After that, you will
          be charged $1.00 per 10,000 requests.
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex flex-wrap items-baseline justify-between gap-y-2 pt-8">
          <dt className="text-sm font-medium leading-6 text-gray-700">
            Your Plan
          </dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {isLoading ? "Loading..." : capitalizeHelper(userSettings.tier)}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-y-2 pt-8">
          <dt className="text-sm font-medium leading-6 text-gray-700">
            Requests
          </dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            1,243,502
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-y-2 pt-8">
          <dt className="text-sm font-medium leading-6 text-gray-700">
            Estimated Cost
          </dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            $1,243.50
          </dd>
        </div>
      </div>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-8 border-t border-gray-200 py-6 sm:grid-cols-2"
      >
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-3 flex items-center space-x-4 rounded-xl p-3 focus-within:ring-2 focus-within:ring-sky-500 hover:bg-white">
              <div
                className={clsx(
                  item.background,
                  "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                )}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    <span>{item.title}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsagePageV2;