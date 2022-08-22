import moment from 'moment'

export const getSecondsSinceMidnight = () => {
    var now = moment()
    var midnight = now.clone().startOf('day')
    return now.diff(midnight, 'seconds')
}
