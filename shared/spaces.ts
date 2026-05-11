export interface Location {
    id:string,
    name:string,
    coords:string
}
export interface Building {
    id:string,
    name:string,
    location:string,
    coords:string
}
export interface Space{
    id:string,
    name:string,
    building:{id:string, name:string},
    available:boolean,
    coords:string
}

export const buildings: Building[] = [
    {
        id: "1",
        name: "Bloc",
        location: "Manchester",
        coords:""
    },
    {
        id: "2",
        name: "Lab Bench A",
        location: "Liverpool",
        coords:""
    }
]

export const spaces: Space[] = [
    {
        id: "1",
        name: "Desk 12",
        building: {id:"building-1", name:"Bloc"},
        available: true,
        coords:""
    },
    {
        id: "2",
        name: "Lab Bench A",
        building: {id:"building-2", name:"Alderley Park"},
        available: false,
        coords:""
    }
] 