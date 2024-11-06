export const COMPONENT_TYPES = {
  MAIN_PHOTO: 'MAIN_PHOTO',
  GREETING: 'GREETING',
  PERSONAL_INFO: 'PERSONAL_INFO',
  WEDDING_INFO: 'WEDDING_INFO',
  GUEST_INFO: 'GUEST_INFO',
  GALLERY: 'GALLERY',
  ONLY_FOR_CREATE: 'ONLY_FOR_CREATE',
} as const;

export type ComponentType = (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];
