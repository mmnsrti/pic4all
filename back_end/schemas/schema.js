// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import user from './user';
import postedBy from './postedBy';

import pin from './pin';
import comment from './comment';

import save from './save';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([user, save ,comment, pin ,postedBy]),
})
