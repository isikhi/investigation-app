import { csvToJsonConverter } from "./csv-to-json.converter";
import { jsonToInvestigation } from "./json-to-investigation.converter";

export const investigationCsvParser = async (filepath: string): Promise<any> => {
  const csvJson = await csvToJsonConverter(filepath)
  return jsonToInvestigation(csvJson)
}
