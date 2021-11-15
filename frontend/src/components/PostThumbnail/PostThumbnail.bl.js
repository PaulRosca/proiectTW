export const getShortContent = (content, limit) => content.length > limit ? content.substring(0, limit) + "..." : content;

export const getCorrectFormOfNounBasedOnValue = (noun, value) => +value === 1 ? noun : noun + 's';