import moment from 'moment';

const formatDate=(value)=>{
    return moment(value).format('YYY-MMM-DD');
}

const formateDateTime=(value)=>{
    return moment(value).format('YYY-MMM-DD hh:mm a');
}

const formatTime=(value)=>{
    return moment(value).format('hh:mm a');
}

export {formatDate,formateDateTime,formatTime};