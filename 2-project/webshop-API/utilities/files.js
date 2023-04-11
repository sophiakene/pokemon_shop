import * as fs from "fs/promises"

export function fileNotExists(errorCode) {
    return errorCode === "ENOENT"
}

export async function saveToFile(filePath, data = []) {
    const dataJSON = JSON.stringify(data)
    await fs.writeFile(filePath, dataJSON)
}

export async function getAllJsonData(filePath) {
    try {
        let dataTxt = await fs.readFile(filePath)
        let dataJson = JSON.parse(dataTxt)
        return dataJson
    } 
    catch (error) {
        if (fileNotExists(error.code)) {
            await saveToFile(filePath, []) // create a new file with ampty array
            return []
        }
        else { throw error }
    }
}