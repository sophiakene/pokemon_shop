export function existsInCollection(index) { return index !== -1 }
export function notExistsInCollection(index) { return index === -1 }

export function getElementIndexWithId(collection, property, elementId) {
    return collection.findIndex(
        currentElement => currentElement[property] === elementId
    )
}