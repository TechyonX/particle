import { classNames } from "@/utils/misc";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

export enum AlertType {
  Success = "SUCCESS",
  Warning = "WARNING",
  Error = "ERROR",
  Info = "INFO",
  Neutral = "NEUTRAL",
}

const alertTypeToIcon = {
  [AlertType.Success]: CheckCircleIcon,
  [AlertType.Warning]: ExclamationTriangleIcon,
  [AlertType.Error]: ExclamationCircleIcon,
  [AlertType.Info]: InformationCircleIcon,
  [AlertType.Neutral]: InformationCircleIcon,
};

const alertTypeToClassNames: {
  [key in AlertType]: {
    bg: string;
    icon: string;
    text: string;
    dismiss: string;
  };
} = {
  [AlertType.Success]: {
    bg: "bg-emerald-50 border-emerald-400 dark:bg-emerald-950 dark:border-emerald-200",
    icon: "text-emerald-400",
    text: "text-emerald-800 dark:text-emerald-200",
    dismiss:
      "bg-emerald-50 text-emerald-500 hover:bg-emerald-100 focus:ring-emerald-600 focus:ring-offset-emerald-50" + " " +
      "dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900 dark:focus:ring-emerald-400 dark:focus:ring-offset-emerald-950",
  },
  [AlertType.Warning]: {
    bg: "bg-yellow-50 border-yellow-400 dark:bg-yellow-950 dark:border-yellow-200",
    icon: "text-yellow-400",
    text: "text-yellow-800 dark:text-yellow-200",
    dismiss:
      "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50" + " " +
      "dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900 dark:focus:ring-yellow-400 dark:focus:ring-offset-yellow-950",
  },
  [AlertType.Error]: {
    bg: "bg-red-50 border-red-400 dark:bg-red-950 dark:border-red-200",
    icon: "text-red-400",
    text: "text-red-800 dark:text-red-200",
    dismiss:
      "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50" + " " +
      "dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900 dark:focus:ring-red-400 dark:focus:ring-offset-red-950",
  },
  [AlertType.Info]: {
    bg: "bg-blue-50 border-blue-400 dark:bg-blue-950 dark:border-blue-200",
    icon: "text-blue-400",
    text: "text-blue-800 dark:text-blue-200",
    dismiss:
      "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50" + " " +
      "dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 dark:focus:ring-blue-400 dark:focus:ring-offset-blue-950",
  },
  [AlertType.Neutral]: {
    bg: "bg-gray-50 border-gray-400 dark:bg-gray-950 dark:border-gray-200",
    icon: "text-gray-400",
    text: "text-gray-800 dark:text-gray-200",
    dismiss:
      "bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50" + " " +
      "dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-950",
  },
};

export default function Alert({
  type,
  message,
  onDismiss,
  className,
}: {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
  className?: string;
}) {
  const Icon = alertTypeToIcon[type];
  return (
    <div
      className={classNames("border rounded-md p-4", alertTypeToClassNames[type].bg, className ?? "")}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={classNames("h-5 w-5", alertTypeToClassNames[type].icon)}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p
            className={classNames(
              "text-sm font-medium",
              alertTypeToClassNames[type].text
            )}
          >
            {message}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={classNames(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  alertTypeToClassNames[type].dismiss
                )}
                onClick={onDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
