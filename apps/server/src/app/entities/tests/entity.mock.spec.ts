import { Repository } from 'typeorm';

export const mockedMongoFunctions = {
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  insertMany: jest.fn(entity => entity),
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => mockedMongoFunctions);
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
describe('Entity Tests', () => {
  it('Repository mock should be defined', () => {
    expect(repositoryMockFactory).toBeDefined();
  });
});
