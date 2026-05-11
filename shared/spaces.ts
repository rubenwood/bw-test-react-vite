export interface Space{
    id:string,
    name:string,
    building:string,
    available:boolean
}
export const spaces: Space[] = [
    {
        id: "1",
        name: "Desk 12",
        building: "Bloc",
        available: true
    },
    {
        id: "2",
        name: "Lab Bench A",
        building: "Alderley Park",
        available: false
    }
] 