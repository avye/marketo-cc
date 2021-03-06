'use strict'

export const deduplicate = (inputArray) => {
  // Check duplicate emails first as emails should be our source of truth
  // since they do represent one person/company outside of our system.
  // Ids have the potential to have been a mistake in our own system.
  let emails = {};

  inputArray.forEach((element) => {
    if (emails[element.email]) {
      if (isMoreRecent(emails[element.email].entryDate, element.entryDate)) {
        emails[element.email] = element;
      }
    } else {
      emails[element.email] = element;
    }
  })

  let removedEmailDuplicates = objectToSortedArray(emails);

  let ids = {};
  removedEmailDuplicates.forEach((element) => {
    if (ids[element._id]) {
      if (isMoreRecent(ids[element._id].entryDate, element.entryDate)) {
        ids[element._id] = element;
      }
    } else {
      ids[element._id] = element;
    }
  })

  return objectToSortedArray(ids);
}

export const isMoreRecent = (firstDate, secondDate) => {
  return new Date(firstDate) <= new Date(secondDate);
}

export const objectToSortedArray = (obj) => {
  let array = Object.keys(obj).reduce((acc, el) => {
    acc.push(obj[el]);
    return acc;
  }, []);

  return array.sort((a,b) => {
    return (new Date(a.entryDate) - new Date(b.entryDate));
  })
}
