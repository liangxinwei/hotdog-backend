import {Model, Table, Column, ForeignKey, BelongsTo, AllowNull, HasMany, DataType} from 'sequelize-typescript';
import Province from './province';
import District from './district';

// @ts-ignore
@Table({
  tableName: 'city'
})
export default class City extends Model<City> {
  @AllowNull(false)
  @Column({
    comment: '城市 code',
    type: DataType.STRING(16),
    primaryKey: true,
  })
  code: string;

  @AllowNull(false)
  @ForeignKey(() => Province)
  @Column({
    comment: '省份 code',
    type: DataType.STRING(16),
  })
  parent_code: string;

  @AllowNull(false)
  @Column({
    comment: '城市',
    type: DataType.STRING(20),
  })
  name: string;

  @BelongsTo(() => Province)
  province: Province;

  @HasMany(() => District)
  districts: District[];
}