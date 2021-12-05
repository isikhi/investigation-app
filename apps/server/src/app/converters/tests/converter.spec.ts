import { PlainCsvToInvestigationDTO } from "../json-to-investigation.converter";
import { investigationCsvParser } from "../csv-to-investigation.model.converter";

const mockCsvFilepath = `${__dirname}/../../../../../../apps/server/src/assets/mocks/upload-example.csv`;

describe('Converter tests', () => {
  it('it should convert csv to investigation dto model!', async () => {
    const entities = await investigationCsvParser(mockCsvFilepath);
    expect(entities).toBeDefined();
    expect(entities.length).toBeGreaterThanOrEqual(1);
    console.log('ok')
    expect(entities[0]).toBeInstanceOf(PlainCsvToInvestigationDTO);
  },);

  /**
   * @todo: implement other tests
   */
  it.todo('implement converter tests');
});
