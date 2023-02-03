// Thanks for https://github.com/day1co/fastdao

import knex, { Knex } from 'knex';
import * as knexMeta from '@jeash/knex-meta';

const extensions = [
  knexMeta.metaFilter,
  knexMeta.metaPage,
  knexMeta.metaSort,
  knexMeta.meta,
  knexMeta.metaUpdate,
  knexMeta.metaInsert,
];

// eslint-disable-next-line no-restricted-syntax
for (const extension of extensions) {
  knex.QueryBuilder.extend(extension.name, extension);
}

const wrapIdentifier = (
  value: string,
  dialectImpl: (dialectValue: string) => string
) => dialectImpl(value);

export const connect = (config: Knex.Config): Knex => {
  const knexInstance = knex({ ...config, wrapIdentifier });
  process.on('exit', () => knexInstance.destroy());
  return knexInstance;
};
