require 'typesense'

TYPESENSE_CLIENT = Typesense::Client.new(
  nodes: [{
    host:     'localhost',
    port:     8108,
    protocol: 'http'
  }],
  api_key:  'xyz',
  connection_timeout_seconds: 2
)

collection = TYPESENSE_CLIENT.collections['books']
collection.present? && collection.delete

TYPESENSE_CLIENT.collections.create(
  'name': 'books',
  'fields': [
    { 'name': 'title', 'type': 'string' },
    # I wonder why "authors" is not sortable? Error: "Field `authors` cannot be a sortable field. (Typesense::Error::RequestMalformed)""
    { 'name': 'authors', 'type': 'string[]', 'facet': true },
    { 'name': 'publication_year', 'type': 'int32', 'facet': true, 'sort': true },
    { 'name': 'ratings_count', 'type': 'int32' },
    { 'name': 'average_rating', 'type': 'float' }
  ],
  default_sorting_field: 'ratings_count'
)

# # Why do I need to import the books data everytime the app starts?
books_data = File.read('tmp/books.jsonl')
TYPESENSE_CLIENT.collections['books'].documents.import(books_data)

# search_parameters = {
#   'q'         => 'harry potter',
#   'query_by'  => 'title',
#   'sort_by'   => 'ratings_count:desc'
# }

# puts TYPESENSE_CLIENT.collections['books'].documents.search(search_parameters)
