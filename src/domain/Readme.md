# Domain
 In this domain, here you can find the business and application logic.

├── new module
│   ├── aggregate
│   ├── entity
│   ├── valueObjects


name | description | example
-|-|-
valueObjects| These are basically more specific `types`. | `var email: Email` <br/> instead of <br/> `var email: String`
entity| These are objects | `class Entity extends BaseEntity<IEntity>{ var email: Email ...}`
aggregates| a collection of Entities and valueObjects | class Aggregate extends BaseEntity<IAggregate> {}


<hr/>

## What the format looks like

```js
{
    Aggregate: {
        Entity: {
            ValueObject: Value,
            ValueObject: Value,
            ValueObject: Value
        },
        ValueObject: Value
    }
}
// so an Aggregate could be an entity that is an aggregate root or a group of entities and/or valueObjects.

//an entity can have many value objects and all must be strict types.

```