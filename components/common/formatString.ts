export const addSpacesToInitCap = (text: string): string => {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  };