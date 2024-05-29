import {
  Options,
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { MessageDialogOptions, message } from "@tauri-apps/api/dialog";

let permissionGranted: boolean | null = null;

const checkPermission = async () => {
  if (permissionGranted == null) {
    permissionGranted = await isPermissionGranted();
  }
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }
  return permissionGranted;
};

export type NotificationOptions = {
  title: string;
  body?: string;
};

export const useNotification = async ({ title, body }: NotificationOptions) => {
  if (!title) {
    throw new Error("missing message argument!");
  }
  const permissionGranted = await checkPermission();
  if (!permissionGranted) {
    return;
  }
  const options: Options = {
    title: title,
  };
  if (body) options.body = body;
  sendNotification(options);
};

export const useMessage = async (
  value: string,
  options?: string | MessageDialogOptions | undefined
) => {
  if (typeof options === "object") {
    await message(value, {
      ...options,
      title: `Clash Nyanpasu - ${options.title}`,
    });
  } else {
    await message(value, options);
  }
};
