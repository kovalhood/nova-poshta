const formattingDate = (string) => {
    if (string !== undefined) {
        const year = string.slice(6, 10);
        const month = string.slice(3, 5);
        const day = string.slice(0, 2);
        const time = string.slice(11, 19);

        const formatterData = day + '/' + month + '/' + year + ', ' + time;
        
        return formatterData;
    }
}

const formattingRecipientDate = (string) => {
    if (string !== undefined) {
        const year = string.slice(0, 4);
        const month = string.slice(5, 7);
        const day = string.slice(8, 10);
        const time = string.slice(11, 19);

        const formatterData = day + '/' + month + '/' + year + ', ' + time;
        
        return formatterData;
    }
}

export {formattingDate, formattingRecipientDate };