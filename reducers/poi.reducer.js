export default function(poi = [], action) {
    if (action.type === 'savePoi') {
        return action.poi
    } else if (action.type === 'removePoi') {
        var enleves =  poi.splice(action.num,1)
        console.log(poi)
        return poi
    } else {
        return poi
    }
}