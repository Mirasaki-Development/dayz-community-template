import { config } from '../../config';

const serversClone: typeof config.servers[0][] = [];
config.servers.forEach((e) => serversClone.push(
  Object.assign({}, e)
));

export const frontendServers: (typeof serversClone[0] & {
  cftoolsApiId: undefined;
})[] = serversClone.map((e) => {
  delete e.cftoolsApiId;
  return e as (typeof serversClone[0] & {
    cftoolsApiId: undefined;
  });
});
