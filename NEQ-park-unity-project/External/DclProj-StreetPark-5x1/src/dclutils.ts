const dclutils : any = {

    getEntityWithName(name : string) : Entity
    {
        for (let entityKey in engine.entities)
        {
            let entity = <Entity>engine.entities[entityKey]
            if (entity.name == name)
                return entity
        }
        return null
    }
}
export default dclutils
