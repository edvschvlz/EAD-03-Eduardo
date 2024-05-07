import { EntitySchema } from 'typeorm';

export const UserEntity = new EntitySchema({
  name: 'user',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    email: {
      type: 'varchar',
      length: 255,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
  },
});
