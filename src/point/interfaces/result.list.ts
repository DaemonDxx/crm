export const ResultList = {
  ok: {
    title: 'Замечаний нет',
  },
  steals: {
    title: 'БУ'
  },
  removed: {
    title: 'Распломбирован без БУ'
  },
  skip: {
    title: 'Не успели'
  },
  dont: {
    title: 'Недопуск'
  },

  getArray: function() {
    const arr = [];
    for (const key in this) {
      arr.push(key);
    }
    return arr;
  }
}