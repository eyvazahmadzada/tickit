class Utils {
  /**
   * Search array for a keyword and return elements
   *
   * @param {Array} [arr]
   * @param {string} [keyword]
   * @returns {Array}
   */
  static searchArray(arr: any[], keyword: string): any[] {
    if (keyword === '') {
      return arr
    }

    const searchedArr = arr.filter((el) => {
      let containsKeyword = false

      for (let key in el) {
        if (el[key].toString().includes(keyword)) containsKeyword = true
      }
      return containsKeyword
    })

    return searchedArr
  }
}

export default Utils
