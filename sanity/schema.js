import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import deal from './schemas/deal'
import freeGame from './schemas/freeGame'
import news from './schemas/news'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([deal, freeGame, news])
})
