import { ApiGrouping, RouteTag } from './enums';

export type GenerateControllerPathProps = {
  routeTag?: RouteTag;
  group: ApiGrouping;
};
