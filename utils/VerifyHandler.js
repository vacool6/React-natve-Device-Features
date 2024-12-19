import { Alert } from "react-native";

export default async function verifyPermission(
  permission,
  status,
  permissionExecuteFn
) {
  if (permission.status === status.UNDETERMINED) {
    const permissionRes = permissionExecuteFn();
    return (await permissionRes).granted;
  }

  if (permission.status === status.DENIED) {
    const permissionRes = permissionExecuteFn();
    return (await permissionRes).granted;
  }

  return true;
}
