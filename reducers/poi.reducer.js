export default function(poi = [], action) {
    if (action.type === 'savePoi') {
        return action.poi
    } else if (action.type === 'removePoi') {
        var newArray = [...poi]
        newArray.splice(action.num,1)
        return newArray
    } else {
        return poi
    }
}