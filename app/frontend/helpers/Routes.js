const Routes = {
  advanceGame: (id) => (`games/${id}/advance`),
  games: () => (`games`),
  resetGame: (id) => (`games/${id}/reset`)
}
export default Routes
