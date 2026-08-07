import { auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth.currentUser;

  let errMessage = '';
  let errCode = '';

  if (error instanceof Error) {
    errMessage = error.message;
    errCode = (error as unknown as { code?: string }).code || '';
  } else if (typeof error === 'object' && error !== null) {
    errMessage = (error as { message?: string }).message || JSON.stringify(error);
    errCode = (error as { code?: string }).code || '';
  } else {
    errMessage = String(error);
  }

  const combinedStr = `${errCode} ${errMessage} ${typeof error === 'object' ? JSON.stringify(error) : ''}`.toLowerCase();

  const isOffline =
    errCode === 'unavailable' ||
    errCode === 'failed-precondition' ||
    errCode === 'deadline-exceeded' ||
    combinedStr.includes('offline') ||
    combinedStr.includes("didn't respond") ||
    combinedStr.includes('could not reach') ||
    combinedStr.includes('failed to get document') ||
    combinedStr.includes('network');

  if (isOffline) {
    console.warn(`[Firestore Offline Mode] Operation '${operationType}' on path '${path}' using local storage.`);
    return;
  }

  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
