import { type SchemaTypeDefinition } from 'sanity'
import blog from './blog'
import contact from './contact'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, contact, project],
}
