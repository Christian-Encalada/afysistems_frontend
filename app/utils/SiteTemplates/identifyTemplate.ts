import { Template } from '@/types/sites';

export const identifyTemplate = (templateKey: string[]): Template | null => {
  if (templateKey[0] === '#4E25BE' && templateKey[1] === '#FFFFFF') {
    return Template.PURPLE_WHITE;
  } else if (templateKey[0] === '#2990FF' && templateKey[1] === '#FFFFFF') {
    return Template.BLUE_WHITE;
  }
  return null;
};
