import { ApiGrouping, RouteTag } from '../enums';
import { generateControllerPath } from './modifiers';

describe('Generate controller path', () => {
  it('should return a path string', () => {
    const controllerPath = generateControllerPath({ group: ApiGrouping.AUTH });

    expect(typeof controllerPath).toBe('string');
    expect(controllerPath).toBe(`${RouteTag.API}/${ApiGrouping.AUTH}`);
  });
});
