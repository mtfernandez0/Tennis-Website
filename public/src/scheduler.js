const wasAMonth = (lastDate) => {
    let res = false;
    let date = new Date();
    if (
        (date.getMonth() !== lastDate.getMonth() ||
        date.getFullYear() !== lastDate.getFullYear())
      ) {
        res = true;
    }
    return res;
};

module.exports = { wasAMonth };
