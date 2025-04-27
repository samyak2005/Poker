function generateCombinations(cards) {
  const result = [];
  function combine(start = 0, combo = []) {
    if (combo.length === 5) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < cards.length; i++) {
      combo.push(cards[i]);
      combine(i + 1, combo);
      combo.pop();
    }
    combine();
    return result;
  }
}
module.exports = { generateCombinations };
