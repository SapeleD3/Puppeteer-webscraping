import { RouteTag } from '../enums';
import { GenerateControllerPathProps } from '../types';

export const generateControllerPath = ({
  routeTag = RouteTag.API,
  group,
}: GenerateControllerPathProps) => {
  return `${routeTag}/${group}`;
};
